import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../service/subject.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {
  name:string = '';
  id:number = 0;

  constructor(private SubjectService: SubjectService, private route: ActivatedRoute, private router: Router){}

  ngOnInit () {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.id = id;
    });

    this.name =  this.SubjectService.getNameEdit();

  }


  UpdateSubject(name:string){
    this.SubjectService.updateSubject(this.id, name).subscribe(res => {
      alert('Update is successful, the site will return to the previous page');
      this.router.navigate(['/subjects']);
    })
  }
}
