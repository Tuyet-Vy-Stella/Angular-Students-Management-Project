import {Component, OnInit} from '@angular/core';
import {AuthIcon} from "./auth-icon";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  icons = new AuthIcon();
  isShowPassword = false;
  isRemembered = false;

  constructor(private  authService : AuthService) {
  }
  onToggleShowPassword() {
    this.isShowPassword = ! this.isShowPassword;
  }

  onToggleRemembered() {
    this.isRemembered = !this.isRemembered;
  }

  onSubmit(f : NgForm) {
    this.authService.login(f.value.email, f.value.password);
  }
  ngOnInit(): void {
  }
}
