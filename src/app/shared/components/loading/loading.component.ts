import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div class="loading-overlay"><mat-spinner></mat-spinner></div>',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {}
