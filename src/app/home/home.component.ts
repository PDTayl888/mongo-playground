import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';
import { AngularFireAuth } from '@angular/fire/auth';


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

  currentUser: any = true;

  usersArray: any = [];

  usersArrayNew: any = [];

  recentCourse: any;

  coursesArray: any;

  newUid: any;

  currentCourse: any;


  constructor(private fb: FormBuilder, private post: PostsService, private http: HttpClient, renderer2: Renderer2, private auth: AuthService, private afAuth: AngularFireAuth) { }

  async ngOnInit() {

    await this.post.getUsersPromise()
      .then(res => {
        this.usersArrayNew = res;
      })
      console.log('INIT USERSARRAY');
      console.log(this.usersArrayNew);

      const authorizedUid = this.afAuth.auth.currentUser.uid;

      this.usersArrayNew.forEach(item => {
        if(item.uid == authorizedUid) {
          this.currentUser = false;
        }
      })
      console.log(this.currentUser);

    if(this.currentUser) {
    const authorizedDisplayName = this.afAuth.auth.currentUser.displayName;
    const authorizedUid = this.afAuth.auth.currentUser.uid;
    console.log(authorizedUid);
    console.log(authorizedDisplayName);
    
    const inputToJsonUser = {
      displayName: authorizedDisplayName,
      uid: authorizedUid
    }
    console.log(inputToJsonUser);
    this.post.submitUser(inputToJsonUser);
  }


    await this.post.getCoursesPromise()
      .then(res => {
        this.coursesArray = res;
      })
      console.log('MARKED');
    console.log(this.coursesArray);

    console.log('AUTHORIZEDUID CHECK');
    console.log(authorizedUid);
    this.coursesArray = this.coursesArray.filter(res => 
      res.uid === authorizedUid
    )

    console.log('COURSESCURRENTFILTERED');
    console.log(this.coursesArray);

  }



  ngAfterViewInit() {
  }



  title = 'grades.';

  emitCourse(course) {
    console.log(course);
    this.currentCourse = course;
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


  async addCourseTitle(course) {
    console.log(course);

    const authorizedUid = this.afAuth.auth.currentUser.uid;

    const inputToJsonCourse = {
      title: course,
      uid: authorizedUid
    }

    console.log(inputToJsonCourse);
    console.log('submitCourseTitle is gettin invoked all up in here yo');
    this.post.submitCourse(inputToJsonCourse)

    await this.post.getRecentCoursePromise()
      .then(res => {
        this.recentCourse = res;
      })

    console.log(this.recentCourse);
    this.coursesArray.push(this.recentCourse);
    console.log(this.coursesArray);
  }

}


