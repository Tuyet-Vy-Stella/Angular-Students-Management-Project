import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './pages';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: SubjectListComponent },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubjectRoutingModule {}
