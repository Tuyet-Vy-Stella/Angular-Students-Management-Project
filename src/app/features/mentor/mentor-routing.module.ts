import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeacherListComponent, MentorDetailComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TeacherListComponent },
            { path: 'create', component: MentorDetailComponent },
            { path: ':id', component: MentorDetailComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule {}
