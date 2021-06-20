import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountdownModule } from 'ngx-countdown';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { QuizService } from './quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, SocialAuthService} from 'angularx-social-login';
import { QuizOperationsComponent } from './quiz/quiz-operations/quiz-operations.component';
import { QuizAccessComponent } from './quiz/quiz-access/quiz-access.component';
import { Router } from '@angular/router';
import { BattleComponent } from './battle/battle.component';
import { LandingComponent } from './landing/landing.component';

// const config=new SocialAuthService(
//   {
//     id:'449903951196-nk5it7ka94b5s6vvkqhldbs3pp6c5fq1.apps.googleusercontent.com',
//     provider:new GoogleLoginProvider()
//   }
// );

// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    QuizComponent,
    DashboardComponent,
    QuizOperationsComponent,
    QuizAccessComponent,
    BattleComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ScrollingModule,
    BrowserAnimationsModule,
    CountdownModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    QuizService,
    BattleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
