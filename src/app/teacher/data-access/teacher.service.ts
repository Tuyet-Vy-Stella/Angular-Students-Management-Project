import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Subject } from '../../shared/model/subject.model';

import { CreateTeacherModel, Teacher } from '../../shared/model/teacher.model';
import { Class } from 'src/app/shared/model/class.model';

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
    return this.http.get<Teacher>('https://qlsv-mu.vercel.app/api/teacher/', {
      params: {
        teacher_id: id,
      },
    });
  }

  getSubjects() {
    return this.http.get<Subject[]>(
      'https://qlsv-mu.vercel.app/api/subject-list'
    );
  }

  getSubjectById(id: number) {
    return this.http.get<Subject>('https://qlsv-mu.vercel.app/api/subject/', {
      params: {
        subject_id: id,
      },
    });
  }

  getClassList() {
    return this.http.get<Class[]>('https://qlsv-mu.vercel.app/api/class-list');
  }

  deleteTeacher(id: number) {
    return this.http.delete('https://qlsv-mu.vercel.app/api/teacher/', {
      params: {
        teacher_id: id,
      },
    });
  }

  createTeacher(data: CreateTeacherModel) {
    return this.http.post('https://qlsv-mu.vercel.app/api/teacher', data).pipe(
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
    return this.http.put('https://qlsv-mu.vercel.app/api/teacher/', data, {
      params: {
        teacher_id: id,
      },
    });
  }
}
