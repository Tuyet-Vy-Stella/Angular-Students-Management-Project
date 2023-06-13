import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectEditComponent, SubjectListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SubjectListComponent },
            { path: 'new', component: SubjectEditComponent },
            { path: ':id', component: SubjectEditComponent },
            { path: ':id/edit', component: SubjectEditComponent },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubjectRoutingModule {}
