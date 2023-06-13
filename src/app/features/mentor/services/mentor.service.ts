import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTeacherModel, Teacher } from '../models/mentor.model';
import { Subject } from 'app/features/technology/models/technology.model';
import { Class } from 'app/features/project/models/project.model';

@Injectable({
    providedIn: 'root',
})
export class TeacherService {
    constructor(private http: HttpClient) {}

    getTeachers() {
        return this.http.get<Teacher[]>(
            'https://qlsv-mu.vercel.app/api/mentor-list'
        );
    }

    getTeacherById(id: number) {
        return this.http.get<Teacher>(
            'https://qlsv-mu.vercel.app/api/mentor/',
            {
                params: {
                    teacher_id: id,
                },
            }
        );
    }

    getSubjects() {
        return this.http.get<Subject[]>(
            'https://qlsv-mu.vercel.app/api/technology-list'
        );
    }

    getSubjectById(id: number) {
        return this.http.get<Subject>(
            'https://qlsv-mu.vercel.app/api/technology/',
            {
                params: {
                    subject_id: id,
                },
            }
        );
    }

    getClassList() {
        return this.http.get<Class[]>(
            'https://qlsv-mu.vercel.app/api/class-list'
        );
    }

    deleteTeacher(id: number) {
        return this.http.delete('https://qlsv-mu.vercel.app/api/mentor/', {
            params: {
                teacher_id: id,
            },
        });
    }

    createTeacher(data: CreateTeacherModel) {
        return this.http
            .post('https://qlsv-mu.vercel.app/api/mentor', data)
            .pipe(
                // Success (map: modify response, tap: handle side & not modify response)
                map((response) => {
                    return {
                        code: 200,
                        success: true,
                        data: response,
                    };
                })
            );
    }

    updateTeacher(id: number, data: CreateTeacherModel) {
        return this.http.put('https://qlsv-mu.vercel.app/api/mentor/', data, {
            params: {
                teacher_id: id,
            },
        });
    }
}
