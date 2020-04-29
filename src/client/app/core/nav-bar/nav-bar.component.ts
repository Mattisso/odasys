import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { AuthService} from '../../users/_services/auth.service';
import { IUser } from '../../users/user';
import { MessageService } from '../../messages/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: IUser;
  loading = true;
  showConfig = true;
  pageTitle = '';

  constructor(private authService: AuthService,
    private router: Router,
    public messageService: MessageService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
   }

  ngOnInit() {
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  get vurrentUser() {
    return this.authService.currentUser;
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  handlingSignOut() {
    this.authService.logout();
  }
  toggleConfig() { this.showConfig = !this.showConfig; }
}
