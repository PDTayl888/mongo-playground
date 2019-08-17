import { TableModule } from 'primeng/table';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input, ElementRef, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, debounceTime } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-table-too',
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
  http: any;
  mostRecent: any;
  assignmentsScoreArrayToo: any;
  assignmentsArrayFiltered: any;
  showIcon: boolean = true;
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
    // console.log(this.studentsArray);

    this.studentsArray = this.studentsArray.filter(student => 
      student.courseId == this.thisCourse._id);
      // console.log(this.studentsArray);
        
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

    this.cols = [];
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

  editStudentName() {
    console.log("editStudentName!");
  }



  
    logCols() {
      console.log(event);
      console.log(this.cols);
    }
  
    logStudents() {
      console.log(this.students);
    }



    emit(data, arrayPosition, field, students, col) {
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

      }
      // ////////////////////////////////////////////////////////////////
      if (columnIndex >= 2) {
        this.assignmentsArrayFiltered = this.assignmentsArray.filter(assignment => 
          assignment.courseId == this.thisCourse._id);
  
        console.log(this.assignmentsArrayFiltered);
        console.log(this.assignmentsArrayFiltered[assignIndex]);
        console.log(this.studentsArray[0].courseId);
        console.log(this.thisCourse._id);
        console.log(this.assignmentsScoreArray);
  
        const foundScoreStudentId = this.assignmentsScoreArray.filter(item => {
         return item.studentId == this.studentsArray[studentIndex]._id 
        });
        console.log(foundScoreStudentId[1].assignmentId);
        console.log(this.assignmentsArrayFiltered[assignIndex]._id);
  
        const foundScore = foundScoreStudentId.find(item => {
        return item.assignmentId == this.assignmentsArrayFiltered[assignIndex]._id;
        })
        console.log(foundScoreStudentId);
        console.log(foundScore);
        console.log(data.value);
  
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
      
    }


    
    showData(array) {
      console.log("showData invoked");
      console.log(array);
    }




  
  async refresh() {
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
    // console.log(this.studentsArray);

    this.studentsArray = this.studentsArray.filter(student => 
      student.courseId == this.thisCourse._id);
      // console.log(this.studentsArray);
        
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

  }


    
}





























