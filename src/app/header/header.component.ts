import { Subject } from 'rxjs'
import { Component, ElementRef, Output, Renderer2, ViewChild } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showDropdown = false
  @Output() clickMenuIconEvent = new Subject<void>()
  @ViewChild('dropdown') dropdown!: ElementRef
  @ViewChild('userMenu') userMenu!: ElementRef

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
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
}
