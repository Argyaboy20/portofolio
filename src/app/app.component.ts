import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private router: Router) {
    if (window.location.pathname === '/' || window.location.pathname === '') {
      this.router.navigateByUrl('/tabs/tab1');
    }
  }
}