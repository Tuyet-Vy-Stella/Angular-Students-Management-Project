import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Intern, InternDetail, InternParams } from '../models/intern.model';
import { ResponsePagination } from '@shared/model/common';

@Injectable({
    providedIn: 'root',
})
export class InternService {
    constructor(private http: HttpClient) {}

    getInternList() {
        return this.http.get<ResponsePagination<InternDetail>>(
            'http://localhost:8080/api/v1/interns'
        );
    }
    getInternById(id: string) {
        return this.http.get<InternDetail>(
            'http://localhost:8080/api/v1/interns/' + id
        );
    }

    createIntern(data: InternParams) {
        return this.http.post<InternDetail>(
            'http://localhost:8080/api/v1/interns',
            data
        );
    }

    updateIntern(id: string, data: InternParams) {
        return this.http.put<InternDetail>(
            'http://localhost:8080/api/v1/interns/' + id,
            data
        );
    }

    deleteIntern(id: string) {
        return this.http.delete('http://localhost:8080/api/v1/interns/' + id);
    }
}
