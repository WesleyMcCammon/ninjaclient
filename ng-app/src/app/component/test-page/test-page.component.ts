import { Component, OnInit } from '@angular/core';
import { ATMStrategy } from '../../order/model/atmStrategy'
import { OrderTicket } from '../../order/model/orderTicket';
import { AtmStrategyService } from '../../order/service/atm-strategy.service';
import { OrderService } from '../../order/service/order.service';
import { SettingsService } from '../../configuration/service/settings.service';
import { ATMCalculation } from '../../order/model/atmCalculation';
import { FuturesValueService } from '../../reference/service/futures-value.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  atmStragegyList: ATMStrategy[] = new Array<ATMStrategy>();
  selectedATMStrategy: ATMStrategy;
  orderTicket: OrderTicket;
  atmCalculation: ATMCalculation;

  orderTicket2: OrderTicket;
  strat: string;

  constructor(private atmStrategyService: AtmStrategyService, 
    private orderService: OrderService, 
    private settingsService: SettingsService,
    private futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this.atmStrategyService.getStrategies().subscribe((atmStragegyList: ATMStrategy[]) => {
      this.atmStragegyList = atmStragegyList;
      this.selectedATMStrategy = this.atmStragegyList[3];
      this.strat = JSON.stringify(this.selectedATMStrategy);
    });

    this.orderService.orderTicketInitiated.subscribe((orderTicket: OrderTicket) => {
      this.orderTicket = orderTicket;
      this.orderTicket2 = new OrderTicket(this.orderTicket.ticker, this.orderTicket.technicalStrategy, this.orderTicket.name,
        this.orderTicket.trigger, this.orderTicket.type);  
      
      this.getATMCalculation();
    });
  }

  private getATMCalculation() {

    const atmCalculation = this.orderService.calculatePrices(this.orderTicket.ticker, 
      this.orderTicket.trigger, this.orderTicket.type, this.selectedATMStrategy);
    atmCalculation.stopLossPrice = atmCalculation.stopLossPrice.filter(s => !isNaN(s));
    atmCalculation.takeProfitPrice = atmCalculation.takeProfitPrice.filter(s => !isNaN(s));

    const stopLossTicks: number[] = [];
    this.selectedATMStrategy.stopLoss.forEach(sl => {
      stopLossTicks.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, sl));
    });

    const takeProfitTicks: number[] = [];
    this.selectedATMStrategy.takeProfit.forEach(tp => {
      takeProfitTicks.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, tp));
    });

    const cancelOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket2.ticker, this.selectedATMStrategy.cancelOrder);
    const entryOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket2.ticker, this.selectedATMStrategy.entry);
    // this.orderTicket2.setATM(this.selectedATMStrategy.quantity, entryOrder, 
    //   cancelOrder, stopLossTicks, takeProfitTicks);

    const cancelOrderObj: any = {
      ticks: this.selectedATMStrategy.cancelOrder, 
      price: this.futuresValueService.tickPriceAdjust(this.orderTicket2.ticker, this.selectedATMStrategy.cancelOrder)
    };
    const stopLossObj: any[] = new Array<any>();
    const takeProfitObj: any[] = new Array<any>();

    this.selectedATMStrategy.stopLoss.forEach(sl => {
      const slObj = {
        ticks: this.futuresValueService.dollarsToTicks(this.orderTicket2.ticker, sl), 
        price: this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, sl)
      };

      stopLossObj.push(slObj);
    });
    
    this.selectedATMStrategy.takeProfit.forEach(tp => {
      const tpObj = {
        ticks: this.futuresValueService.dollarsToTicks(this.orderTicket2.ticker, tp), 
        price: this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, tp)
      };

      takeProfitObj.push(tpObj);
    });
    this.atmCalculation = atmCalculation;

    this.orderTicket2.SetMe(this.selectedATMStrategy.quantity, entryOrder, cancelOrderObj, stopLossObj, takeProfitObj);
  }

}
