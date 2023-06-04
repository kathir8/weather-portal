import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celToFah'
})
export class CelToFahPipe implements PipeTransform {

  transform(celsius: number): number {
    return Number(((celsius * 9 / 5) + 32).toFixed(2));
  }
}