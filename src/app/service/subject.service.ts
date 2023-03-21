import { Injectable, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService implements OnInit {
  

  constructor(private http: HttpClient) { }

  // getListSubject() :Observable<any> {
  //   return this.http.get('https://qlsv-mu.vercel.app/api/subject-list')
  // }

  ngOnInit(): void {
    
  }

}
