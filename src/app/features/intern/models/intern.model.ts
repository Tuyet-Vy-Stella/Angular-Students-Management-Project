export interface Student {
  id: number
  name: string
  class_name: string
  gender: string
  phone: string
  email: string
  address: string
  birthday: string
  created_at: string
}

export type CreateStudentModel = Omit<Student, 'id' | 'created_at' | 'class_name'>
