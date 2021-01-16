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
    this.atmCalculation = atmCalculation;
    
    const cancelOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket2.ticker, this.selectedATMStrategy.cancelOrder);
    const entryOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket2.ticker, this.selectedATMStrategy.entry);

    const stopLossPrice: number[] = new Array<number>();
    const takeProfitPrice: number[] = new Array<number>();

    this.selectedATMStrategy.stopLoss.forEach(sl => {
      stopLossPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, sl));
    });
    
    this.selectedATMStrategy.takeProfit.forEach(tp => {
      takeProfitPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket2.ticker, tp));
    });
    
    this.orderTicket2.setATM(
      this.selectedATMStrategy.quantity, 
      entryOrder, 
      cancelOrder, 
      stopLossPrice, 
      takeProfitPrice);
  }

}
