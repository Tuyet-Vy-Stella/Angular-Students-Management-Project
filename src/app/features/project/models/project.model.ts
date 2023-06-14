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
