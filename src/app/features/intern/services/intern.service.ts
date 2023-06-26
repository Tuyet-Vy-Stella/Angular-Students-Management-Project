import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Intern, InternParams } from '../models/intern.model';
import { ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class InternService {
    constructor(private http: HttpClient) {}

    getInternList() {
        return this.http.get<ResponsePagination<Intern>>(
            'http://localhost:8080/api/v1/interns'
        );
    }
    getInternById(id: string) {
        return this.http.get<Intern>(
            'http://localhost:8080/api/v1/interns/' + id
        );
    }

    createIntern(data: InternParams) {
        return this.http.post<Intern>(
            'http://localhost:8080/api/v1/interns',
            data
        );
    }

    updateIntern(id: string, data: InternParams) {
        return this.http.put<Intern>(
            'http://localhost:8080/api/v1/interns/' + id,
            data
        );
    }

    deleteIntern(id: string) {
        return this.http.delete('http://localhost:8080/api/v1/interns/' + id);
    }
}
