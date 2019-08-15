import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  results: any[];


  constructor(private http: HttpClient) { }
  


getCourses() {
  console.log('getCourses invoked');
  return this.http.get("http://localhost:3000/api/courses", httpOptions);
}

async getCoursesPromise() {
  console.log('getCourses invoked');
  return await this.http.get("http://localhost:3000/api/courses", httpOptions).toPromise();
}

getStudents() {
  return this.http.get("http://localhost:3000/api/students", httpOptions);
}

async getStudentsPromise() {
  return await this.http.get("http://localhost:3000/api/students", httpOptions).toPromise();
}

getRecent() {
  return this.http.get('http://localhost:3000/api/assignments/recent', httpOptions);
}

async getRecentPromise() {
  return await this.http.get('http://localhost:3000/api/assignments/recent', httpOptions).toPromise();
}

async getRecentStudentPromise() {
  return await this.http.get('http://localhost:3000/api/students/recent', httpOptions).toPromise();
}

shit() {
  console.log("fartknocker ##########");
  return "poop";
}


async getAssignmentsPromise() {
  console.log('getAssignmentsPromise invoked in postService');

  return await this.http.get("http://localhost:3000/api/assignments", httpOptions).toPromise();
}


getAssignments() {
  return this.http.get("http://localhost:3000/api/assignments", httpOptions);
}

async getAssignmentScorePromise() {
  return await this.http.get("http://localhost:3000/api/assignmentscore", httpOptions).toPromise();
}

getAssignmentScore() {
  return this.http.get("http://localhost:3000/api/assignmentscore", httpOptions);
}


  // getCourses() {
  //   console.log("getCourses invoked");
  //   this.http
  //   .get(
  //     "http://localhost:3000/api/courses",
  //     httpOptions
  //   )
  //   .subscribe(res => {
  //     console.log("getCourses subscribe callback invoked");
  //     console.log(res);
  //   });
  // }

  submitCourse(title: any) {
    console.log("submitCourse invoked in service");
    console.log(title);
    this.http
      .post(
        "http://localhost:3000/api/courses",
        title, httpOptions
      )
      .subscribe(res => {
        console.log("SubmitCourse hath beeneth invokedeth");
        console.log(res);
      });
  }

  submitAssignmentScore(score: any) {
    console.log("submitAssignmentScore invoked in service");
    console.log(score);
    this.http
      .post(
        "http://localhost:3000/api/assignmentscore",
        score, httpOptions
      )
      .subscribe(res => {
        console.log("SubmitAssignScore hath beeneth invokedeth");
        console.log(res);
      });
  }

  submitAssignment(title: any) {
      console.log(title);
      console.log("submitAsignment invoked");
      this.http
          .post("http://localhost:3000/api/assignments", title, httpOptions)
          .subscribe(res => {
          console.log(res);
      })
  }

  submitStudent(title: any) {
    this.http
    .post("http://localhost:3000/api/students",
    title, httpOptions
    )
    .subscribe(res => {
      console.log("submitStudent hast been invokedeth");
      console.log(res);
    });
  }


  updateStudent(id: any, newName: any, setCourseId: any) {
    console.log('updateStudent service invoked');
    const fart = {
      name: newName,
      courseId: setCourseId
    }
    this.http.put("http://localhost:3000/api/students/" + id, fart)
    .subscribe(res => {
      console.log(res);
    });
  }


}
