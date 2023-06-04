import { Component } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { AppService } from './app.service';
import { Cordinate, Stats } from './utils/interface';
import { CelToFahPipe } from './utils/cel-to-fah.pipe';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  geoCordinates: Array<Cordinate> = [
    {
      'lat': 11.0168,
      'lon': 76.9558
    },
    {
      'lat': 13.0827,
      'lon': 80.2707
    },
    {
      'lat': 9.9252,
      'lon': 78.1198
    },
    {
      'lat': 17.3850,
      'lon': 78.4867
    },
    {
      'lat': 18.4077,
      'lon': 73.2102
    }
  ]

  search!: number
  filterType: string = 'greater'
  type: boolean = true
  weatherStats$!: Observable<any>
  filteredStats!: Array<Stats>
  private weatherStats!: Array<Stats>
  private weatherSubscribe!: Subscription
  private debounceTimer: any;
  private pipe = new CelToFahPipe();


  constructor(private appService: AppService) {
    this.getCurrentLocation()
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoCordinates.unshift({
          'lat': position.coords.latitude,
          'lon': position.coords.longitude
        })
        this.fetchResultsForCordinates(this.geoCordinates);
      },
        (error) => console.error('Error getting location:', error));
    } else
      console.error('Geolocation is not supported by this browser.');
  }

  fetchResultsForCordinates(cordinates: any[]) { // to fetch values for all cordinates and give output in array of object
    const observables = cordinates.map(cord => this.appService.getWeatherRep(cord));
    this.weatherStats$ = forkJoin(observables);
    this.weatherSubscribe = this.weatherStats$.subscribe(val => this.weatherStats = val)
  }

  filterStats() { // to filter the value
    if (this.search) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.filteredStats = this.weatherStats.filter((obj: Stats) => {
          if (this.filterType === 'greater')
            return (this.type ? obj.min : this.pipe.transform(obj.min)) > this.search
          else
            return (this.type ? obj.max : this.pipe.transform(obj.max)) < this.search
        })
      }, 300);
    }
  }

  trackByFn(index: number, item: Stats): string {
    return item.name;
  }

  ngOnDestroy() {
    this.weatherSubscribe.unsubscribe()
  }
}

