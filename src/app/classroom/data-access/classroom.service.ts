import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { IStudent, ISubject } from '../utils/classroom';
import { HttpClient } from '@angular/common/http';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  classList$ = this.dataStorage.classList$;
  searchList$ = new BehaviorSubject<
    { name: string; id: number; active: boolean }[]
  >([]);

  currentClassId$ = this.dataStorage.currentClassId$;
  isSearchTeacher$ = new BehaviorSubject<boolean>(true);
  isTeacherTab$ = new BehaviorSubject(true);

  currentClass$ = this.dataStorage.currentClass$;

  constructor(
    private http: HttpClient,
    private dataStorage: DataStorageService
  ) {}

  public init(): void {
    this.dataStorage.init();
    this.getSearchListByType();
  }

  public getStudents(): Observable<IStudent[]> {
    return this.currentClass$.pipe(
      map((classroom) => {
        return classroom.student;
      })
    );
  }

  public getTeachers(): Observable<ISubject[]> {
    return this.currentClass$.pipe(
      map((classroom) => {
        let isTaught = false;
        let teachers = classroom.subject.map((subject) => {
          if (subject.teacher === classroom.form_teacher) {
            isTaught = true;
            subject.formed = true;
            return subject;
          }
          subject.formed = false;
          return subject;
        });

        if (!isTaught) {
          teachers.push({
            formed: true,
            teacher: classroom.form_teacher,
            teacher_id: classroom.form_teacher_id,
          });
        }

        return teachers;
      })
    );
  }

  public getSearchListByType(): void {
    combineLatest([
      this.isSearchTeacher$,
      this.classList$,
      this.currentClassId$,
    ])
      .pipe(
        map(([value, data, id]) => {
          return data.map((el) => {
            return value
              ? { name: el.form_teacher_name, id: el.id, active: el.id === id }
              : {
                  name: el.grade + el.section,
                  id: el.id,
                  active: el.id === id,
                };
          });
        })
      )
      .subscribe((value) => this.searchList$.next(value));
  }

  public deleteClass(id: number): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>('https://qlsv-mu.vercel.app/api/class/', {
        params: {
          class_id: id,
        },
      })
      .pipe(
        catchError((e) => throwError(e)),
        tap(() => {
          this.dataStorage.deleteClassFromClassList(id);
        })
      );
  }
}
