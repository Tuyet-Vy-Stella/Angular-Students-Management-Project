import {Component, OnDestroy, OnInit} from '@angular/core'
import {Subscription} from 'rxjs'
import {Router, NavigationEnd} from "@angular/router";
import {AuthService} from "./auth/auth.service";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  isShowNav = true;
  isMiniSidebar = false
  classes = 'main'
  clickMenuIconSubscription!: Subscription;
  name: string | undefined = '';

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    const name = this.cookieService.get('name');
    if (name) {
      this.authService.user.next(name);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isShowNav = event.url !== '/auth';
      }
    })

    this.authService.setLogoutAuto();
  }

  ngOnDestroy() {
    this.clickMenuIconSubscription.unsubscribe();
  }

  onClickMenuIcon() {
    this.isMiniSidebar = !this.isMiniSidebar
    this.classes = this.isMiniSidebar ? 'main mini-sidebar' : 'main'
  }

  onClickOverlay() {
    this.isMiniSidebar = true
    this.classes = 'main mini-sidebar'
  }
}
