import { Subject } from 'rxjs'
<<<<<<<<< Temporary merge branch 1
import { Component, ElementRef, Output, Renderer2, ViewChild } from '@angular/core'
=========
import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild } from '@angular/core'
import {AuthService} from "../auth/auth.service";
>>>>>>>>> Temporary merge branch 2

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
<<<<<<<<< Temporary merge branch 1
export class HeaderComponent {
  showDropdown = false
=========
export class HeaderComponent implements OnInit {
  name! : string;
  showDropdown = false
  isAuthenticated = false;
>>>>>>>>> Temporary merge branch 2
  @Output() clickMenuIconEvent = new Subject<void>()
  @ViewChild('dropdown') dropdown!: ElementRef
  @ViewChild('userMenu') userMenu!: ElementRef

<<<<<<<<< Temporary merge branch 1
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
=========
  constructor(private renderer: Renderer2, private authService : AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe(name => {
      this.name = name;
    });

>>>>>>>>> Temporary merge branch 2
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.userMenu.nativeElement.contains(e.target) && !this.dropdown.nativeElement.contains(e.target)) {
        this.showDropdown = false
      }
    })
  }

  onClickMenuIcon() {
    this.clickMenuIconEvent.next()
  }

  onClickUserMenu() {
    this.showDropdown = !this.showDropdown
  }

  onClickOutsideUserIcon() {
    this.showDropdown = false
  }
<<<<<<<<< Temporary merge branch 1
=========

  onLogout(){
    this.authService.resetAuth();
  }
>>>>>>>>> Temporary merge branch 2
}
