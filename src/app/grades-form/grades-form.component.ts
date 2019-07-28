import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { PostsService } from '../posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { ArrayServService } from '../array-serv.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


@Component({
  selector: 'grades-form',
  templateUrl: './grades-form.component.html',
  styleUrls: ['./grades-form.component.css']
})
export class GradesFormComponent implements OnInit {

  @Input() thisCourse: any;

  scoreMap = new Map();
  courseTitle: any;
  arrayForScoremap: any;
  currentAssign: any;
  scores: any[] = [];
  arrayMessage: any;
  assignmentsArray: any;
  studentsArray: any;
  nextStudent: any;
  nextAssignment: any;
  nextScore: any;
  nextTotal: any;
  showInput: boolean = false;
  showSpan: boolean = true;
  gradesForm: FormGroup;
  // scoreInputToJson: any;
  student: FormControl;
  assignment: FormControl;
  assignScore: FormControl;

  constructor(private fb: FormBuilder, 
      private posting: PostsService, 
      private http: HttpClient, 
      private data: ArrayServService) { }




  ngOnInit() {

    console.log(`COURSE ID: ${this.thisCourse._id}`);
    this.courseTitle = this.thisCourse.title;

    this.student = new FormControl("Garyyyy");
    this.assignment = new FormControl();
    this.assignScore = new FormControl();
    

    this.gradesForm = this.fb.group({
      student: [],
      assignment: [],
      assignScore: [],
      assignmentTotal: []
    });

    this.posting.getStudents()
      .subscribe(item => {
        console.log(item);
        this.studentsArray = item;
        this.studentsArray = this.studentsArray.filter(student => student.courseId == this.thisCourse._id);
        console.log(this.studentsArray);
    })

    this.posting.getAssignments()
      .subscribe(item => {
        console.log(item);
        this.assignmentsArray = item;
        this.assignmentsArray = this.assignmentsArray.filter(assign => assign.courseId == this.thisCourse._id);
    })

    this.gradesForm.get('student').valueChanges
    .pipe(debounceTime(2000))
    .subscribe(term => {
      console.log(term);
      console.log(this.nextStudent._id);
      console.log(this.thisCourse);
      this.posting.updateStudent(this.nextStudent._id, term, this.thisCourse);
      this.posting.getStudents()
        .subscribe(item => {
          this.studentsArray = item;
        })
    })

    this.gradesForm.get('assignScore').valueChanges
      .pipe(debounceTime(2000))
      .subscribe(term => {
        console.log(term);
      })


    // this.student.valueChanges
    //   .pipe(debounceTime(2800))
    //   .subscribe(item => {
    //     console.log(item.students);
    //     this.posting.updateStudent(this.nextStudent._id, item.students,
    //       this.thisCourse);
    //     this.posting.getStudents()
    //       .subscribe(item => {
    //         this.studentsArray = item;
    //       })
    //   })



    
    this.posting.getStudents()
    .subscribe(item => {
      console.log(item);
      this.studentsArray = item;
      this.studentsArray = this.studentsArray.filter(student => student.courseId == this.thisCourse._id);
      console.log(this.studentsArray);

      this.arrayForScoremap = this.studentsArray.filter(item => {
        console.log(item);
         return this.thisCourse._id === item.courseId;
      })
      console.log(this.arrayForScoremap[1]);
      this.arrayForScoremap.forEach(item => {
        this.scoreMap.set(item._id, '');
      })
      console.log(this.scoreMap);
      this.arrayForScoremap.forEach(item => {
        console.log(item.name);
        this.scores.push(0)
      })
      console.log(this.scores);

  })

}





   

  getStudents() {
    this.http.get("http://localhost:3000/api/students", httpOptions)
    .subscribe(item => {
      console.log(item);
      this.studentsArray = item;
      this.studentsArray = this.studentsArray.filter(student => student.courseId == this.thisCourse._id);
    })
  }

  getAssignments() {
    this.http.get("http://localhost:3000/api/assignments", httpOptions)
    .subscribe(item => {
      console.log(item);
      this.assignmentsArray = item;
      this.assignmentsArray = this.assignmentsArray.filter(assign => assign.courseId == this.thisCourse._id);
      console.log(this.assignmentsArray);
    })
  }


