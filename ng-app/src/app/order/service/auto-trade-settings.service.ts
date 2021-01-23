import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AutoTradeSetting } from '../model/auto-trade-setting';

@Injectable({
  providedIn: 'root'
})
export class AutoTradeSettingsService {
  autoTradingSettings: AutoTradeSetting[] = new Array<AutoTradeSetting>();

  constructor() { }

  public Initialize() {
    this.getStrategies().subscribe((atm: AutoTradeSetting[]) => {
      this.autoTradingSettings = atm;
    });
  }

  private getStrategies(): Observable<AutoTradeSetting[]> {
    this.autoTradingSettings.push(new AutoTradeSetting(1, 'Reversal 1', 1, 4, [6], [6], 8));
    this.autoTradingSettings.push(new AutoTradeSetting(2, 'Reversal 2', 2, 4, [20, 30], [21, 31], 8));
    this.autoTradingSettings.push(new AutoTradeSetting(3, 'Reversal 3', 3, 3, [30, 40, 50], [31, 41, 51], 8));
    this.autoTradingSettings.push(new AutoTradeSetting(4, 'Reversal 4', 4, 2, [60], [61, 62], 8));
    this.autoTradingSettings.push(new AutoTradeSetting(5, 'Reversal 5', 5, 1, [10, 20, 30, 40, 50], [10, 20, 30, 40, 50], 3));

    return of(this.autoTradingSettings);
  }
}
