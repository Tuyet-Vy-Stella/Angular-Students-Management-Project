import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClassElement } from '../utils/classroom';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class ClassroomEditService {
  teacherSearchList$ = this.dataStorage.teacherSearchList$;
  teacherActiveOption$ = new BehaviorSubject<string>('');
  classList$ = this.dataStorage.classList$;

  constructor(
    private http: HttpClient,
    private dataStorage: DataStorageService
  ) {}

  public init() {
    this.dataStorage.init();

    this.teacherSearchList$.subscribe((teachers) => {
      // Handle length = 0
      if (teachers.length > 0) {
        this.teacherActiveOption$.next('' + teachers[0].id);
      }
    });
  }

  updateTeacherSearchList(id: string): void {
    const teacherListUpdate = this.teacherSearchList$
      .getValue()
      .filter((teacher) => teacher.id !== +id);
    this.teacherSearchList$.next(teacherListUpdate);
  }

  createNewClass(value: {
    teacherId: string;
    grade: string;
    name: string;
  }): Observable<IClassElement> {
    const existingClass = this.classList$
      .getValue()
      .find((c) => c.grade === value.grade && c.section === value.name);

    if (existingClass) {
      throw new Error(`Class name  ${value.grade}${value.name} already exists`);
    }

    return this.http
      .post<IClassElement>('https://qlsv-mu.vercel.app/api/class', {
        form_teacher_id: value.teacherId,
        grade: value.grade,
        section: value.name,
      })
      .pipe(
        catchError((e) => throwError(e)),
        tap((classroom) => {
          this.dataStorage.addClassToClassList({ ...classroom });
        })
      );
  }

  updateClass() {}
}
