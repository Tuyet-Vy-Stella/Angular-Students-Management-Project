import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import {
  IClassElement,
  IClassroom,
  IStudent,
  ISubject,
} from '../utils/classroom';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClassroomService {
  classList$ = new Subject<IClassElement[]>();

  currentClassId$ = new Subject<number>();
  isSearchTeacher$ = new BehaviorSubject<boolean>(true);
  isTeacherTab$ = new BehaviorSubject(true);

  currentClass$ = this.getCurrentClass().pipe(shareReplay(1));

  constructor(private http: HttpClient) {}

  public init(): void {
    // Check Error here
    this.http
      .get<IClassElement[]>('https://qlsv-mu.vercel.app/api/class-list')
      .subscribe((classes) => {
        this.classList$.next(classes);
        this.currentClassId$.next(classes[0].id);
      });
  }

  public getCurrentClass(): Observable<IClassroom> {
    return this.currentClassId$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((data) => console.log(data)),
      switchMap((id) => {
        return this.http.get<IClassroom>(
          `https://qlsv-mu.vercel.app/api/class/?class_id=${id}`
        );
      })
    );
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

  public getListByType(): Observable<
    { name: string; id: number; active: boolean }[]
  > {
    return combineLatest([
      this.isSearchTeacher$,
      this.classList$,
      this.currentClassId$,
    ]).pipe(
      map(([value, data, id]) => {
        return data.map((el) => {
          return value
            ? { name: el.form_teacher_name, id: el.id, active: el.id === id }
            : { name: el.grade + el.section, id: el.id, active: el.id === id };
        });
      })
    );
  }
}
