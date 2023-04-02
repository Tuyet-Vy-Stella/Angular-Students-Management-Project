import { Component, OnInit } from '@angular/core';
import { icons } from '../../utils/icons';
import { ClassroomService } from '../../data-access/classroom.service';
import { combineLatest, map, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.scss'],
})
export class ClassroomDetailsComponent implements OnInit {
  showModal = false;
  icons = icons;

  isSearchTeacher$ = this.classroomService.isSearchTeacher$;
  currentClassId$ = this.classroomService.currentClassId$;
  isTeacherTab$ = this.classroomService.isTeacherTab$;

  // Modal
  currentDeletedType!: number;
  currentDeletedId!: number;
  deleteModelContent = {
    header: '',
    mainContent:
      'This action cannot be undone. Are you sure you want to continue?',
  };

  // View Model
  vm$ = combineLatest([
    this.classroomService.getTeachers().pipe(startWith([])),
    this.classroomService.getStudents().pipe(startWith([])),
    this.classroomService.currentClass$.pipe(
      startWith({ grade: '', section: '', form_teacher: '', id: -1 })
    ),
    this.isTeacherTab$,
    this.isSearchTeacher$,
    this.classroomService.searchList$.pipe(startWith([])),
  ]).pipe(
    map(
      ([
        teachers,
        students,
        currentClass,
        isTeacherTab,
        isSearchTeacher,
        dropDownList,
      ]) => ({
        teachers,
        students,
        currentClass,
        isTeacherTab,
        isSearchTeacher,
        dropDownList,
      })
    )
  );

  constructor(
    private classroomService: ClassroomService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.classroomService.init();
  }

  handleCloseModal() {
    this.showModal = false;
  }

  onOpenModal(deleteType: number, id?: number) {
    this.currentDeletedType = deleteType;

    if (id === -1) return;
    if (id) {
      this.currentDeletedId = id;
    }

    if (deleteType === 1) {
      this.deleteModelContent.header = 'Delete Class';
    }
    this.showModal = true;
  }

  onConfirmModal() {
    this.showModal = false;
    console.log(this.currentDeletedType);
    if (this.currentDeletedType === 1) {
      this.classroomService.deleteClass(this.currentDeletedId).subscribe({
        next: (value) => {
          this.toastrService.success(value.message);
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error.detail);
        },
      });
    }
  }
}
