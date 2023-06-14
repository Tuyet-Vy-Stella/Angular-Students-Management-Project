import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeacherEditComponent, TeacherListComponent } from './pages';
import { MentorDetailComponent } from './pages/mentor-detail/mentor-detail.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TeacherListComponent },
            { path: ':id', component: MentorDetailComponent },
            { path: ':new', component: TeacherEditComponent },
            // { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule {}
