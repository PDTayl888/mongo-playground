import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usersArray: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  users() {
    this.auth.getUsers()
      .subscribe((res) => {
        this.usersArray = res.map((item) => {
          return {
            data: item.payload.doc.data()
          }
        })
      });
    console.log(this.usersArray);
  }


}
