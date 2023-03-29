import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  faCakeCandles,
  faEnvelope,
  faLocationDot,
  faPhone,
  faSignature,
  faTransgender,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import { Student } from '../../data-access/student.model';
import { StudentService } from '../../data-access/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent {
  backgroundImage = 'url(../assets/images/profile-bg.jpg)';
  icons = {
    faSignature,
    faUsers,
    faTransgender,
    faPhone,
    faEnvelope,
    faLocationDot,
    faCakeCandles,
  };
  student: Student | null = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (Number.isInteger(id)) {
        this.studentService.getStudentById(id).subscribe((response) => {
          response && (this.student = response);
        });
      }
    });
  }
}
