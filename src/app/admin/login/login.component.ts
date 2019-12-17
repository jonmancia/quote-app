import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  constructor() {}

  ngOnInit() {}

  login(form: NgForm) {
    this.loggedIn = true;
  }
}
