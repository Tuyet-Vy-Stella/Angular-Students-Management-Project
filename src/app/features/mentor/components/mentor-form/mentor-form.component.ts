import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mentor-form',
  templateUrl: './mentor-form.component.html',
  styleUrls: ['./mentor-form.component.scss']
})
export class MentorFormComponent {
    @Input() mentorForm!: FormGroup;
    @Output() onSubmit = new EventEmitter();
}
