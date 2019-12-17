import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { pipe, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  vehicleMakes = [];
  vehicleMakesChanged = new Subject<any[]>();
  vehicleTypes = [
    'Sedan',
    'Truck (Single Axel)',
    'SUV',
    'ATV',
    'Motorcycle',
    'Coupe',
    'Truck (Double Axel)',
    'Bus',
  ];
  constructor(private http: HttpClient) {
    this.fetchVehicleMakes()
      .pipe(
        map((data: any) => {
          const makes = [];
          let total = 0;
          for (const obj of data.Results) {
            if (total < 50) {
              makes.push(obj['MakeName']);
            }
            total++;
          }
          return makes;
        })
      )
      .subscribe(data => {
        this.vehicleMakes = data;
        this.vehicleMakesChanged.next(this.getVehicleMakes());
      });
  }

  fetchVehicleMakes() {
    return this.http.get(
      'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );
  }

  getVehicleMakes() {
    return this.vehicleMakes.slice();
  }

  fetchVehicleModels(vehicleMake: string) {
    return this.http
      .get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${vehicleMake}?format=json`
      )
      .pipe(
        map((data: any) => {
          const models = [];
          for (const model of data.Results) {
            models.push(model.Model_Name);
          }
          return models;
        })
      );
  }

  getVehicleMakeTypes() {
    return this.vehicleTypes;
  }
}
