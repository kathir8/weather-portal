import { Component, Input } from '@angular/core';
import { Stats } from '../utils/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
  
export class CardComponent {
  @Input() obj!: { type: boolean, ind: number, iterator: Stats }
  isNight: boolean = new Date().getHours() >= 18

  get index(): number {
    return this.obj.ind;
  }
  get type(): boolean {
    return this.obj.type;
  }
  get iterator(): Stats {
    return this.obj.iterator;
  }

}
