import { Injectable } from '@angular/core';
import { Cordinate } from './utils/interface';
import { HttpService } from './utils/http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpService: HttpService) { }

  getWeatherRep(cord: Cordinate) {
    return this.httpService.getCall(`/weather?lat=${cord.lat}&lon=${cord.lon}&units=metric&appid=`).pipe(
      map((resp: any) => ({
        'max': resp.main.temp_max,
        'min': resp.main.temp_min,
        'name': resp.name,
      }))
    )
  }
}