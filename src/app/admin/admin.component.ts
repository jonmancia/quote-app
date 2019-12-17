import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  quotes: any[];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('http://localhost:3000/api/quotes', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe((data: any[]) => {
        this.quotes = data;
      });
  }
}
