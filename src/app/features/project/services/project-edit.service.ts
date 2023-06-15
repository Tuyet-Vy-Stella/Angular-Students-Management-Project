import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClassElement, ITeacher } from '../models/project.model';
import {
    BehaviorSubject,
    catchError,
    map,
    Observable,
    switchMap,
    tap,
    throwError,
} from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class ClassroomEditService {
    teacherSearchList$ = this.dataStorage.teacherSearchList$;
    teacherActiveOption$ = new BehaviorSubject<string>('');
    classList$ = this.dataStorage.classList$;
    isEdit$ = new BehaviorSubject<boolean>(false);

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
            throw new Error(
                `Class name  ${value.grade}${value.name} already exists`
            );
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

    updateClass(
        value: {
            teacherId: string;
            grade: string;
            name: string;
        },
        classId: number
    ) {
        return this.http
            .put<{ id: number }>(
                'https://qlsv-mu.vercel.app/api/class/',
                {
                    form_teacher_id: value.teacherId,
                    grade: value.grade,
                    section: value.name,
                },
                {
                    params: {
                        class_id: classId,
                    },
                }
            )
            .pipe(
                catchError((e) => throwError(e)),
                tap((classroom) => {
                    this.dataStorage.classListInitialized$.next(false);
                    this.dataStorage.currentClassId$.next(classroom.id);
                })
            );
    }

    getCurrentValue(): { grade: string; name: string } {
        if (this.dataStorage.currentClass) {
            return {
                grade: this.dataStorage.currentClass.grade,
                name: this.dataStorage.currentClass.section,
            };
        } else {
            return { grade: '', name: '' };
        }
    }

    getEditTeacherList() {
        return this.isEdit$.pipe(
            switchMap((value): Observable<ITeacher[]> => {
                if (value && this.dataStorage.currentClass) {
                    return this.teacherSearchList$.pipe(
                        map((value) => {
                            const editTeachers = [...value];
                            editTeachers.unshift({
                                name: this.dataStorage.currentClass
                                    .form_teacher,
                                id: this.dataStorage.currentClass
                                    .form_teacher_id,
                            });
                            this.teacherActiveOption$.next(
                                '' +
                                    this.dataStorage.currentClass
                                        .form_teacher_id
                            );
                            return editTeachers;
                        })
                    );
                } else {
                    return this.teacherSearchList$;
                }
            })
        );
    }
}
