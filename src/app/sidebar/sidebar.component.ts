import { Component } from '@angular/core'
import { faGauge, faUsers, faChalkboard, faCalculator } from '@fortawesome/free-solid-svg-icons'

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
      icon: faGauge,
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
      icon: faUsers,
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
      icon: faChalkboard,
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
      icon: faCalculator,
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
