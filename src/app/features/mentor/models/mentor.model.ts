export interface Teacher {
  id: number
  name: string
  email: string
  gender: string
  birthday: string
  address: string
  phone: string
  joined_date: string
  subject_id: number
  class_id: number[]
  created_at: string
}

export type CreateTeacherModel = Omit<Teacher, 'id' | 'createdAt'>
