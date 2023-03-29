import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { AuthIcon } from '../utils/auth-icon';
import { NgForm } from '@angular/forms';
import { AuthService, IResponse } from '../data-access/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message = '';
  icons = new AuthIcon();
  isShowPassword = false;
  isRemembered = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  onToggleShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  onToggleRemembered() {
    this.isRemembered = !this.isRemembered;
  }

  onClearMessage() {
    this.message = '';
  }

  private loginSuccessHandle(res: IResponse) {
    this.isLoading = false;
    this.authService.user.next(res.name);
    const loginTime = this.isRemembered ? 3 * 60 * 60 * 1000 : 60 * 60 * 1000;
    const expirationTime = new Date(new Date().getTime() + loginTime);
    this.cookieService.set('name', res.name);
    this.cookieService.set(
      'tokenExp',
      expirationTime.toISOString(),
      expirationTime
    );
    this.cookieService.set('token', res.access_token, expirationTime);
    this.router.navigate(['/']);
  }

  onSubmit(f: NgForm) {
    this.isLoading = true;
    this.authService.login(f.value.email, f.value.password).subscribe(
      (res) => {
        this.loginSuccessHandle(res);
        this.authService.setLogoutAuto();
      },
      (error) => {
        this.isLoading = false;
        this.message = error;
      }
    );
  }
  ngOnInit(): void {}
}
