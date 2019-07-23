import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component'

import { CrudService } from './services/crud.service'
import { AuthService, getToken } from './services/auth.service';
import { JwtHelperService, JwtModuleOptions, JwtModule } from '@auth0/angular-jwt';
const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: getToken,
    whitelistedDomains: ['localhost:4200']
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    DashboardComponent,
    ListComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot(JWT_Module_Options)
  ],
  providers: [CrudService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
