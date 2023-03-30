import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModules } from './classroom-routing.modules';
import { ClassroomDetailsComponent } from '../classroom-details/classroom-details.component';

@NgModule({
  declarations: [ClassroomDetailsComponent],
  imports: [SharedModule, ReactiveFormsModule, ClassroomRoutingModules],
})
export class ClassroomModule {}
