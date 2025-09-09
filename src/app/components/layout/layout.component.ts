import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpened = true;
  isCollapsed = false;

  toggleSidenav() {
    this.isCollapsed = !this.isCollapsed;
    this.isSidenavOpened = !this.isCollapsed;
  }
}
