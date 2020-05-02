import { Component, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

import { AuthService } from './users/_services/auth.service';
import { IUser } from './users/user';

import { MessageService } from './messages/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'odasys';
  loading = true;
  showSearch = true;
  showUploader = true;
  currentUser: IUser;

  constructor(private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef) {
 this.authService.currentUser.subscribe(x => this.currentUser = x);
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
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

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
  toggleSearch() { this.showSearch = !this.showSearch; }
  toggleUploader() { this.showUploader = !this.showUploader; }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
