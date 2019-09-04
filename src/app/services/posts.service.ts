import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

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

async getRecentCoursePromise() {
  console.log("getRecentCoursePromise invoked in service");
  return await this.http.get('http://localhost:3000/api/courses/recent', httpOptions).toPromise();
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

getUsers() {
  return this.http.get("http://localhost:3000/api/users", httpOptions);
}

async getUsersPromise() {
  console.log('getUsersPromise invoked in postService');

  return await this.http.get("http://localhost:3000/api/users", httpOptions).toPromise();
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

  submitUser(data: any) {
    this.http
    .post("http://localhost:3000/api/users",
    data, httpOptions
    )
    .subscribe(res => {
      console.log("submitUser hast been invokedeth");
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

  removeStudent(id: any) {
    console.log('remove student service invoked');
    console.log(id);
    this.http.delete("http://localhost:3000/api/students/" + id)
      .subscribe(res => {
        console.log(res);
    })
  }

  updateAssignmentScore(id: any, newScore: any) {
    console.log('updateStudent service invoked');
    this.http.put("http://localhost:3000/api/assignmentscore/" + id, newScore)
      .subscribe(res => {
        console.log(res);
    });
  }

  removeStudentScore(id: any) {
    console.log('removeStudentScores invoked in service');
    this.http.delete("http://localhost:3000/api/assignmentscore/" + id)
      .subscribe(res => {
        console.log(res);
    })
  }

  removeAssignment(id: any) {
    console.log('removeAssignment invoked in service');
    console.log(id);
    this.http.delete("http://localhost:3000/api/assignments/" + id)
      .subscribe(res => {
        console.log(res);
    })
  }


  updateAssignment(id: any, newAssignmentObject: any) {
    console.log('updateAssignment service invoked');
    this.http.put("http://localhost:3000/api/assignments/" + id, newAssignmentObject)
    .subscribe(res => {
      console.log(res);
    });
  }

}
