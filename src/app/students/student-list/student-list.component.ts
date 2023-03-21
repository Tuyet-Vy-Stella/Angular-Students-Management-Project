import { Component } from '@angular/core'

import { Student } from '../student.model'
import { StudentService } from './../student.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  studentList: Student[] = []
  studentListToShow: Student[] = []
  numberOfEntriesPerPage: number = 10
  currentPage: number = 1
  pageNumbers: number[] = []

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.getStudentList().subscribe((response) => {
      if (response) {
        // Update student list
        this.studentList = response

        // Update student list to show
        this.studentListToShow = this.studentList.slice(0, this.numberOfEntriesPerPage)

        // Update page numbers
        this.updatePageNumbers()
      }
    })
  }

  // Update page numbers
  updatePageNumbers() {
    this.pageNumbers = Array.from(
      { length: Math.ceil(this.studentList.length / this.numberOfEntriesPerPage) },
      (_, index) => index + 1
    )
  }

  // On click previous page button
  onClickPreviousPage() {
    this.onClickPageNumber(this.currentPage - 1)
  }

  // On click next page button
  onClickNextPage() {
    this.onClickPageNumber(this.currentPage + 1)
  }

  // On change number of entries per page
  onChangeNumberOfEntriesPerPage(e: Event) {
    const value = +(<HTMLInputElement>e.target).value
    if (value) {
      // Update number of entries per page
      this.numberOfEntriesPerPage = value

      // Update student list to show
      this.studentListToShow = this.studentList.slice(0, this.numberOfEntriesPerPage)

      // Update page numbers array
      this.updatePageNumbers()
    }
  }

  // On click different page number
  onClickPageNumber(newPageNumber: number) {
    // Update current page
    this.currentPage = newPageNumber

    // Update student list to show
    this.studentListToShow = this.studentList.slice(
      (this.currentPage - 1) * this.numberOfEntriesPerPage,
      this.currentPage * this.numberOfEntriesPerPage
    )
  }
}
