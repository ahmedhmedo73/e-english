import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './view/pages/auth/login/login.component';
import { RegisterComponent } from './view/pages/auth/register/register.component';
import { NotfoundComponent } from './view/pages/auth/notfound/notfound.component';
import { FooterComponent } from './view/layout/footer/footer.component';
import { NavbarComponent } from './view/layout/navbar/navbar.component';
import { ClickStopPropagationDirective } from './core/directives/click-stop-propagation.directive';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './core/store/reducers/score.reducer';
import { StarterComponent } from './view/pages/starter/starter.component';
import { AboutUsComponent } from './view/pages/about-us/about-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OverlayModule } from '@angular/cdk/overlay';
import { TokenInterceptor } from './core/interceptors/auth.interceptor';
import { SharedModule } from './core/shared/shared.module';
import { MessageService } from 'primeng/api';
import { SideBarComponent } from './view/layout/side-bar/side-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    FooterComponent,
    NavbarComponent,
    ClickStopPropagationDirective,
    StarterComponent,
    AboutUsComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      score: scoreReducer,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    OverlayModule,
    SharedModule,
  ],
  providers: [
    NzNotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
