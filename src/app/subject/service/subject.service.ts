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
  createSubject(name: string) {
    return this.http.post('https://qlsv-mu.vercel.app/api/subject', {
      name: name
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
