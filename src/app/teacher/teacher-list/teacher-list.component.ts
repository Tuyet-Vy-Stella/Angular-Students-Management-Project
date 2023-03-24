import { Component } from '@angular/core';
import { Teacher } from 'src/app/shared/teacher.model';
import { TeacherService } from './../teacher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent {
  constructor(
    private teacherService: TeacherService,
    private toastrService: ToastrService
  ) {}

  teacherList: Teacher[] = [];
  teacherListToShow: Teacher[] = [];
  numberOfEntriesPerPage: number = 10;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  isLoading = false;
  showModal = false;
  teacherIdToDelete: number = 0;
  tableViewMode = true;

  ngOnInit() {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe({
      next: (response) => {
        if (response) {
          // Update student list
          this.teacherList = response;

          // Update student list to show
          this.teacherListToShow = this.teacherList.slice(
            0,
            this.numberOfEntriesPerPage
          );

          // Update page numbers
          this.updatePageNumbers();
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastrService.error(
          'Get teacher list failed. Please try again later'
        );
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  updatePageNumbers() {
    this.pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.teacherList.length / this.numberOfEntriesPerPage);
      i++
    ) {
      this.pageNumbers.push(i);
    }
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.teacherListToShow = this.teacherList.slice(
      (pageNumber - 1) * this.numberOfEntriesPerPage,
      pageNumber * this.numberOfEntriesPerPage
    );
  }

  changeNumberOfEntriesPerPage(even: Event) {
    // this.numberOfEntriesPerPage = even.target.value
    this.numberOfEntriesPerPage = parseInt(
      (even.target as HTMLInputElement).value
    );
    this.changePage(1);
    this.updatePageNumbers();
  }

  handleShowModal(id: number) {
    this.showModal = true;
    this.teacherIdToDelete = id;
  }

  handleCloseModal() {
    this.showModal = false;
    this.teacherIdToDelete = 0;
  }

  deleteTeacher(id = this.teacherIdToDelete) {
    const teacher_name = this.teacherList.find(
      (teacher) => teacher.id === id
    )?.name;

    this.showModal = false;

    this.isLoading = true;
    this.teacherService.deleteTeacher(id).subscribe({
      next: (response) => {
        if (response) {
          this.teacherList = this.teacherList.filter(
            (teacher) => teacher.id !== id
          );
          this.changePage(1);
          this.updatePageNumbers();
          this.toastrService.success(
            `Teacher ${teacher_name} has been deleted successfully!`
          );
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.toastrService.error(
          `Teacher ${teacher_name} could not be deleted!.`,
          error.error.message || 'Please try again later'
        );
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
