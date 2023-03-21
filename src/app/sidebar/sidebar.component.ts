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
          id: 11,
          name: 'Admin Dashboard',
          link: ''
        },
        {
          id: 12,
          name: 'Teacher Dashboard',
          link: ''
        },
        {
          id: 13,
          name: 'Student Dashboard',
          link: ''
        }
      ]
    },
    {
      id: 2,
      name: 'Students',
      icon: UsersIconComponent,
      children: [
        {
          id: 21,
          name: 'Student List',
          link: 'students'
        },
        {
          id: 22,
          name: 'Create Student',
          link: 'students/create'
        }
      ]
    },
    {
      id: 3,
      name: 'Teachers',
      icon: ChalkboardIconComponent,
      children: [
        {
          id: 31,
          name: 'Teacher List',
          link: ''
        }
      ]
    },
    {
      id: 4,
      name: 'Subjects',
      icon: MathIconComponent,
      children: [
        {
          id: 41,
          name: 'Subject List',
          link: ''
        }
      ]
    }
  ]
  parentTabClicked = 1
  parentTabSelected = 1
  childTabSelected = 11
  showChild = true

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
