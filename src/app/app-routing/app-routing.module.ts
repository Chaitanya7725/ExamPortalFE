import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from '../battle/battle.component';
import { DashboardComponent } from '../dashboard/dashboard.component'
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { QuizAccessComponent } from '../quiz/quiz-access/quiz-access.component';
import { QuizOperationsComponent } from '../quiz/quiz-operations/quiz-operations.component';
import { QuizComponent } from '../quiz/quiz.component';
import { TestComponent } from '../test/test.component';

    const routes: Routes = [
        {
            path: 'quiz',
            component: QuizComponent,
        },
        {
            path: '',
            component: LandingComponent,
        },
        {
            path: 'login',
            component: LoginComponent,
        },
        {
            path: 'getquiz',
            component: QuizAccessComponent,
        },
        {
            path: 'addquiz',
            component: QuizOperationsComponent,
        },
        {
            path: 'addQuestion/:id',
            component: QuizOperationsComponent,
        },
        {
            path: 'login',
            component: LoginComponent,
        },
        {
            path: 'dashboard',
            component: DashboardComponent,
        },
        {
            path: 'test/:id',
            component: TestComponent,
        },
        {
            path: 'battle/:id',
            component: BattleComponent,
        },
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }