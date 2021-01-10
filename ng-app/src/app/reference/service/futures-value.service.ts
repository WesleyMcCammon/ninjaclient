import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuturesValueService {

  constructor() { }

  private getTickValue(ticker: string): number {
    let tickValue: number = 0;
    tickValue = ticker === 'ES' ? 12.5 : 5;
    return tickValue;
  }

  public dollarsToTicks(ticker: string, amount: number): number {
    const tickValue = this.getTickValue(ticker);
    const ticks = amount/tickValue;
    return ticks;
  }
}
