import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, map, Observable, throwError } from 'rxjs';

import { CreateTeacherModel, Teacher } from '../shared/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http.get<Teacher[]>(
      'https://qlsv-mu.vercel.app/api/teacher-list'
    );
  }

  getTeacherById(id: number) {
    return this.http.get<Teacher>('https://qlsv-mu.vercel.app/api/student/', {
      params: {
        student_id: id
      }
    })
  }

  deleteTeacher(id: number) {
    return this.http.delete(
      `https://qlsv-mu.vercel.app/api/teacher-list/${id}`
    );
  }

  createTeacher(data: CreateTeacherModel) {
    return this.http.post('https://qlsv-mu.vercel.app/api/teacher', data).pipe(
      // Success (map: modify response, tap: handle side & not modify response)
      map((response) => {
        return {
          code: 200,
          success: true,
          data: response
        }
      })
    )
  }

  updateTeacher(id: number, data: CreateTeacherModel) {
    return this.http.put('https://qlsv-mu.vercel.app/api/teacher/', data, {
      params: {
        teacher_id: id
      }
    })
  }

}
