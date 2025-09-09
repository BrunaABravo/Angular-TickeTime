import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any;
  profileItems: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.authService.getStoredUserProfile(userData.name).subscribe(profile => {
        this.profile = profile;
        this.profileItems = [
          { label: 'Número Mecanográfico:', value: profile.nrMecanografico, icon: 'badge' },
          { label: 'Nome de Utilizador:', value: profile.username, icon: 'person' },
          { label: 'Nome:', value: profile.displayName, icon: 'account_circle' },
          { label: 'Email:', value: profile.email, icon: 'email' },
          { label: 'Telefone:', value: profile.telefone, icon: 'phone' },
          { label: 'Título:', value: profile.title, icon: 'work' },
          { label: 'Departamento:', value: profile.departamento, icon: 'business' },
          { label: 'Equipa:', value: profile.equipa, icon: 'group' },
          { label: 'Localização:', value: profile.local, icon: 'location_on' },
          { label: 'Centro de Custos:', value: profile.costCentre, icon: 'account_balance_wallet' },
          { label: 'Divisão:', value: profile.division, icon: 'domain' },
          { label: 'Empresa:', value: profile.companhia, icon: 'business_center' },
          { label: 'Gestor:', value: profile.manager, icon: 'supervisor_account' },
          { label: 'Email do Gestor:', value: profile.managerEmail, icon: 'mail_outline' }
        ];
      });
    }
  }
}
