import { TableModule } from 'primeng/table';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { PostsService } from '../services/posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-table-too',
  templateUrl: './table-too.component.html',
  styleUrls: ['./table-too.component.css']
})
export class TableTooComponent implements OnInit {

    @Input() thisCourse: any;
    studentsArray: any;
    assignmentsArray: any;

    public cols;

    assignResults: any;


    students = [];
    
    constructor(private post: PostsService) { }

    async ngOnInit() {

        // this.carService.getCarsSmall().then(cars => this.cars1 = cars);

        console.log(this.thisCourse._id);
      //  this.cols = [
      //       { field: 'assignment', header: 'Assignments' },
      //       { field: 'total', header: 'Total' },
      //   ];

      await this.post.getAssignments()
        .then(res => {
          console.log(res);
          this.assignResults = res;
        })

      console.log(this.assignResults[6]);
  
      }

    

    addCol(newField, newHeader) {
        console.log(newField.value);
        const newColObject = { field: `${newField.value}`, header: `${newHeader.value}`};
        console.log(newColObject);
        this.cols.push(newColObject);
        console.log(this.cols);
        const newRowObject =  { assignment: "English 777", total: "42", studentName1: '998', studentName2: `${newField.value}` };
        console.log(newRowObject);
        this.students.push(newRowObject);
        console.log(this.students);
    }

    showData(array) {
        console.log("showData invoked");
        console.log(array);
    }
    
}



// { field: 'studentName1', header: 'studentName1' },
// { field: 'studentName2', header: 'studentName2' }



// {assignment: "Gym", total: "100", studentName1: "Bruce Wayne", studentName2: "Larry Schmindiana"},
// {assignment: "Algebra", total: "99", studentName1: "Gary Indiana", studentName2: "Larry Schmindiana"},
// {assignment: "Underwater Basket Weaving", total: "4", studentName1: "Gary Indiana", studentName2: "Larry Schmindiana"},
// {assignment: "English 42", total: "42", studentName1: "Gary Indiana", studentName2: "Harry Henderson"},
// {assignment: "English 666", total: "42", studentName1: "Gary Indiana", studentName2: "Larry Schmindiana"},
// {assignment: "English 777", total: "42", studentName1: "Gary Indiana", studentName2: "Larry Schmindiana"}




// this.post.getStudents()
// .subscribe(item => {
//   console.log(item);
//   this.studentsArray = item;
//   console.log(this.studentsArray);
//   this.studentsArray = this.studentsArray.filter(student => 
//   student.courseId == this.thisCourse._id);
//   console.log(this.studentsArray);

//   console.log(this.assignmentsArray);
//   console.log(this.studentsArray);

//   this.assignmentsArray.forEach(assign => {
//       const newData = { assignment: `${assign.title}`, total: `${assign.total}`, }
//       console.log(this.studentsArray);
//       this.studentsArray.forEach((student, i) => {
//           const studentNumber = i + 1;
//           console.log(studentNumber);
//           const newHeaderField = { field: `studentName${studentNumber}`, header: `${student.name}`};
//           this.cols.push(newHeaderField);
//           console.log(this.cols);
//           newData[`studentName${studentNumber}`] = '0';
//           this.students.push(newData);

//       })
//       console.log(this.students);
//     })

// })



















