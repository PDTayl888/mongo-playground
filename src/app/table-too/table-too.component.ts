import { TableModule } from 'primeng/table';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input, ElementRef, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, debounceTime, withLatestFrom } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'table-too',
  templateUrl: './table-too.component.html',
  styleUrls: ['./table-too.component.css']
})
export class TableTooComponent implements OnInit, OnChanges {

  @Input() cols: any = [];
  @Input() watchCols: Observable<any> = from(this.cols);
  @Input() column: any;
  @Input() value: any;
  @Input() students: any = [];
  @Input() watchStudents: Observable<any> = from(this.students);
  @Input() thisCourse: any;
  studentsArray: any;
  studentsArrayFiltered: any;
  assignmentsArray: any;
  assignmentsScoreArray: any;
  mostRecent: any;
  assignmentsScoreArrayToo: any;
  assignmentsArrayFiltered: any;
  showIcon: boolean = true;
  showStudentName: boolean = false;
  totalPossible: number = 420;
  // studentTotalScore: number = 0;
  studentTotals: number[] = [];
  assignmentsTotal: number;
  studentScoreFiltered: any;
  isVisible: boolean = true;
  removeAssignmentIndex: number;
  showEdit: boolean = false;
  removeStudentId: any;
  correctStudent: any;

  // public cols;

  // students = [];
    
  constructor(private post: PostsService) { }

  changelog: any = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges invoked");
    console.log(JSON.stringify(changes));
    for (const propName in changes) {
      const change = changes[propName];
      const to  = JSON.stringify(change.currentValue);
      const from = JSON.stringify(change.previousValue);
      const changeLog = `${propName}: changed from ${from} to ${to} `;
      this.changelog.push(changeLog);
 }
}
  
// **********************************************************************
// *********************************************************************
// ********************************************************************
// NGONINIT RIGHT HERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  async ngOnInit() {

    console.log(` COURSE_ID: ${this.thisCourse._id}`);

    this.cols = [
      { field: 'assignment', header: 'Assignments' },
      { field: 'total', header: 'Total' },
    ];
        
    await this.post.getStudentsPromise()
      .then(item => {
        // console.log(item);
        this.studentsArray = item;
      });
    console.log(this.studentsArray);

    this.studentsArray = this.studentsArray.filter(student => 
      student.courseId == this.thisCourse._id);
      console.log(this.studentsArray);
                                                 
      this.studentsArray.forEach((student, i) => {
        const studentNumber = i + 1;
        console.log(studentNumber);
        const newHeaderField = { field: `studentName${studentNumber}`, header: `${student.name}`};
        this.cols.push(newHeaderField);                              
        // console.log(this.cols);
      })


    await this.post.getAssignmentsPromise()
      .then(res => {
        // console.log(res);
        this.assignmentsArray = res;
      });
    console.log(this.assignmentsArray);

    this.assignmentsArray = this.assignmentsArray.filter(assignment => 
    assignment.courseId == this.thisCourse._id);
    // console.log(this.assignmentsArray);

    await this.post.getAssignmentScorePromise()
      .then(res => {
        // console.log("getAssignmentScorePromise invoked in table-too");
        // console.log(res);
        this.assignmentsScoreArray = res;
      });
    // console.log(this.assignmentsScoreArray);

    this.assignmentsScoreArray = this.assignmentsScoreArray.filter(item => {
      // console.log(item.courseId);
      // console.log(this.thisCourse._id);
      return item.courseId == this.thisCourse._id;
    });
    // console.log(this.assignmentsScoreArray);



  
    this.assignmentsArray.forEach(assign => {
      const newData = { assignment: `${assign.title}`, total: `${assign.total}`, }
      console.log(newData);

      this.assignmentsScoreArrayToo = this.assignmentsScoreArray.filter(item => {
        console.log(item.assignmentId);
        console.log(assign._id);
        return item.assignmentId == assign._id;
      });
      console.log("POOOOOOOOOOPPPPP");
      console.log(this.assignmentsScoreArray);
  
      this.assignmentsScoreArrayToo.forEach((student, i) => {
        console.log(student.score);
      const studentNumber = i + 1;
      console.log(studentNumber);
      newData[`studentName${studentNumber}`] = student.score;
      })
        this.students.push(newData);
        console.log(this.students);
    })

    this.studentsArray.forEach(student => {
      let studentTotalScore: number = 0;
      console.log(this.assignmentsScoreArray);
      this.studentScoreFiltered = this.assignmentsScoreArray.filter(item => {
        return item.studentId == student._id;
      });
      console.log(this.studentScoreFiltered);

      for(let i=0; i<this.studentScoreFiltered.length; i++) {
        studentTotalScore = studentTotalScore + parseInt(this.studentScoreFiltered[i].score)
      }

      this.studentTotals.push(studentTotalScore);

      console.log(studentTotalScore);
    })

    this.assignmentsTotal = 0;

    // SUB TOTAL POSSIBLE COLUMN
    console.log(this.assignmentsArray);

    for(let i=0; i<this.assignmentsArray.length; i++) {
      this.assignmentsTotal = this.assignmentsTotal + parseInt(this.assignmentsArray[i].total);
    }

    console.log(this.assignmentsTotal);

    // SUM STUDENT TOTAL COLUMNS

    console.log(this.assignmentsScoreArray);

   }

