import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModules } from './classroom-routing.modules';
import { ClassroomDetailsComponent } from '../classroom-details/classroom-details.component';
import { ClassroomAddComponent } from '../classroom-add/classroom-add.component';
import { ModalComponent } from '../../ui/modal/modal.component';

@NgModule({
  declarations: [
    ClassroomDetailsComponent,
    ClassroomAddComponent,
    ModalComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ClassroomRoutingModules,
    FormsModule,
  ],
})
export class ClassroomModule {}
