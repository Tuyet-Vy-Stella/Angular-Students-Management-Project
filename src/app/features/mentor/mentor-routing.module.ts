import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TeacherEditComponent, TeacherListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: TeacherListComponent },
            { path: ':new', component: TeacherEditComponent },
            { path: ':id', redirectTo: ':id/edit', pathMatch: 'full' },
            { path: ':id/edit', component: TeacherEditComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TeacherRoutingModule {}
