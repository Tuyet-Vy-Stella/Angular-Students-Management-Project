import {Component, OnInit} from '@angular/core';
import {fas, faEye, faUserCircle, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userCircleIcon = faUserCircle;
  showPassword = false;
  eyeIcon = faEye;
  slashIcon = faEyeSlash;

  ngOnInit(): void {
  }
}
