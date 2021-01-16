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
    this.atmStrategy.push(new ATMStrategy('Reversal 2', 2, 4, [220, 250], [600, 600], 8));
    this.atmStrategy.push(new ATMStrategy('Reversal 3', 3, 3, [210, 400, 250], [600, 1200, 1000], 8));
    this.atmStrategy.push(new ATMStrategy('Reversal 4', 4, 2, [100], [600, 750], 8));
    this.atmStrategy.push(new ATMStrategy('Reversal 5', 5, 1, [10, 20, 30, 40, 50], [10, 20, 30, 40, 50], 3));

    return of(this.atmStrategy);
  }
}
