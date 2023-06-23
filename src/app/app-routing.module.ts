import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards';
import { AdminLayoutComponent } from '@core/layouts';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('./features/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
            {
                path: 'interns',
                loadChildren: () =>
                    import('./features/intern/intern.module').then(
                        (module) => module.StudentModule
                    ),
            },
            {
                path: 'teams',
                loadChildren: () =>
                    import('./features/technology/technology.module').then(
                        (m) => m.SubjectModule
                    ),
            },
            {
                path: 'mentors',
                loadChildren: () =>
                    import('./features/mentor/mentor.module').then(
                        (m) => m.TeacherModule
                    ),
            },
            {
                path: 'projects',
                loadChildren: () =>
                    import('./features/project/project.module').then(
                        (m) => m.ClassroomModule
                    ),
            },
            {
                path: 'quiz',
                loadChildren: () =>
                    import('./features/quiz/quiz.module').then(
                        (m) => m.QuizModule
                    ),
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
