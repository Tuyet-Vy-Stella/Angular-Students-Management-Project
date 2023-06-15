import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from '../models/technology.model';

@Injectable({
    providedIn: 'root',
})
export class SubjectService {
    nameSubject: string = '';
    subjectList: Subject[] = [];

    constructor(private http: HttpClient) {}

    getListSubject() {
        return this.http.get<Subject[]>(
            'https://qlsv-mu.vercel.app/api/subject-list'
        );
    }

    /* Create new Subject */
    createSubject(name: string) {
        return this.http.post('https://qlsv-mu.vercel.app/api/subject', {
            name: name,
        });
    }

    /* Filter Subject by id */
    getSubjectById(id: number) {
        return this.http.get<{ id: number; name: string }>(
            `https://qlsv-mu.vercel.app/api/technology/?subject_id=${id}`
        );
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
    updateSubject(id: number, name: string) {
        return this.http.put<{ id: number; name: string }>(
            `https://qlsv-mu.vercel.app/api/technology/?subject_id=${id}`,
            {
                name,
            }
        );
    }

    /* delete Subject */
    deleteSubject(id: number) {
        return this.http
            .delete(`https://qlsv-mu.vercel.app/api/technology/?subject_id=${id}
    `);
    }
}
