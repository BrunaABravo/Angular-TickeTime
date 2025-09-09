import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly sessionKey = 'user-session';
  private readonly userKey = 'user-data';
  private readonly userProfileKey = 'userProfile';

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Account/RegisterExternal`, { email, password }, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Account/LoginAD`, { username, password }, { headers })
      .pipe(
        tap(response => {
          if (response.success) {
            this.setSession('valid-session');
            this.setUserData({
              name: response.data.name
            });
          }
        })
      );
  }

  logout(): void {
    this.removeSession();
    this.removeUserData();
  }

  isLoggedIn(): boolean {
    return this.getSession() !== null;
  }

  getUserData(): any {
    return this.getDataFromStorage(this.userKey);
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Account/GetUserProfile/${username}`)
      .pipe(
        tap(profile => {
          this.setDataInStorage(this.userProfileKey, profile);
        })
      );
  }

  getStoredUserProfile(username: string): Observable<any> {
    const profile = this.getDataFromStorage(this.userProfileKey);
    if (profile) {
      return of(profile);
    } else {
      return this.getUserProfile(username);
    }
  }

  clearUserProfile(): void {
    this.removeDataFromStorage(this.userProfileKey);
  }

  // Helper methods for local storage
  private setSession(value: string): void {
    localStorage.setItem(this.sessionKey, value);
  }

  private getSession(): string | null {
    return localStorage.getItem(this.sessionKey);
  }

  private removeSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  private setUserData(data: any): void {
    this.setDataInStorage(this.userKey, data);
  }

  private removeUserData(): void {
    this.removeDataFromStorage(this.userKey);
  }

  private setDataInStorage(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error setting data in local storage: ${e}`);
    }
  }

  private getDataFromStorage(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error getting data from local storage: ${e}`);
      return null;
    }
  }

  private removeDataFromStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
