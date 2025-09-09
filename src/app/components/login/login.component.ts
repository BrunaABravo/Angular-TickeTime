import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router, private popupService: PopupService) {}

  login() {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = 'Login com sucesso!';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        } else {
          this.popupService.show(response.message || 'Credenciais inválidas');
        }
      },
      error => {
        this.isLoading = false;
        this.popupService.show('Erro ao fazer login. Verifique suas credenciais');
        this.errorMessage = 'Login falhou. Verifica username e password';
        this.successMessage = '';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
