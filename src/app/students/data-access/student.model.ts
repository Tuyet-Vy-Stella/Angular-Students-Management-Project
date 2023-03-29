export interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
  created_at: string;
}

export type CreateStudentModel = Omit<Student, 'id' | 'createdAt'>;
