import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassroomEditService } from '../../data-access/classroom-edit.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ITeacher } from '../../utils/classroom';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.scss'],
})
export class ClassroomAddComponent implements OnInit, OnDestroy {
  teacherSearchList$!: BehaviorSubject<ITeacher[]>;
  teacherActiveOption$!: BehaviorSubject<string>;

  isLoading = false;
  isEdit = false;
  currentEditID!: number;

  @ViewChild('gradeSelect', { static: true })
  gradeSelectEl!: ElementRef<HTMLSelectElement>;

  createForm = this.fb.group(
    {
      teacherId: ['', Validators.required],
      grade: ['10', Validators.required],
      name: ['', Validators.required],
    },
    {
      updateOn: 'blur',
    }
  );

  error: string = '';

  routeSub!: Subscription;
  teacherOptionSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private classroomEditService: ClassroomEditService
  ) {}

  onSubmit() {
    if (this.isEdit) {
    } else {
      this.onCreateClassroom();
    }
  }

  onCreateClassroom() {
    this.error = '';
    if (this.createForm.valid && this.createForm.value) {
      this.isLoading = true;
      try {
        this.classroomEditService
          .createNewClass({
            teacherId: this.createForm.get('teacherId')?.value ?? '',
            grade: this.createForm.get('grade')?.value ?? '',
            name: this.createForm.get('name')?.value ?? '',
          })
          .subscribe({
            next: () => {
              this.classroomEditService.updateTeacherSearchList(
                this.createForm.get('teacherId')?.value ?? ''
              );
              this.toastrService.success('Create class successfully');
              this.createForm.reset();
              this.teacherActiveOption$.next(
                '' + this.teacherSearchList$.getValue()[0].id
              );
              this.gradeSelectEl.nativeElement.selectedIndex = 0;
            },
            error: (err) => {
              this.toastrService.error(
                'Something went wrong. Try another time'
              );
            },
            complete: () => {
              this.isLoading = false;
            },
          });
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = `${e.message}`;
          this.isLoading = false;
        }
      }
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.currentEditID = params['id'];
      this.isEdit = !!params['id'];
    });

    this.teacherSearchList$ = this.classroomEditService.teacherSearchList$;
    this.teacherActiveOption$ = this.classroomEditService.teacherActiveOption$;
    this.classroomEditService.init();

    this.teacherOptionSub = this.teacherActiveOption$.subscribe((data) => {
      this.createForm.patchValue({ teacherId: '' + data });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.teacherOptionSub.unsubscribe();
  }
}
