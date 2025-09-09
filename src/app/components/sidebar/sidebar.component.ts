import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sidenav!: MatSidenav;
  userName: string = '';
  profileImage: string = '';
  initial: string = '';
  isCollapsed: boolean = false;
  expandedIndex: number | null = null;

  // Novos campos
  title: string = '';
  secondName: string = '';

  menus = [
    {
      title: 'Cessões de Crédito',
      icon: 'credit_card',
      submenus: [
        { title: 'Consulta', icon: 'search', link: '/consulta' },
        { title: 'Worklist', icon: 'list', link: '/worklist' }
      ]
    },
    {
      title: 'Penhoras',
      icon: 'gavel',
      submenus: [
        { title: 'Consulta', icon: 'search', link: '/consulta-penhoras' },
        { title: 'Worklist', icon: 'list', link: '/worklist-penhoras' },
        { title: 'Nova Penhora', icon: 'add', link: '/nova-penhora' }
      ]
    },
    {
      title: 'Faturação',
      icon: 'receipt',
      submenus: [
        { title: 'Novo Pedido', icon: 'add', link: '/novo-pedido' },
        { title: 'Consulta', icon: 'search', link: '/consulta-faturacao' },
        { title: 'Worklist', icon: 'list', link: '/worklist-faturacao' }
      ]
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.name;
      this.profileImage = userData.profileImage;
      this.initial = this.userName.charAt(0).toUpperCase();
    }

    // Buscar o perfil do usuário
    this.authService.getStoredUserProfile(this.userName).subscribe(userProfile => {
      if (userProfile) {
        this.title = userProfile.title;
        const nameParts = userProfile.displayName.split(' ');
        this.secondName = nameParts.length > 1 ? nameParts[1] : nameParts[0];
      }
    });
  }

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
  }

  togglePanel(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
}
