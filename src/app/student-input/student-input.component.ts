import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'student-input',
  templateUrl: './student-input.component.html',
  styleUrls: ['./student-input.component.css']
})
export class StudentInputComponent implements OnInit {

  constructor( private http: HttpClient, private posting: PostsService, private fb: FormBuilder) {
    console.log('constructor invoked motherfuckerz!');

    http.get<any[]>('http://localhost:3000/')
      .subscribe(
        (res: any[]) => {
        this.shit = res;
    });

  }

  myForm: FormGroup;

  ngOnInit() {

    this.myForm = this.fb.group({
      title: '',
      studentName: '',
      studentCourseId: '',
      assignTitle: '',
      assignTotal: '',
      newId: '',
      newName: '',
      term: ''
    })

    this.myForm.valueChanges.subscribe(console.log);

    this.myForm.valueChanges
      .pipe(debounceTime(3000))
      .subscribe(term => {
        console.log(term.term);
        this.posting.updateStudent(this.nextPoop._id, term.term, "hththth");
    })

  }

  // term = new FormControl();





  readonly url = 'http://localhost:3000/';
  readonly ROOT_URL = 'http://localhost:3000/api/courses';


  public myFormControl: FormControl;

  courseTitle: any[];

  posts: any[];
  postsArray: any[] = [{ name: 'poop' }, { name: "fart"}];


  submitCourseTitle(paramTitle) {
    console.log(paramTitle.value);
    const inputToJson = {
      title: paramTitle.value
    }
    console.log('submitCourseTitle is gettin invoked all up in here yo');
    this.posting.submitCourse(inputToJson)
  }

  submitStudentTitle(studentName, studentCourseId) {
    console.log(studentName.value);
    console.log(studentCourseId.value);
    const inputToJson = {
      name: studentName.value,
      courseId: studentCourseId.value
    };
    console.log('submitStudentTitle is gettin invoked all up in here yo');
    this.posting.submitStudent(inputToJson)
  }

  submitAssignmentTitle(assignmentType, assignmentTotal) {
    console.log(assignmentType.value);
    console.log(assignmentTotal.value);
    const inputToJson = {
      assignmentType: assignmentType.value,
      total: assignmentTotal.value 
    };
    console.log('submitAssignmentTitle is gettin invoked all up in here yo');
    this.posting.submitAssignment(inputToJson)
  }

  shit: any[] = [ {name: "crap zephyrus"}];



  showSpan: boolean = false;
  showInput: boolean = true;

  switchInputOrSpan() {
    this.showSpan = !this.showSpan;
    this.showInput = !this.showInput;
  }

  emitter = new BehaviorSubject<any>('');

  nextPoop: any;

  emitPoop(item) {
    console.log(item);
    this.nextPoop = item;
    console.log(this.nextPoop._id);
  }

  

sendBrowserData(): void {

  this.http.get(this.ROOT_URL)
  .pipe(
    map(responseData => {
      const postsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
          console.log(postsArray);
    }
  }
  return postsArray;
})
)
  .subscribe((data: any) => {
      this.posts = data;
      console.log('poo');
      console.log(this.posts);
    }
  )
}


  studentsArray: any;
  poopPants: Observable<any>;
  poopy: any;


  updateStudent(id: HTMLInputElement, newName: HTMLInputElement, courseId: HTMLInputElement) {
    console.log('updateStudent invoked');
    const studentId = id.value;
    const newStudentName = newName.value;
    const studentCourseId = courseId.value;
    this.posting.updateStudent(studentId, newStudentName, studentCourseId);
  }


// -------------------------------------------------

  getStudents() {
    this.http.get("http://localhost:3000/api/students", httpOptions)
    .subscribe(item => {
      console.log(item);
      this.poopy = item;
    })
  }





  goAway(item) {
    console.log(item);
    console.log(item._id);
    console.log(`http://localhost:3000/api/students/${item._id}`);
    console.log('invoked as shit yo!');
    const newArray = this.poopy.filter(x => x._id != item._id);
    this.poopy = newArray;
    
    console.log(this.poopy);
    
    this.http.delete("http://localhost:3000/api/students/" + item._id)
    .subscribe(res => console.log(res));
  }
  

}