// ********************************************************************
// *********************************************************************
// **********************************************************************



  async newStudent(studentName) {
    console.log(studentName.value);
    console.log(this.thisCourse._id);
    const inputToJson = {
      name: studentName.value,
      courseId: this.thisCourse._id
    };
    console.log('submitStudentTitle is gettin invoked all up in here yo');
    this.post.submitStudent(inputToJson);

    await this.post.getRecentStudentPromise()
    .then(res => {
      this.mostRecent = res;
      console.log(this.mostRecent);
    });
    console.log(this.mostRecent);

    this.assignmentsArrayFiltered = this.assignmentsArray.filter(assignment => 
      assignment.courseId == this.thisCourse._id);

      this.assignmentsArrayFiltered.forEach(item => {
        const inputToJson = {
          assignmentId: item._id,
          studentId: this.mostRecent._id,
          courseId: this.thisCourse._id,
          score: 0
        }
        this.post.submitAssignmentScore(inputToJson);
      })

      this.cols = [];
      this.students = [];

      this.refresh();

      // setTimeout(()=>{console.log("TEST VIEW UPDATE THEORY");}, 0);
  
  }


// ADD ASSIGNMENT

  async newAssignment(assignmentTitle, total) {
    console.log(total);
    const inputToJson = 
    {
      title: assignmentTitle.value,
      total: total.value,
      courseId: this.thisCourse._id
    };
    console.log(inputToJson);
    this.post.submitAssignment(inputToJson);

    await this.post.getRecentPromise()
        .then(res => {
          this.mostRecent = res;
          console.log(this.mostRecent);
        });
    console.log(this.mostRecent);

    this.studentsArrayFiltered = this.studentsArray.filter(student => 
      student.courseId == this.thisCourse._id);


    this.studentsArrayFiltered.forEach(item => {
      const inputToJson = {
        assignmentId: this.mostRecent._id,
        studentId: item._id,
        courseId: this.thisCourse._id,
        score: 0
      }
      this.post.submitAssignmentScore(inputToJson);
    })

    // this.cols = [];
    this.students = [];


    this.refresh();

    // setTimeout(()=>{console.log("TEST VIEW UPDATE THEORY");}, 0);
    
  }


  // isIconVisible() {
  //   console.log("isIconVisible");
  //   this.showIcon = !this.showIcon;
  // }


  isIconVisible() {
    console.log("isIconVisible");
    this.showIcon = !this.showIcon;
    console.log(this.showIcon);
  }

