import {
    QuizListComponent,
    QuizAuthComponent,
    QuizItemComponent,
} from './components';
import { QuizPageComponent, QuizResultComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [
        QuizPageComponent,
        QuizAuthComponent,
        QuizListComponent,
        QuizResultComponent,
        QuizItemComponent,
    ],
    imports: [
        FormsModule,
        SharedModule,
        QuizRoutingModule,
        ReactiveFormsModule,
    ],
})
export class QuizModule {}
