import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  filter,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { IClassElement, IClassroom, ITeacher } from '../utils/classroom';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  classList$ = new BehaviorSubject<IClassElement[]>([]);
  currentClassId$ = new BehaviorSubject<number>(-1);
  classListInitialized$ = new BehaviorSubject<boolean>(false);
  teacherSearchList$ = new BehaviorSubject<ITeacher[]>([]);

  currentClass$ = this.getCurrentClass().pipe(
    tap((value) => (this._currentClass = value)),
    shareReplay(1)
  );
  private _currentClass!: IClassroom;

  get currentClass(): IClassroom {
    return this._currentClass;
  }

  constructor(private http: HttpClient) {}

  public init() {
    if (this.classListInitialized$.value) return;
    this.http
      .get<IClassElement[]>('https://qlsv-mu.vercel.app/api/class-list')
      .subscribe((classes) => {
        this.classList$.next(classes);
        if (classes.length > 1) {
          this.currentClassId$.next(classes[0].id);
        }
      });

    this.http
      .get<ITeacher[]>(
        'https://qlsv-mu.vercel.app/api/class/teacher_not_form_teacher'
      )
      .subscribe((data) => {
        this.teacherSearchList$.next(data);
      });

    this.classListInitialized$.next(true);
  }

  public getCurrentClass(): Observable<IClassroom> {
    return this.currentClassId$.pipe(
      filter((value) => value !== -1),
      debounceTime(300),
      // distinctUntilChanged(),
      // tap((data) => console.log(data)),
      switchMap((id) => {
        return this.http.get<IClassroom>(
          `https://qlsv-mu.vercel.app/api/class/?class_id=${id}`
        );
      })
    );
  }

  addClassToClassList(classroom: IClassElement) {
    let updateClassList = [...this.classList$.getValue(), classroom];
    this.classList$.next(updateClassList);
  }

  deleteClassFromClassList(id: number) {
    let classIndex = 1;
    const updatedClassList = this.classList$
      .getValue()
      .filter((classroom, index) => {
        if (classroom.id === id) {
          classIndex = index > 2 ? index - 1 : index + 1;
          let formTeacherDeleted = {
            name: classroom.form_teacher_name,
            id: classroom.form_teacher_id,
          };
          this.teacherSearchList$.next([
            ...this.teacherSearchList$.getValue(),
            formTeacherDeleted,
          ]);
          return false;
        }
        return true;
      });

    this.classList$.next([...updatedClassList]);
    this.currentClassId$.next(updatedClassList[classIndex].id);
  }
}
