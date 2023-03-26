import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import {
  faBorderAll,
  faChevronLeft,
  faChevronRight,
  faList,
  faMagnifyingGlass,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { Student } from '../../data-access/student.model';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent {
  icons = {
    faList,
    faBorderAll,
    faPlus,
    faChevronLeft,
    faChevronRight,
    faPenToSquare,
    faTrash,
    faMagnifyingGlass,
  };
  studentList: Student[] = [];
  studentListToShow: Student[] = [];
  numberOfEntriesPerPage: number = 10;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  isFetchingStudentList = false;
  isFetchingToDeleteStudent = false;
  showModal = false;
  studentIdToDelete: number | null = null;
  tableViewMode = true;

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    // Fetch student data
    this.isFetchingStudentList = true;
    this.studentService.getStudentList().subscribe({
      next: (response) => {
        if (response) {
          this.isFetchingStudentList = false;

          // Update student list
          this.studentList = response;

          // Update student list to show
          this.studentListToShow = this.studentList.slice(
            0,
            this.numberOfEntriesPerPage
          );

          // Update page numbers
          this.updatePageNumbers();
        }
      },
      error: (error) => {
        this.isFetchingStudentList = false;
        console.log(error);
      },
    });
  }

  // Update page numbers
  updatePageNumbers() {
    this.pageNumbers = Array.from(
      {
        length: Math.ceil(
          this.studentList.length / this.numberOfEntriesPerPage
        ),
      },
      (_, index) => index + 1
    );
  }

  // On click previous page button
  onClickPreviousPage() {
    this.onClickPageNumber(this.currentPage - 1);
  }

  // On click next page button
  onClickNextPage() {
    this.onClickPageNumber(this.currentPage + 1);
  }

  // On change number of entries per page
  onChangeNumberOfEntriesPerPage(e: Event) {
    const value = +(<HTMLInputElement>e.target).value;
    if (value) {
      // Update number of entries per page
      this.numberOfEntriesPerPage = value;

      // Update student list to show
      this.studentListToShow = this.studentList.slice(
        0,
        this.numberOfEntriesPerPage
      );

      // Update page numbers array
      this.updatePageNumbers();

      // Update current page
      this.currentPage = 1;
    }
  }

  // On click different page number
  onClickPageNumber(newPageNumber: number) {
    // Update current page
    this.currentPage = newPageNumber;

    // Update student list to show
    this.studentListToShow = this.studentList.slice(
      (this.currentPage - 1) * this.numberOfEntriesPerPage,
      this.currentPage * this.numberOfEntriesPerPage
    );
  }

  // On click delete button
  onClickDeleteButton(studentId: number) {
    this.showModal = true;
    this.studentIdToDelete = studentId;
  }

  // On click modal close button
  handleCloseModal() {
    this.showModal = false;
    this.studentIdToDelete = null;
  }

  // Handle delete student
  handleDeleteStudent() {
    if (this.studentIdToDelete) {
      // Hide modal
      this.showModal = false;

      // Active loading spinner
      this.isFetchingToDeleteStudent = true;

      // Listen fetch event
      this.studentService.deleteStudent(this.studentIdToDelete).subscribe({
        next: () => {
          this.isFetchingToDeleteStudent = false;
          this.toastrService.success(
            `Delete student with id (${this.studentIdToDelete}) successfully`,
            'Delete Student'
          );

          // Remove this student on student list
          this.studentList = this.studentList.filter(
            (student) => student.id !== this.studentIdToDelete
          );

          // Set student list to show
          this.onClickPageNumber(this.currentPage);

          // Reset student id to delete
          this.studentIdToDelete = null;
        },
        error: (error) => {
          this.isFetchingToDeleteStudent = false;
          console.error(error);
          this.toastrService.error(
            `Delete student with id (${this.studentIdToDelete}) failure`,
            'Delete Student'
          );

          // Reset student id to delete
          this.studentIdToDelete = null;
        },
      });
    }
  }

  // Switch view mode
  switchToTableViewMode(isTableViewMode: boolean) {
    this.tableViewMode = isTableViewMode;
  }
}
