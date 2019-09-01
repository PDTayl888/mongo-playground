import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentInputComponent } from './student-input/student-input.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { TableTooComponent } from './table-too/table-too.component';
import { TableModule } from 'primeng/table';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SecretComponent } from './secret/secret.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentInputComponent,
    GradesFormComponent,
    TableTooComponent,
    SecretComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, 
    TableModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
