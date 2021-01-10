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
    this.atmStrategy.push(new ATMStrategy('Reversal 1', 1, 5, [200], [600], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 2', 2, 4, [200, 250], [600, 600], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 3', 3, 3, [200, 250, 400], [600, 1000, 1200], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 4', 4, 2, [200], [600], 100));
    this.atmStrategy.push(new ATMStrategy('Reversal 5', 5, 1, [200, 210, 220, 230, 240, 250, 260], [600, 610, 620, 630, 640, 650, 660], 100));

    return of(this.atmStrategy);
  }
}
