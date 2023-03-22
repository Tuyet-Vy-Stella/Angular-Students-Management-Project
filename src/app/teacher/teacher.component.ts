import { Component } from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
})
export class TeacherComponent {

  constructor(private dataStorage : DataStorageService) {
  }

  onFetch(){
    this.dataStorage.fetchTeachersData();
  }
}
