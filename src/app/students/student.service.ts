import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Student } from './student.model'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentList() {
    return this.http.get<Student[]>('https://qlsv-mu.vercel.app/api/student-list')
  }
}
