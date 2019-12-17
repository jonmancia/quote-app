import {
  ViewChild,
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehiclesService } from '../vehicles.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-quote-request-modal',
  templateUrl: './quote-request-modal.component.html',
  styleUrls: ['./quote-request-modal.component.css'],
})
export class QuoteRequestModalComponent implements OnInit, OnDestroy {
  @Output() quoteModalClosed = new EventEmitter<boolean>();
  isCalcLoading = false;
  quoteTotal: number = null;
  quoteRequestComplete = false;
  vehicleMakes = [];
  vehicleModels = [];
  vehicleTypes = [];
  defaultMake = null;
  selectedMake = '';
  states = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FM',
    'FL',
    'GA',
    'GU',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MH',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'MP',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'PR',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VI',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  constructor(
    private vehicleService: VehiclesService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.vehicleService.vehicleMakesChanged.subscribe(() => {
      this.vehicleMakes = this.vehicleService.getVehicleMakes().sort();
      this.defaultMake = this.vehicleMakes[0];
      this.vehicleService
        .fetchVehicleModels(this.defaultMake)
        .subscribe((models: any) => {
          this.vehicleModels = models;
        });
      this.vehicleTypes = this.vehicleService.getVehicleMakeTypes().sort();
    });

    this.vehicleService.fetchVehicleMakes().subscribe((makes: any) => {
      this.vehicleMakes = this.vehicleService.getVehicleMakes().sort();
      this.defaultMake = this.vehicleMakes[0];
      // Get vehicle models
      this.vehicleService
        .fetchVehicleModels(this.defaultMake)
        .subscribe((models: any) => {
          this.vehicleModels = models;
          this.vehicleTypes = this.vehicleService.getVehicleMakeTypes();
        });
    });
  }

  ngOnDestroy() {
    this.vehicleMakes = [];
    this.vehicleModels = [];
  }

  closeModal() {
    this.quoteModalClosed.emit(true);
  }

  onQuoteRequestSubmit(form: NgForm) {
    console.log(form.controls);
    // Displays confirmation component/ui
    this.quoteRequestComplete = true;
    // Do spinner while performing calculation before loading
    // confirmation component
    this.isCalcLoading = true;
    // Using Directions API to fetch distance
    const {
      pcity,
      pstate,
      dcity,
      dstate,
      name,
      vmake,
      vmodel,
      vtype,
      vyear,
      phone,
      email,
    } = form.value;
    console.log(form.value);
    // Gets distance
    this.http
      .get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=${pcity}${pstate}&destination=${dcity}${dstate}&key=AIzaSyCE7ngPU_dbgOz5tgWGSBBkrXDMHOaCWl4`,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe((data: any) => {
        console.log(data);
        // Perform calculation with distance
        this.isCalcLoading = false;
        const milesStr = data.routes[0].legs[0].distance.text;
        const miles: number = Number(milesStr.split(' mi')[0].replace(',', ''));
        // and return calculation @Output to parent
        // to pass into confirmation component
        this.quoteTotal =
          miles < 50 ? Number((miles * 0.65 + 55).toFixed(2)) : miles * 0.65;

        const quoteInfo = {
          name: name,
          phone: phone,
          email: email,
          quoteTotal: this.quoteTotal,
          pickup_city: pcity,
          delivery_city: dcity,
          pickup_state: pstate,
          delivery_state: dstate,
          make: vmake,
          model: vmodel,
          year: vyear,
          type: vtype,
        };
        this.http
          .post('http://localhost:3000/api/quotes', quoteInfo, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          })
          .subscribe(data => {
            console.log(data);
          });
      });

    // Get all data and store into database
  }

  onMakeChange(value: string) {
    this.vehicleService.fetchVehicleModels(value).subscribe((models: any) => {
      this.vehicleModels = models.sort();
    });
  }
  onModelChanges(value: string) {}
}
