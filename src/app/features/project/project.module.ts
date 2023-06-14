import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassroomRoutingModules } from './project-routing.module';
import { ClassroomDetailsComponent, ClassroomAddComponent } from './pages';
import { ModalComponent } from './components';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';

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
        DropdownModule,
        TabMenuModule,
    ],
})
export class ClassroomModule {}
