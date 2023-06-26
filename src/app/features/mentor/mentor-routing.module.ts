import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeacherListComponent, MentorDetailComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        component: TeacherListComponent,
    },
    { path: ':id', component: MentorDetailComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule {}
