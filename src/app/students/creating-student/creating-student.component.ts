import { Component, ElementRef, HostListener } from '@angular/core'
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-creating-student',
  templateUrl: './creating-student.component.html',
  styleUrls: ['./creating-student.component.scss']
})
export class CreatingStudentComponent {
  createStudentForm!: FormGroup
  file: File | null = null

  ngOnInit() {
    this.createStudentForm = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, this.checkFieldEmpty]
      }),
      gender: new FormControl('male', [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required, this.checkFieldEmpty]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      grade: new FormControl('10', [Validators.required]),
      section: new FormControl('a', [Validators.required]),
      photo: new FormControl(null)
    })
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0)
    this.file = file
  }

  // onChangePhoto(event: Event) {
  //   this.previewPhoto = window.URL.createObjectURL(<HTMLInputElement>event.target?.files[0])
  // }

  checkFieldEmpty(formControl: FormControl): { [key: string]: boolean } | null {
    if (typeof formControl.value === 'string') {
      return formControl.value.toString().trim() ? null : { empty: true }
    }
    return null
  }

  onSubmitCreateStudent() {
    console.log(this.createStudentForm)
  }
}
