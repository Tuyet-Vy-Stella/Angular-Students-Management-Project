import { Subject } from 'rxjs'
import { Component, ElementRef, Output, Renderer2, ViewChild } from '@angular/core'
import { faBell, faBars, faMaximize, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  name!: string
  showDropdown = false
  icons = { faBars, faBell, faMaximize, faChevronDown }
  @Output() clickMenuIconEvent = new Subject<void>()
  @ViewChild('dropdown') dropdown!: ElementRef
  @ViewChild('userMenu') userMenu!: ElementRef

  constructor(private renderer: Renderer2, private authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((name) => {
      this.name = name
    })

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

  onLogout() {
    this.authService.resetAuth()
  }
}
