import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from './posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
export class AppComponent implements OnInit{

  coursesArray: any;

  constructor(private fb: FormBuilder, private posting: PostsService, private http: HttpClient) {}

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

  addCourseTitle(course) {
    console.log(course);
    const inputToJson = {
      title: course
    }
    console.log(inputToJson);
    console.log('submitCourseTitle is gettin invoked all up in here yo');
    this.posting.submitCourse(inputToJson)
  }
}
