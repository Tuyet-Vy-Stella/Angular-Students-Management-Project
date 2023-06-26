import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from '../models/mentor.model';
import { ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class MentorService {
    constructor(private http: HttpClient) {}

    getMentors() {
        return this.http.get<ResponsePagination<Mentor>>(
            'http://localhost:8080/api/v1/mentors'
        );
    }

    getMentorById(id: string) {
        return this.http.get<Mentor>(
            'http://localhost:8080/api/v1/mentors/' + id
        );
    }

    deleteMentor(id: string) {
        return this.http.delete<Mentor>(
            'http://localhost:8080/api/v1/mentors/' + id
        );
    }

    createMentor(mentor: Mentor) {
        return this.http.post<Mentor>(
            'http://localhost:8080/api/v1/mentors',
            mentor
        );
    }

    updateMentor(id: string, mentor: Mentor) {
        return this.http.put<Mentor>(
            'http://localhost:8080/api/v1/mentors/' + id,
            mentor
        );
    }
}
