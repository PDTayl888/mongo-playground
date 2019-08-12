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

  students = [];
    
  constructor(private post: PostsService) { }

  async ngOnInit() {

    console.log(` COURSE_ID: ${this.thisCourse._id}`);

    this.cols = [
      { field: 'assignment', header: 'Assignments' },
      { field: 'total', header: 'Total' },
    ];

    await this.post.getAssignmentsPromise()
      .then(res => {
        console.log(res);
        this.assignmentsArray = res;
      });
      console.log("ASSIGN: " + this.assignmentsArray);

    this.assignmentsArray = this.assignmentsArray.filter(assignment => 
    assignment.courseId == this.thisCourse._id);
    console.log("ASSIGN_AFTER: " + this.assignmentsArray);

        
    await this.post.getStudentsPromise()
      .then(item => {
        console.log(item);
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
        console.log(this.cols);
      })
  
        
    this.assignmentsArray.forEach(assign => {
      const newData = { assignment: `${assign.title}`, total: `${assign.total}`, }
      console.log(this.studentsArray);
      this.studentsArray.forEach((student, i) => {
      const studentNumber = i + 1;
      newData[`studentName${studentNumber}`] = '0';
    })
    this.students.push(newData);
    console.log(this.students);
    })



    
  }


  addCol(newField, newHeader) {
    console.log(newField.value);
    const newColObject = { field: `${newField.value}`, header: `${newHeader.value}`};
    console.log(newColObject);
    this.cols.push(newColObject);
    console.log(this.cols);
    const newRowObject =  { assignment: "English 777", total: "42",studentName1: '998', studentName2: `${newField.value}` };
    console.log(newRowObject);
    this.students.push(newRowObject);
    console.log(this.students);
  }

  showData(array) {
    console.log("showData invoked");
    console.log(array);
  }
    
}





























