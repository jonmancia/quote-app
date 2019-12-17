import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-quote-request-confirmation',
  templateUrl: './quote-request-confirmation.component.html',
  styleUrls: ['./quote-request-confirmation.component.css'],
})
export class QuoteRequestConfirmationComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  @Input() loading: boolean = false;
  @Input() quoteTotal;
  constructor() {}

  ngOnInit() {}
}
