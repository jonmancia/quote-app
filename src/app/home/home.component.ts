import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quoteButtonClicked = false;
  constructor() {}

  ngOnInit() {}

  onQuoteClick() {
    this.quoteButtonClicked = !this.quoteButtonClicked;
  }

  setModalClosed(clicked) {
    if (this.quoteButtonClicked === clicked) {
      this.onQuoteClick();
    }
  }
}
