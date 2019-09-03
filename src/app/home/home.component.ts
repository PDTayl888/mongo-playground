import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';


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

  newUid: any;

  constructor(private fb: FormBuilder, private post: PostsService, private http: HttpClient, renderer2: Renderer2, private auth: AuthService) {}

  async ngOnInit() {

    this.courseForm = this.fb.group({
      courseTitle: ''
    })

    await this.post.getUsersPromise()
    .then(res => {
      console.log("FART");
      console.log(res);
      this.usersArray = res;
    })
  console.log("THIS.USERSARRAY RIGHT HERE 1 1 ! !");
  console.log(this.usersArray);


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

    this.auth.user$
      .subscribe(res => {
        console.log("AUTH USER IN ADD COURSE");
        console.log(res.uid);
        this.newUid = res;
      })
    console.log("NEWUID");
    console.log(this.newUid);
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

  users() {
    this.auth.getUsers()
      .subscribe((res) => {
        this.usersArray = res.map((item) => {
          return {
            data: item.payload.doc.data()
          }
        })
      });
    console.log(this.usersArray);
  }


}

