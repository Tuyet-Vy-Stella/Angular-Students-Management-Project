import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClassroomDetailsComponent, ClassroomAddComponent } from './pages';

const routes: Routes = [
    { path: '', component: ClassroomDetailsComponent },
    { path: 'create', component: ClassroomAddComponent },
    { path: ':id/edit', component: ClassroomAddComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClassroomRoutingModules {}
