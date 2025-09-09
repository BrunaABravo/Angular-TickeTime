import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  recoverPassword() {
    this.http.post('/api/account/recover-password', { email: this.email })
      .subscribe(
        () => {
          this.successMessage = 'Password recovery email sent.';
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Failed to send password recovery email.';
          this.successMessage = '';
        }
      );
  }
}
