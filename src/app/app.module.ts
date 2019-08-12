import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentInputComponent } from './student-input/student-input.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { TableTooComponent } from './table-too/table-too.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    StudentInputComponent,
    GradesFormComponent,
    TableTooComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule, 
    AgGridModule.withComponents([]),
    TableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
