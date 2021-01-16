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

  public ticksToDollars(ticker: string, ticks: number): number {
    const tickValue = this.getTickValue(ticker);
    return ticks * tickValue;
  }

  public ticksPerPoint(ticker: string): number {
    let ticks: number = 0;
    
    if(ticker === 'ES') {
      ticks = 4
    }
    else if(ticker === 'NQ') {
      ticks = 4;
    }
    
    return ticks;
  }

  public dollarsPriceAdjust(ticker: string,  amount: number): number {
    const ticksPerPoint = this.ticksPerPoint(ticker);
    const numberTicks = this.dollarsToTicks(ticker, amount);

    return (numberTicks/ticksPerPoint);
  }

  public tickPriceAdjust(ticker: string, ticks: number): number {
    const ticksPerPoint = this.ticksPerPoint(ticker);
    return (ticks/ticksPerPoint);
  }
}
