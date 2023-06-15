import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClassroomDetailsComponent } from './pages';

const routes: Routes = [
    { path: '', component: ClassroomDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClassroomRoutingModules {}
