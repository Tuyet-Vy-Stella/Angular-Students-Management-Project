import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { CreateStudentModel, Student } from '../models/intern.model';

interface Class {
    id: number;
    grade: string;
    section: string;
    form_teacher_id: number;
    form_teacher_name: string;
    created_at: string;
}

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    constructor(private http: HttpClient) {}

    getStudentList() {
        return this.http.get<Student[]>(
            'https://qlsv-mu.vercel.app/api/intern-list'
        );
    }

    getStudentById(id: number) {
        return this.http.get<Student>(
            'https://qlsv-mu.vercel.app/api/intern/',
            {
                params: {
                    student_id: id,
                },
            }
        );
    }

    createStudent(data: CreateStudentModel) {
        return this.http
            .post('https://qlsv-mu.vercel.app/api/intern', data)
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

    updateStudent(id: number, data: CreateStudentModel) {
        return this.http.put('https://qlsv-mu.vercel.app/api/intern/', data, {
            params: {
                student_id: id,
            },
        });
    }

    deleteStudent(id: number) {
        return this.http.delete('https://qlsv-mu.vercel.app/api/intern/', {
            params: {
                student_id: id,
            },
        });
    }

    // Temp
    getClasses() {
        return this.http.get<Class[]>(
            'https://qlsv-mu.vercel.app/api/class-list'
        );
    }
}
