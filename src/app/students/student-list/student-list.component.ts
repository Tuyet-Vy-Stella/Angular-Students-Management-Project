import { Component } from '@angular/core'

import { Student } from '../student.model'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  studentList: Student[] = [
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    },
    {
      id: 1,
      name: 'Nguyen The Truong',
      grade: '12',
      section: 'a',
      gender: 'male',
      phone: '0919004743',
      email: 'nttruong10101@gmail.com',
      avatar: '../assets/images/avt.jpg'
    }
  ]

  onClickPreviousPage() {
    console.log('clicked')
  }
}
