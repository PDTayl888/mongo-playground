import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  usersArray: any = [];

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


  title = 'grades.';


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

}

