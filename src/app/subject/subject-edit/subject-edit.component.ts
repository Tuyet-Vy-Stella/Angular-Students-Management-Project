import { Component } from '@angular/core';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent {
  onClick(){
    alert('Clicked!')
  }
}
