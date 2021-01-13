import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ATMStrategy } from '../model/atmStrategy';

@Injectable({
  providedIn: 'root'
})
export class AtmStrategyService {
  atmStrategy: ATMStrategy[] = new Array<ATMStrategy>();

  constructor() { }

  public getStrategies(): Observable<ATMStrategy[]> {
    this.atmStrategy.push(new ATMStrategy('Reversal 1', 1, 4, [6], [6], 8));
    this.atmStrategy.push(new ATMStrategy('Reversal 2', 2, 4, [220, 250], [600, 600], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 3', 3, 3, [210, 400, 250], [600, 1200, 1000], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 4', 4, 2, [100], [600, 750], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 5', 5, 1, [45, 210, 220, 230, 240, 250, 260], [600, 610, 620, 630, 640, 650, 660], 100));

    return of(this.atmStrategy);
  }
}