  emitStudent(item) {
    console.log("emit Student");
    console.log(item.name);
    this.nextStudent = item;
    console.log(this.nextStudent.courseId);
  }

  emitAssignment(item) {
    console.log("emit Assignment");
    console.log(item.title);
    this.nextAssignment = item;
    console.log(this.nextAssignment.courseId);
  }

  emitScore(item) {
    console.log("emit Score");
    console.log(item);
    this.nextScore = item;
    console.log(this.nextScore);
  }

  emitAssignmentTotal(item) {
    console.log("emitAssignmentTotal");
    console.log(item);
    this.nextTotal = item;
  }

  newStudent(studentName) {
    console.log(studentName.value);
    console.log(this.thisCourse._id);
    const inputToJson = {
      name: studentName.value,
      courseId: this.thisCourse._id
    };
    console.log('submitStudentTitle is gettin invoked all up in here yo');
    this.posting.submitStudent(inputToJson)
    this.getStudents();
  }

  // setScores(currentAssign) {
  //   const scoreMap = new Map();
  //   for(let i = 0; i < this.studentsArray.length; i++) {
  //     if(this.studentsArray[i].courseId == currentAssign) {
  //     scoreMap.set(this.studentsArray[i]._id, '');
  //     this.currentAssign.push(this.studentsArray[i]._id);

  //     }
  //   }
  //   console.log(scoreMap);
  //   scoreMap.forEach(item => {
  //     this.currentAssign.forEach(item => {
  //       this.scores.push(scoreMap.get(item))
  //     })
  //   })
  // }

  newAssignment(assignmentTitle, total) {
    console.log('newAssignment invoked');

    console.log(assignmentTitle.value);
    console.log(total.value);
    console.log(this.thisCourse._id);
    const inputToJson = 
    {
      title: assignmentTitle.value,
      total: total.value,
      courseId: this.thisCourse._id
    };
    console.log(inputToJson);
    this.posting.submitAssignment(inputToJson);

    this.getStudents();
    console.log(this.studentsArray);
    if(this.studentsArray.length > 0) {
      this.studentsArray.forEach(item => {
        const scoreInputToJson = {
          assignmentId: "poopyId",
          studentId: item._id,
          courseId: item.courseId,
          score: 0
        }
        console.log(scoreInputToJson);
        this.posting.submitAssignmentScore(scoreInputToJson);
      })
    }

    this.setScoresArray(); 
  }




  setScoresArray() {
    this.getAssignments();
    console.log(this.studentsArray);
    console.log('setScoresArray invoked');
    console.log(this.thisCourse._id);

    this.arrayForScoremap = this.studentsArray.filter(item => {
      console.log(item);
      return this.thisCourse._id === item.courseId;
    })
    console.log(this.arrayForScoremap[1]);
    this.arrayForScoremap.forEach(item => {
      this.scoreMap.set(item._id, '');
    })
    console.log(this.scoreMap);
    this.arrayForScoremap.forEach(item => {
      console.log(item.name);
      this.scores.push(0)
    })
    // for(let i = 0; i < this.arrayForScoremap.length; i++) {
    //   console.log(i);
    //   console.log(this.scores[i]);
    //   this.scores[i] = 0;
    // }
    console.log(this.scores);


  }






  switchInputOrSpan() {
    this.showSpan = !this.showSpan;
    this.showInput = !this.showInput;
  }


  @ViewChild('course', {static: false}) course: any;

  totalsTotal: number = 1999;

  // [
  //   'gary',
  //   'barry',
  //   'larry',
  //   'sarah',
  //   'clara',
  //   'dara',
  //   'schmara',
  //   'fofara'
  // ]

  // courseId: number = this.studentsArray.length;


  // courseTitles: string[] = [
  //   'Communications 42', 'Communications w/ Aliens 51', 'Physics 101'
  // ]

  // courseTitle = this.courseTitles[1];

  // scores: number[] = [
  //   2,
  //   12,
  //   42,
  //   55,
  //   75,
  //   22,
  //   99,
  //   420
  // ]

  totals: number[] = [
    26,
    123,
    42,
    555,
    7,
    22,
    999,
    40
  ]

  fart: number = 12






}
