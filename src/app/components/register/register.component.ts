import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  register() {
    this.authService.register(this.email, this.password).subscribe(
      response => {
        console.log('Registration successful', response);
        // Redirect or show success message
      },
      error => {
        console.error('Registration failed', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
