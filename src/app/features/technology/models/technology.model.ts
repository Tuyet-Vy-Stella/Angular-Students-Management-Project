import { Mentor } from 'app/features/mentor/models/mentor.model';

export class Subject {
    constructor(
        public name: string,
        public id: number,
        public teacher?: any[],
        public created_at?: Date
    ) {}
}
