import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentInputComponent } from './student-input/student-input.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GradesFormComponent } from './grades-form/grades-form.component';
import { AgGridModule } from 'ag-grid-angular';
import { CourseHeaderComponent } from './grades-table-components/course-header/course-header.component';
import { StudentHeaderComponent } from './grades-table-components/student-header/student-header.component';
import { AssignmentRowComponent } from './grades-table-components/assignment-row/assignment-row.component';
import { TotalsRowComponent } from './grades-table-components/totals-row/totals-row.component';
import { TableTooComponent } from './table-too/table-too.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    StudentInputComponent,
    GradesFormComponent,
    CourseHeaderComponent,
    StudentHeaderComponent,
    AssignmentRowComponent,
    TotalsRowComponent,
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
