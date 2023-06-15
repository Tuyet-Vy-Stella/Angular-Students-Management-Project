// export class Class {
//     constructor(
//         public id: number,
//         public grade: string,
//         public section: string
//     ) {}
// }

export interface Class {
    id: number;
    grade: string;
    section: string;
    form_teacher_id: number;
    form_teacher_name: string;
    created_at: string;
}

export interface IClassroom {
    id: number;
    form_teacher_id: number;
    form_teacher: string;
    grade: string;
    section: string;
    subject: ISubject[];
    student: IStudent[];
}

export interface IClassElement {
    form_teacher_id: number;
    name: string;
    id: number;
    grade: string;
    section: string;
    form_teacher_name: string;
}

export interface ISubject {
    formed: boolean;
    teacher: string;
    teacher_id: number;
    id?: number;
    name?: string;
}

export interface IStudent {
    id: number;
    name: string;
    gender: string;
    address: string;
    birthday: string;
    class_id: number;
    email: string;
    phone: string;
}

export interface ITeacher {
    name: string;
    id: number;
}
