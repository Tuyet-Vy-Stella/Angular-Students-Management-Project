import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './features/auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isShowNav = true;
    isMiniSidebar = true;
    classes = 'main mini-sidebar';
    name: string | undefined = '';

    displaySidebar = false;

    constructor(
        private router: Router,
        private authService: AuthService,
        private cookieService: CookieService
    ) {}

    ngOnInit(): void {
        const name = this.cookieService.get('name');
        if (name) {
            this.authService.user.next(name);
        }

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.isShowNav = event.url !== '/auth';
            }
        });

        this.authService.setLogoutAuto();
    }

    onClickMenuIcon() {
        this.isMiniSidebar = !this.isMiniSidebar;
        this.classes = this.isMiniSidebar ? 'main mini-sidebar' : 'main';
    }

    onClickOverlay() {
        this.isMiniSidebar = true;
        this.classes = 'main mini-sidebar';
    }

    handleDisplaySidebar(display: boolean) {
        this.displaySidebar = display;
    }
}
