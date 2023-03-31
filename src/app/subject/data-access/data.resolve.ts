import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SubjectService } from './subject.service';

@Injectable({ providedIn: 'root' })
export class dataSubjectResolve implements Resolve<any> {

    constructor(private subjectService: SubjectService){}
    
    resolve() {
        return this.subjectService.getListSubject() ;
    }
}