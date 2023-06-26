import { Mentor } from 'app/features/mentor/models/mentor.model';

export interface Intern {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    birthday: string;
    technology: string;
    description: string;
    status: string;
    mentor: Mentor;
}

export interface InternParams {
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    birthday: string;
    technology: string;
    description: string;
    status: string;
    mentor: string;
}