// REMOVE STUDENT

  async removeStudentName(data, arrayPosition, field, students, col) {
    console.log(this.thisCourse);
    this.showStudentName = !this.showStudentName;
    console.log("editStudentName!");
    console.log(this.cols);
    console.log(col);
    // console.log(this.cols[col]);
    const studentIndex = this.cols.indexOf(col) - 2;
    console.log(studentIndex);

    let studentsArr: any;

    // console.log(studentsArr[studentIndex]);
    await this.post.getAssignmentScorePromise()
      .then(item => {
        console.log(item);
        this.assignmentsScoreArray = item;
      })
    console.log(this.assignmentsScoreArray);

    this.assignmentsScoreArray = this.assignmentsScoreArray.filter(item => {
      console.log(item.studentId);
      // console.log(studentsArr[studentIndex]._id);
      return item.studentId == this.studentsArray[studentIndex]._id;
    });

    console.log(this.assignmentsScoreArray);

    for(let i=0; i<this.assignmentsScoreArray.length; i++) {
      console.log(i);
      console.log(this.assignmentsScoreArray[i]._id);
      this.post.removeStudentScore(this.assignmentsScoreArray[i]._id);
    }


    await this.post.getStudentsPromise()
    .then(item => {
      console.log(item);
      this.studentsArray = item })
      console.log(this.studentsArray[studentIndex]);
    
      console.log(this.studentsArray);

  this.studentsArray.filter(item => {
    return item.courseId == this.thisCourse._id;
  })
  console.log(col.header);
  console.log(this.studentsArray);
  this.studentsArray.forEach(item => {
    console.log(item.name);
    console.log(col.header);
    if(item.name == col.header) {
      this.removeStudentId = item._id;
    }
  })
  console.log(this.removeStudentId);
  console.log(this.correctStudent);
  console.log(this.studentsArray);

  // console.log(studentsArr[studentIndex]._id);

  this.post.removeStudent(this.removeStudentId);

    // this.assignmentsScoreArray = this.assignmentsScoreArray.forEach(item => {
    //   console.log(item);
    //   return this.post.removeStudentScore(item._id);
    // });

    console.log(this.assignmentsScoreArray);

    this.cols = []; 
    this.students = [];

    this.refresh();
  }



  
  // REMOVE ASSIGNMENT
  // ^^^^NEED TO ALSO REMOVE ASSIGNMENT SCORES!!!!

  async removeAssignment(data, arrayPosition, field, students, col) {
    console.log('removeAssignment invoked');
    console.log(arrayPosition);
    console.log(this.students);
    console.log(arrayPosition);
    this.students.forEach((item, i) => {
      if(item == arrayPosition) {
        this.removeAssignmentIndex = i;
      }
    });
    console.log(this.removeAssignmentIndex);

    console.log(this.assignmentsArray);
    console.log(this.assignmentsArray[this.removeAssignmentIndex].title);
    console.log(this.assignmentsArray[this.removeAssignmentIndex]._id);

    const assignmentToRemove = this.assignmentsArray[this.removeAssignmentIndex]._id;
    console.log(assignmentToRemove);

    await this.post.removeAssignment(assignmentToRemove);





  //   await this.post.getAssignmentsPromise()
  //   .then(res => {
  //     // console.log(res);
  //     this.assignmentsArray = res;
  //   });
  // console.log(this.assignmentsArray);

  // this.assignmentsArray = this.assignmentsArray.filter(assignment => 
  // assignment.courseId == this.thisCourse._id);

  console.log(this.assignmentsArray[this.removeAssignmentIndex]);

  // this.assignmentsArray = this.assignmentsArray.filter()



    await this.post.getAssignmentScorePromise()
    .then(res => {
      // console.log("getAssignmentScorePromise invoked in table-too");
      // console.log(res);
      this.assignmentsScoreArray = res;
    })
    .catch(err => {
      console.log(err);
    });
  // console.log(this.assignmentsScoreArray);
  console.log(this.thisCourse);

  this.assignmentsScoreArray = this.assignmentsScoreArray.filter(item => {
    // console.log(item.courseId);
    // console.log(this.thisCourse._id);
    return item.courseId == this.thisCourse._id;
  });

  console.log(this.assignmentsScoreArray);

  console.log(this.assignmentsScoreArray.length);
  console.log(this.assignmentsArray[this.removeAssignmentIndex]._id);
  console.log(this.assignmentsScoreArray[this.removeAssignmentIndex].assignmentId);

  for(let i=0; i<this.assignmentsScoreArray.length; i++) {
    console.log(this.assignmentsScoreArray[i].assignmentId);
    if(this.assignmentsArray[this.removeAssignmentIndex]._id === this.assignmentsScoreArray[i].assignmentId) {
      console.log(this.assignmentsScoreArray[i]._id);
      console.log("poooooooppp!!!!!!!!!");
      // console.log(this.assignmentsScoreArray[i]._id);
      await this.post.removeStudentScore(this.assignmentsScoreArray[i]._id)
    }
  }

  console.log(assignmentToRemove);




    this.cols = [];
    this.students = [];

    console.log('REFRESH CALLED MAYBE AFTER REMOVING ASSIGNMENT AND SCORES');

    this.refresh();
  }




  // EDIT MODE

  editMode() {
    this.showEdit = !this.showEdit;
  }
 
    logCols() {
      console.log(event);
      console.log(this.cols);
    }
  
    logStudents() {
      console.log(this.students);
    }

