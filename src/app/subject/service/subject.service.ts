import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService implements OnInit {
  nameSubject: string = '';
  subjectList:any = [];

  constructor(private http: HttpClient) { }

  getListSubject(): Observable<any> {
    return this.http.get('https://qlsv-mu.vercel.app/api/subject-list');

  }

  /* Create new Subject */
  createSubject(body: string) {
    return this.http.post('https://qlsv-mu.vercel.app/api/subject', {
      name: body,
      teacher: [
        {
          address: "8204 Oak Avenue, Newark, NJ, 07104",
          birthday: "2001-09-11",
          created_at: "2023-03-20T06:38:00.249710",
          email: "robert.jones@example.com",
          gender: "male",
          id: Math.floor(Math.random() * 10000) + 1,
          joined_date: "2001-05-22",
          name: "Eddie",
          password: "$2b$12$hBcOaOTgk6KOr4UgwEKTJuJlksdLvN4y0Mu39qABWyhSAggzn0B/i",
          phone: "(973) 555-1212"
        }
      ],

    })
  }
  
  /* Filter Subject by id */
  getSubjectById(id: number): Observable<any> {
     return this.http.get(`https://qlsv-mu.vercel.app/api/subject/?subject_id=${id}`)
  }


  /* Set name for edit page*/
  setNameEdit(name: string) {    
    this.nameSubject = name;
  }

  /* Get name from subject-list page */
  getNameEdit() {
    return this.nameSubject;
  }

  /* Update subject name */
  updateSubject(id: number, name: string): Observable<any> {
    return this.http.put<any>(`https://qlsv-mu.vercel.app/api/subject/?subject_id=${id}`, {
      name
    })
  }

  ngOnInit(): void {

  }

}
