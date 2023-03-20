import { Component } from '@angular/core'

import { MathIconComponent } from './../shared/icons/math-icon/math-icon.component'
import { ChalkboardIconComponent } from './../shared/icons/chalkboard-icon/chalkboard-icon.component'
import { UsersIconComponent } from './../shared/icons/users-icon/users-icon.component'
import { DashboardIconComponent } from './../shared/icons/dashboard-icon/dashboard-icon.component'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  tabs = [
    {
      id: 1,
      name: 'Dashboard',
      icon: DashboardIconComponent,
      children: [
        {
          id: 1,
          name: 'Admin Dashboard'
        },
        {
          id: 2,
          name: 'Teacher Dashboard'
        },
        {
          id: 3,
          name: 'Student Dashboard'
        }
      ]
    },
    {
      id: 2,
      name: 'Students',
      icon: UsersIconComponent,
      children: [
        {
          id: 1,
          name: 'Student List'
        }
      ]
    },
    {
      id: 3,
      name: 'Teachers',
      icon: ChalkboardIconComponent,
      children: [
        {
          id: 1,
          name: 'Teacher List'
        }
      ]
    },
    {
      id: 4,
      name: 'Subjects',
      icon: MathIconComponent,
      children: [
        {
          id: 1,
          name: 'Subject List'
        }
      ]
    }
  ]
  parentTabSelected = 1
  childTabSelected = 1
  showChild = true

  setParentTabSelected(id: number) {
    if (this.parentTabSelected === id) {
      this.showChild = !this.showChild
    } else {
      this.showChild = true
      this.parentTabSelected = id
      const parentTab = this.tabs.find((tab) => tab.id === id)
      parentTab && (this.childTabSelected = parentTab.children[0].id)
    }
  }

  setChildTabSelected(id: number) {
    this.childTabSelected = id
  }
}
