import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

import { StudentService } from '../../data-access/student.service'

interface Class {
  id: number
  grade: string
  section: string
  form_teacher_id: number
  form_teacher_name: string
  created_at: string
}

@Component({
  selector: 'app-creating-student',
  templateUrl: './creating-student.component.html',
  styleUrls: ['./creating-student.component.scss']
})
export class CreatingStudentComponent {
  studentForm!: FormGroup
  isFetchingToCreateOrUpdateStudent = false
  isFetchingToGetStudent = false
  createMode = false
  studentId: number | null = null
  classList!: Class[]

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Init create student form group
    this.studentForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, this.checkFieldEmpty]
      }),
      gender: new FormControl('male', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required, this.checkFieldEmpty]),
      phone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      class_id: new FormControl(null, [Validators.required])
    })

    // Get class list
    this.studentService.getClasses().subscribe({
      next: (classes) => {
        this.classList = classes
      }
    })

    //  Set current mode
    this.createMode = this.router.url.includes('create')

    // Handle for update mode
    if (!this.createMode) {
      this.isFetchingToGetStudent = true
      this.route.params.subscribe((params: Params) => {
        const id = +params['id']
        if (id) {
          this.studentId = id

          // Fetch student
          this.studentService.getStudentById(this.studentId).subscribe({
            next: (response) => {
              const { id, created_at, class_name, ...rest } = response
              this.studentForm.setValue(rest)
            },
            error: (error) => {
              console.error(error)
            },
            complete: () => {
              this.isFetchingToGetStudent = false
            }
          })
        }
      })
    }
  }

  checkFieldEmpty(formControl: FormControl): { [key: string]: boolean } | null {
    if (typeof formControl.value === 'string') {
      return formControl.value.toString().trim() ? null : { empty: true }
    }
    return null
  }

  onSubmit() {
    this.isFetchingToCreateOrUpdateStudent = true
    const bodyData = { ...this.studentForm.value, class_id: +this.studentForm.value.class_id }

    if (this.createMode) {
      // Create student
      this.studentService.createStudent(bodyData).subscribe({
        next: (response) => {
          // Show success toast
          this.toastrService.success('Create student successfully', 'Create student')

          // Reset form
          this.studentForm.reset({
            gender: 'male'
          })
        },
        error: (error) => {
          this.isFetchingToCreateOrUpdateStudent = false
          this.toastrService.error('Create student failure', 'Create student')
        },
        complete: () => (this.isFetchingToCreateOrUpdateStudent = false)
      })
    } else {
      // Update student
      if (this.studentId) {
        this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe({
          next: (response) => {
            this.toastrService.success('Update student successfully', 'Update student')
          },
          error: (error) => {
            this.isFetchingToCreateOrUpdateStudent = false
            this.toastrService.error('Update student failure', 'Update student')
          },
          complete: () => {
            console.log('completed...')
            this.isFetchingToCreateOrUpdateStudent = false
          }
        })
      }
    }
  }
}
