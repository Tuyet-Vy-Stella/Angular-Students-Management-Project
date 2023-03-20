import {Component, OnInit} from '@angular/core';
import {AuthIcon} from "./auth-icon";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  icons = new AuthIcon();

  ngOnInit(): void {
  }
}
