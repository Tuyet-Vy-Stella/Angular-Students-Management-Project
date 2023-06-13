import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CreatingStudentComponent } from './components';
import { StudentDetailComponent, StudentListComponent } from './pages';

const routes: Routes = [
    { path: '', component: StudentListComponent },
    { path: 'create', component: CreatingStudentComponent },
    {
        path: ':id',
        children: [
            {
                path: '',
                component: StudentDetailComponent,
            },
            { path: 'update', component: CreatingStudentComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
