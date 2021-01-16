import { Component, OnInit, Input } from '@angular/core';
import { ATMStrategy } from '../../model/atmStrategy';
import { OrderTicket } from '../../model/orderTicket';
import { AtmStrategyService } from '../../service/atm-strategy.service';
import { OrderService } from '../../service/order.service';
import { SettingsService } from '../../../configuration/service/settings.service';
import { FuturesValueService } from '../../../reference/service/futures-value.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  atmStragegyList: ATMStrategy[] = new Array<ATMStrategy>();
  selectedATMStrategy: ATMStrategy;
  orderTicket: OrderTicket;

  constructor(private atmStrategyService: AtmStrategyService, 
    private orderService: OrderService, 
    private settingsService: SettingsService,
    private futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this.atmStrategyService.getStrategies().subscribe((atmStragegyList: ATMStrategy[]) => {
      this.atmStragegyList = atmStragegyList;
    });

    this.orderService.orderTicketInitiated.subscribe((orderTicket: OrderTicket) => {
      this.orderTicket = new OrderTicket(orderTicket.ticker, orderTicket.technicalStrategy, orderTicket.name, orderTicket.trigger, orderTicket.type);  
      const defaultATMStrategyId = this.settingsService.getDefaultATM();
      this.selectedATMStrategy = this.atmStragegyList.find(a => a.id === defaultATMStrategyId);
      this.getATMCalculation();
    });
  }

  private getATMCalculation() {
    
    const cancelOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket.ticker, this.selectedATMStrategy.cancelOrder);
    const entryOrder: number = this.futuresValueService.tickPriceAdjust(this.orderTicket.ticker, this.selectedATMStrategy.entry);

    const stopLossPrice: number[] = new Array<number>();
    const takeProfitPrice: number[] = new Array<number>();

    this.selectedATMStrategy.stopLoss.forEach(sl => {
      stopLossPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket.ticker, sl));
    });
    
    this.selectedATMStrategy.takeProfit.forEach(tp => {
      takeProfitPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket.ticker, tp));
    });
    
    this.orderTicket.setATM(
      this.selectedATMStrategy.quantity, 
      entryOrder, 
      cancelOrder, 
      stopLossPrice, 
      takeProfitPrice);
  }



  stopLossTicks(index){
    return this.selectedATMStrategy.stopLoss[index];
  }

  onQuantityChange(event) {
    if(!isNaN(event)) {
      this.selectedATMStrategy.quantity = event;
    }
  }

  resetTicket() {
    console.log('reset ticket');
  }

  submitTicket() {
    console.log('submit ticket');
  }
}

