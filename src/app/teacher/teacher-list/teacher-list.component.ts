import { Component } from '@angular/core';
import { Teacher } from 'src/app/shared/teacher.model';
import { TeacherService } from './../teacher.service';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent {
  constructor(private teacherService: TeacherService) {}

  teacherList: Teacher[] = [];
  teacherListToShow: Teacher[] = [];
  numberOfEntriesPerPage: number = 10;
  currentPage: number = 1;
  pageNumbers: number[] = [];
  isLoading = false;

  ngOnInit() {
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

  deleteTeacher(id: number) {
    let teacher_name = this.teacherList.find((teacher) => teacher?.id === id)?.name;
    if(window.confirm(`Are you sure you want to delete this teacher ${teacher_name}?`)){
      this.teacherService.deleteTeacher(id).subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.teacherList = this.teacherList.filter(
              (teacher) => teacher.id !== id
            );
            this.changePage(1);
            this.updatePageNumbers();
            window.alert(`Teacher ${teacher_name} has been deleted successfully!`);
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
    
}
