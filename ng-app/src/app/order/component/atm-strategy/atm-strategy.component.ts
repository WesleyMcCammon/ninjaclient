import { Component, OnInit, Input } from '@angular/core';
import { ATMStrategy } from '../../model/atmStrategy';
import { FuturesValueService } from '../../../reference/service/futures-value.service';
import { SettingsService } from '../../../configuration/service/settings.service';

@Component({
  selector: 'app-atm-strategy',
  templateUrl: './atm-strategy.component.html',
  styleUrls: ['./atm-strategy.component.css']
})
export class AtmStrategyComponent implements OnInit {
  //@Input() atmStrategy: ATMStrategy;
  @Input() trigger: number;
  @Input() ticker: string;
  _atmStrategy: ATMStrategy;
  @Input('atmStrategy')
  set atmStrategy(value: ATMStrategy) {
    this._atmStrategy = value;
    if(value !== null && value !== undefined)
      this.calculatePrices();
  }
  
  takeProfitPrice: number[] = new Array<number>();
  stopLossPrice: number[] = new Array<number>();
  cancelOrderPrice: number;

  constructor(private futuresValueService: FuturesValueService,
    private settingsService: SettingsService) { }

  ngOnInit(): void {
    if(this.settingsService.defaultATMStrategy()) {
      
    }
  }

  calculatePrices() {
    this.stopLossPrice = [];
    this.takeProfitPrice = [];
  
    // get tick value based on ticker

    // TO-DO:  Calcations needs to convert dollars to ticks to 
    // determine the actual cancel, stop, and profit levels
    this.cancelOrderPrice = this.trigger - 
      this.futuresValueService.dollarsToTicks(this.ticker, this._atmStrategy.cancelOrder);
      
    for(var index = 0; index < this._atmStrategy.quantity; index++) {
      //this.stopLossPrice[index] = this.trigger - this._atmStrategy.stopLoss[index];
      this.stopLossPrice[index] = this.trigger - 
        this.futuresValueService.dollarsToTicks(this.ticker, this._atmStrategy.stopLoss[index]);
      //this.takeProfitPrice[index] = this.trigger + this._atmStrategy.takeProfit[index];
      this.takeProfitPrice[index] = this.trigger + 
        this.futuresValueService.dollarsToTicks(this.ticker, this._atmStrategy.takeProfit[index]);
    }
  }
}
