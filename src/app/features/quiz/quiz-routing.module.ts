import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards';
import { QuizAuthComponent } from './components';
import { QuizPageComponent, QuizResultComponent } from './pages';

const routes: Routes = [
    { path: '', component: QuizAuthComponent },
    { path: 'page', canActivate: [LoginGuard], component: QuizPageComponent },
    {
        path: 'result',
        canActivate: [LoginGuard],
        component: QuizResultComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuizRoutingModule {}
