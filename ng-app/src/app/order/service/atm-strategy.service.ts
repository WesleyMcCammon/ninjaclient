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
    this.atmStrategy.push(new ATMStrategy(1, 'Reversal 1', 1, 4, [6], [6], 8));
    this.atmStrategy.push(new ATMStrategy(2, 'Reversal 2', 2, 4, [20, 30], [21, 31], 8));
    this.atmStrategy.push(new ATMStrategy(3, 'Reversal 3', 3, 3, [30, 40, 50], [31, 41, 51], 8));
    this.atmStrategy.push(new ATMStrategy(4, 'Reversal 4', 4, 2, [60], [61, 62], 8));
    this.atmStrategy.push(new ATMStrategy(5, 'Reversal 5', 5, 1, [10, 20, 30, 40, 50], [10, 20, 30, 40, 50], 3));

    return of(this.atmStrategy);
  }
}
