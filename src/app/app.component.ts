import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PostsService } from "./services/posts.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { User } from "./services/user.model";
import { Router } from "@angular/router";

import { environment } from "../environments/environment";

const URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token",
  }),
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, AfterViewInit {
  currentUser: any;

  usersArray: any = [];

  recentCourse: any;

  coursesArray: any;

  showHome: boolean = false;

  courseForm: FormGroup;

  title = "grades.";

  currentCourse: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private post: PostsService,
    private http: HttpClient,
    renderer2: Renderer2,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    console.log("AUTH.USER RIGHT HERE!!!!");
    this.auth.user$.subscribe((res) => {
      if (res) {
        console.log("res route true");
        this.router.navigate(["/home"]);
      }
    });

    this.courseForm = this.fb.group({
      courseTitle: "",
    });

    // this.courseForm.valueChanges.subscribe(console.log)

    this.http.get(URL + "api/courses", httpOptions).subscribe((item) => {
      console.log(item);
      console.log("jerry");
      this.coursesArray = item;
      console.log(this.coursesArray);
    });
  }

  ngAfterViewInit() {}

  users() {
    this.auth.getUsers().subscribe((res) => {
      this.usersArray = res.map((item) => {
        return {
          data: item.payload.doc.data(),
        };
      });

      this.auth.user$.subscribe((res) => {
        console.log(res);
        this.usersArray.forEach((item) => {
          console.log("FOREAXHCL");
          console.log(item);
          if (item.data.uid == res.uid) {
            console.log("MATCH!");
            this.currentUser = res;
            console.log(this.currentUser);
          }
        });
        console.log(this.usersArray);
        // this.usersArray = res;
        this.auth.user$.subscribe((res) => {
          console.log(res);
          this.usersArray.forEach((item) => {
            console.log("FOREAXHCL");
            console.log(item);
            if (item.data.uid == res.uid) {
              console.log("MATCH!");
              this.currentUser = res;
              console.log(this.currentUser);
            }
          });
        });
      });
    });
  }
}

// this.auth.user$
// .subscribe(res => {
//   if(res) {
//     this.showHome = true;
//   } else {
//     this.showHome = false;
//   }
// })

// emitCourse(course) {
//   console.log(course);
//   this.currentCourse = course;
// }

// async addCourseTitle(course) {

//   this.auth.user$
//     .subscribe(res => {
//       console.log(res);
//     })

//   console.log(course);
//   const inputToJson = {
//     title: course
//   }
//   console.log(inputToJson);
//   console.log('submitCourseTitle is gettin invoked all up in here yo');
//   this.post.submitCourse(inputToJson)

//   await this.post.getRecentCoursePromise()
//     .then(res => {
//       this.recentCourse = res;
//     })

//   console.log(this.recentCourse);
//   this.coursesArray.push(this.recentCourse);
//   console.log(this.coursesArray);
// }

// users() {
//   this.auth.getUsers()
//     .subscribe((res) => {
//       this.usersArray = res.map((item) => {
//         return {
//           data: item.payload.doc.data()
//         }
//       })
//     });
//   console.log(this.usersArray);
// }

// this.auth.user$
// .subscribe(authRes => {
//   if(authRes) {
//     this.post.getUsersPromise()
//       .then(userRes => {
//        this.usersArray = userRes;
//       })
//   }
//   console.log("object");
//   console.log(authRes.uid);
//   console.log(this.usersArray);
// })
