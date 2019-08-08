import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
// import { Car } from '../../components/domain/car';
// import { CarService } from '../../service/carservice';
// import { SelectItem } from '../../../components/common/api';
// import {MessageService} from '../../../components/common/messageservice';

@Component({
  selector: 'app-table-too',
  templateUrl: './table-too.component.html',
  styleUrls: ['./table-too.component.css']
})
export class TableTooComponent implements OnInit {


    headers: string[] = ['assignments', 'total Possible', 'Gary Indiana', 'Frankie FartKnuckle'];

    students = [
            {"assignment": "English", "total": "42", "studentName1": "Gary Indiana", "studentName2": "Larry Schmindiana"},
            {"assignment": "Physics", "total": "420", "studentName1": "Bandai", "studentName2": "Larry Schmindiana"},
            {"assignment": "Gym", "total": "100", "studentName1": "Bruce Wayne", "studentName2": "Larry Schmindiana"},
            {"assignment": "Algebra", "total": "99", "studentName1": "Gary Indiana", "studentName2": "Larry Schmindiana"},
            {"assignment": "Underwater Basket Weaving", "total": "4", "studentName1": "Gary Indiana", "studentName2": "Larry Schmindiana"},
            {"assignment": "English 42", "total": "42", "studentName1": "Gary Indiana", "studentName2": "Harry Henderson"},
            {"assignment": "English 666", "total": "42", "studentName1": "Gary Indiana", "studentName2": "Larry Schmindiana"},
            {"assignment": "English 777", "total": "42", "studentName1": "Gary Indiana", "studentName2": "Larry Schmindiana"}
        ];
    

    constructor() { }

    ngOnInit() {
        // this.carService.getCarsSmall().then(cars => this.cars1 = cars);

    }

    
}




