// EMIT

    async emit(data, arrayPosition, field, students, col) {
      console.log("EMIT EMIT EMIT EMIT EMIT");
      console.log(this.cols);
      console.log(col);
      console.log(this.cols.indexOf(col));
      let columnIndex = this.cols.indexOf(col);
      const studentIndex = this.cols.indexOf(col) - 2;
      console.log(studentIndex);
      console.log("emit invoked");
      console.log(data.value);
      console.log(arrayPosition);
      console.log(field);
      console.log(students);
      console.log(students.indexOf(arrayPosition));
      const assignIndex = students.indexOf(arrayPosition);
      console.log(students[students.indexOf(arrayPosition)][field]);
      console.log(this.studentsArray); 
      console.log(this.studentsArray[studentIndex]);
      
      console.log(columnIndex);

      // //////////////////////////////////////////////////
      if (columnIndex == 0) {
        console.log("COLUMN INDEX IS " + columnIndex);
        console.log(this.assignmentsArray);
        console.log(arrayPosition);
        console.log(students);

        let foundAssignment: any;
        for(let i=0; i<this.assignmentsArray.length; i++) {
          if (this.assignmentsArray[i].title !== students[i].assignment) {
            console.log(this.assignmentsArray[i].title);
            console.log(students[i].assignment)
            foundAssignment = this.assignmentsArray[i];
          }
        }
        // const foundAssignment = this.assignmentsArray.find(item => {
        // return item.title !== students[index].assignment;
        // });
        console.log(foundAssignment);
        const newAssignmentObject = {
          title: arrayPosition.assignment,
          total: foundAssignment.total,
          courseId: foundAssignment.courseId
        }

        this.post.updateAssignment(foundAssignment._id, newAssignmentObject);

        this.cols = [];
        this.students = [];
    

      }
      // ///////////////////////////////////////////////////////////////
      if (columnIndex == 1) {
        console.log("COLUMN INDEX IS " + columnIndex);
        console.log(this.assignmentsArray);
        console.log(students);
        let foundAssignment: any = '';
        for(let i=0; i<this.assignmentsArray.length; i++) {
          if (this.assignmentsArray[i].total !== students[i].total) {
            console.log(this.assignmentsArray[i].total);
            console.log(students[i].total);
            foundAssignment = this.assignmentsArray[i];
            console.log(foundAssignment);
          }
        }
        // const foundAssignment = this.assignmentsArray.find(item => {
        // return item.title !== students[index].assignment;
        // });
        console.log(arrayPosition.total);
        console.log(foundAssignment);
        const newAssignmentObject = {
          title: foundAssignment.title,
          total: arrayPosition.total,
          courseId: foundAssignment.courseId
        }
        console.log(newAssignmentObject);

        this.post.updateAssignment(foundAssignment._id, newAssignmentObject);

        this.cols = [];
        this.students = [];
  
  

      }
      // ////////////////////////////////////////////////////////////////
      if (columnIndex >= 2) {
        console.log(assignIndex);




        await this.post.getAssignmentsPromise()
        .then(res => {
          // console.log(res);
          this.assignmentsArray = res;
        });
      console.log(this.assignmentsArray);

  



        this.assignmentsArrayFiltered = this.assignmentsArray.filter(assignment => 
          assignment.courseId == this.thisCourse._id);
  
        console.log(this.assignmentsArrayFiltered);
        console.log(this.assignmentsArrayFiltered[assignIndex]);
        console.log(this.studentsArray[0].courseId);
        console.log(this.thisCourse._id);
        console.log(this.assignmentsScoreArray);
  

        await this.post.getAssignmentScorePromise()
          .then(res => {
          console.log(res);
          this.assignmentsScoreArray = res;
        });
        console.log(this.assignmentsScoreArray);


        console.log(this.studentsArray[studentIndex]);
        const foundScoreStudentId = this.assignmentsScoreArray.filter(item => {
         return item.studentId == this.studentsArray[studentIndex]._id 
        });
        console.log(foundScoreStudentId);
  
        console.log(this.assignmentsArrayFiltered[assignIndex]);
        const foundScore = foundScoreStudentId.find(item => {
        return item.assignmentId == this.assignmentsArrayFiltered[assignIndex]._id;
        })
        console.log(foundScoreStudentId);
        console.log(foundScore);
        console.log(data.value);

        console.log(this.students);
  
        const newScore = {
        assignmentId: foundScore.assignmentId,
        studentId: foundScore.studentId,
        courseId: foundScore.courseId,
        score: data.value
        };
  
        console.log(newScore);
        console.log(foundScore._id);
  
        this.post.updateAssignmentScore(foundScore._id, newScore);
      }
console.log(this.studentTotals);
      this.cols = [];
      this.students = [];
      this.studentTotals = [];

      this.refresh();
      
    }
    

    showData(array) {
      console.log("showData invoked");
      console.log(array);
    }


    
  // REFRESH

    async refresh() {
    console.log(`COURSE_ID: ${this.thisCourse._id}`);

    this.cols = [
      { field: 'assignment', header: 'Assignments' },
      { field: 'total', header: 'Total' },
    ];

    await this.post.getStudentsPromise()
      .then(item => {
        // console.log(item);
        this.studentsArray = item;
      });
    // console.log(this.studentsArray);

    this.studentsArray = this.studentsArray.filter(student => 
      student.courseId == this.thisCourse._id);
      // console.log(this.studentsArray);
        
      this.studentsArray.forEach((student, i) => {
        const studentNumber = i + 1;
        // console.log(studentNumber);
        const newHeaderField = { field: `studentName${studentNumber}`, header: `${student.name}`};
        this.cols.push(newHeaderField);
        // console.log(this.cols);
      })

    await this.post.getAssignmentsPromise()
      .then(res => {
        // console.log(res);
        this.assignmentsArray = res;
      });
    console.log(this.assignmentsArray);

    this.assignmentsArray = this.assignmentsArray.filter(assignment => 
    assignment.courseId == this.thisCourse._id);
    // console.log(this.assignmentsArray);

    await this.post.getAssignmentScorePromise()
      .then(res => {
        // console.log("getAssignmentScorePromise invoked in table-too");
        // console.log(res);
        this.assignmentsScoreArray = res;
      });
    // console.log(this.assignmentsScoreArray);

    this.assignmentsScoreArray = this.assignmentsScoreArray.filter(item => {
      // console.log(item.courseId);
      // console.log(this.thisCourse._id);
      return item.courseId == this.thisCourse._id;
    });
    // console.log(this.assignmentsScoreArray);

    this.assignmentsArray.forEach(assign => {
      const newData = { assignment: `${assign.title}`, total: `${assign.total}`, }
      // console.log(newData);

      this.assignmentsScoreArrayToo = this.assignmentsScoreArray.filter(item => {
        // console.log(item.assignmentId);
        // console.log(assign._id);
        return item.assignmentId == assign._id;
      });
      console.log("POOOOOOOOOOPPPPP");
      console.log(this.assignmentsScoreArray);
  
      this.assignmentsScoreArrayToo.forEach((student, i) => {
        // console.log(student.score);
      const studentNumber = i + 1;
      // console.log(studentNumber);
      newData[`studentName${studentNumber}`] = student.score;
    })
    this.students.push(newData);
    // console.log(this.students);
    })

    this.studentTotals = [];


    this.studentsArray.forEach(student => {
      let studentTotalScore: number = 0;
      console.log(this.assignmentsScoreArray);
      this.studentScoreFiltered = this.assignmentsScoreArray.filter(item => {
        return item.studentId == student._id;
      });
      console.log(this.studentScoreFiltered);

      for(let i=0; i<this.studentScoreFiltered.length; i++) {
        studentTotalScore = studentTotalScore + parseInt(this.studentScoreFiltered[i].score)
      }

      this.studentTotals.push(studentTotalScore);

      console.log(studentTotalScore);

    })


    

    
    console.log(this.assignmentsTotal);

    this.assignmentsTotal = 0;

    for(let i=0; i<this.assignmentsArray.length; i++) {
      this.assignmentsTotal = this.assignmentsTotal + parseInt(this.assignmentsArray[i].total);
    }

    console.log(this.assignmentsTotal);


  }


  // sumTotalPossible() {
  //   console.log(this.assignmentsArray);
  //   for(let i=0; i<this.assignmentsArray.length; i++) {
  //     this.assignmentsTotal = this.assignmentsTotal + parseInt(this.assignmentsArray[i].total);
  //   }

  //   console.log(this.assignmentsTotal);
  // }

  removeCourse(uid) {
    console.log(uid);
    this.post.removeCourse(uid);
  }
    
}





























