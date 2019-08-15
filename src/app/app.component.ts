import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from './services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  recentCourse: any;



  coursesArray: any;

  constructor(private fb: FormBuilder, private post: PostsService, private http: HttpClient, renderer2: Renderer2) {}

  ngOnInit() {

    this.courseForm = this.fb.group({
      courseTitle: ''
    })

    // this.courseForm.valueChanges.subscribe(console.log)

      this.http.get("http://localhost:3000/api/courses", httpOptions)
      .subscribe(item => {
        console.log(item);
        this.coursesArray = item;
        console.log(this.coursesArray);
      })

  }

  ngAfterViewInit() {
  }

  courseForm: FormGroup;


  title = 'cors-client';

  // courseTitles: string[] = [
  //   'Communications 42', 'Communications w/ Aliens 51', 'Physics 101'
  // ]

  currentCourse: any;

  emitCourse(course) {
    console.log(course);
    this.currentCourse = course;
  }

  async addCourseTitle(course) {
    console.log(course);
    const inputToJson = {
      title: course
    }
    console.log(inputToJson);
    console.log('submitCourseTitle is gettin invoked all up in here yo');
    this.post.submitCourse(inputToJson)

    await this.post.getRecentCoursePromise()
      .then(res => {
        this.recentCourse = res;
      })

    console.log(this.recentCourse);
    this.coursesArray.push(this.recentCourse);
    console.log(this.coursesArray);
  }

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;


  columnDefs = [
    {headerName: 'Assignment', field: 'assignment', sortable: true, filter: true, checkboxSelection: true },
    {headerName: 'Total Possible', field: 'total possible', sortable: true, filter: true },
    {headerName: 'Student Name', field: 'student name', sortable: true, filter: true }
];

  rowData = [
      { Assignment: 'Exam', totalPossible: 42 },
      { Assignment: 'Final', totalPossible: 420},
      { Assignment: 'Persuasive Essay', totalPossible: 777 }
  ];



}
