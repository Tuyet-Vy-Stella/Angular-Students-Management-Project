import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModules } from './classroom-routing.modules';
import { ClassroomDetailsComponent } from '../classroom-details/classroom-details.component';
import { ClassroomAddComponent } from '../classroom-add/classroom-add.component';

@NgModule({
  declarations: [ClassroomDetailsComponent, ClassroomAddComponent],
  imports: [SharedModule, ReactiveFormsModule, ClassroomRoutingModules],
})
export class ClassroomModule {}
