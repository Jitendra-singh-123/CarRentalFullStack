import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './navbarComponents/home/home.component';
import { AuthGuard } from './auth/Services/auth/auth.guard';
import { StorageService } from './auth/Services/storage/storage.service';
import { AboutComponent } from './navbarComponents/about/about.component';
import { SignupAdminComponent } from './auth/components/signup/signup-admin/signup-admin.component';
import { FooterComponent } from './footer/footer.component';
import { FooteradmincustComponent } from './modules/footeradmincust/footeradmincust.component';
import { ContactComponent } from './navbarComponents/contact/contact.component';

export function tokenGetter() {
  return StorageService.getToken();
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
    SignupAdminComponent,
    FooterComponent,
    FooteradmincustComponent,
    ContactComponent,

  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://localhost:44331"],
        disallowedRoutes: []
      }
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
