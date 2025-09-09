import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action: string = 'Fechar', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'top',
    });
  }
}
