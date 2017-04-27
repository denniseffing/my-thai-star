import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav/shared/sidenav.service';

@Component({
  selector: 'qs-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  mobileSidenavOpened: boolean = false;

  constructor(private router: Router, private sidenav: SidenavService) {
  }

  openCloseSideNav(sidenavOpened: boolean): void {
    sidenavOpened ? this.sidenav.closeSideNav() : this.sidenav.openSideNav();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.mobileSidenavOpened = false;
  }


}
