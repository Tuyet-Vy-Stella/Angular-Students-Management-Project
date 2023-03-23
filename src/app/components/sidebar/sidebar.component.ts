import { Router, NavigationEnd } from '@angular/router'
import { Component } from '@angular/core'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

import { sidebarTabs } from '../../constants/sidebar.constant'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarTabs = sidebarTabs
  faChevronRightIcon = faChevronRight
  parentTabClicked = 1
  parentTabSelected = 1
  childTabSelected = 11
  showChild = true

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen url path when first access
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const prefix = event.url.split('/')[1]
        const tab = this.sidebarTabs.find((tab) => tab.prefix === prefix)
        if (tab) {
          this.parentTabSelected = tab.id
        }
      }
    })
  }

  // On click parent tab item
  onClickParentTab(parentId: number) {
    if (this.parentTabClicked === parentId) {
      // Similar parent tab => hide child list
      this.showChild = !this.showChild
    } else {
      // Else parent tab => show child list
      this.showChild = true

      // Set parent tab clicked
      this.parentTabClicked = parentId
    }
  }

  // On click child tab item
  onClickChildTab(parentId: number, childId: number) {
    // Set parent tab selected
    this.parentTabSelected = parentId

    // Set child tab selected
    this.childTabSelected = childId
  }
}
