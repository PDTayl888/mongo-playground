import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'student-input',
  templateUrl: './student-input.component.html',
  styleUrls: ['./student-input.component.css']
})
export class StudentInputComponent implements OnInit {

//   headers = new HttpHeaders({
    
//    );
// options = { headers: this.headers };

  public myFormControl: FormControl;
  courseTitle: any = "Comm 101";


  url = 'localhost:3000';
  // employeeData: Employee[] = [];

  constructor(private http: HttpClient) {
    console.log('constructor invoked motherfuckerz!');
    let headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*');

    let corsPost = http.get(this.url, { headers })
    .subscribe(res => {
      console.log(res);
    });

    // console.log(JSON.stringify(corsPost));
  }
  
posts: any;

readonly ROOT_URL =  'https://jsonplaceholder.typicode.com/posts?id=27';

sendBrowserData(): void {
  console.log('bullshit');
  // let headers = new HttpHeaders().set('Access-Control-Allow-Origin', 'http://localhost:4200');

  this.posts = this.http.get(this.ROOT_URL)
  .subscribe(
    (data: any) => {
      console.log(data);
    }
  )
  // console.log(JSON.stringify(this.posts));
}











  ngOnInit() {
  }

  // postCourseTitle() {
  //   console.log('postCourseTitle invoked');
  //   this.poop = this.http.get('localhost:3000/');
  //   console.log(this.poop);
  //   // this.http.post('localhost:3000/api/courses', { title: "updated from NG!!  GREAT SUCCESS!!" })
  // }
  // sendBrowserData(): void {
  //   this._http.sendBrowserData(this._deviceDetector.browser)
  //     .subscribe(res => {
  //       this.browserDataArray = this._objToArray.transform(res);
  //     });
  // }

}
