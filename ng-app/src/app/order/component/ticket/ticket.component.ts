import { Component, OnInit, Input } from '@angular/core';
import { ATMStrategy } from '../../model/atmStrategy';
import { OrderTicket } from '../../model/orderTicket';
import { AtmStrategyService } from '../../service/atm-strategy.service';
import { OrderService } from '../../service/order.service';
import { SettingsService } from '../../../configuration/service/settings.service';
import { ATMCalculation } from '../../model/atmCalculation';
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
  atmCalculation: ATMCalculation

  constructor(private atmStrategyService: AtmStrategyService, 
    private orderService: OrderService, 
    private settingsService: SettingsService,
    private futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this.atmStrategyService.getStrategies().subscribe((atmStragegyList: ATMStrategy[]) => {
      this.atmStragegyList = atmStragegyList;
    });

    this.orderService.orderTicketInitiated.subscribe((orderTicket: OrderTicket) => {
      this.orderTicket = orderTicket;
      this.getATMCalculation();
    });

    const defaultATMStrategy = this.settingsService.defaultATMStrategy();
    if(defaultATMStrategy.length > 0) {
      this.selectedATMStrategy = this.atmStragegyList.find(a => a.name === defaultATMStrategy);
    }
  }

  private getATMCalculation() {
    const atmCalculation = this.orderService.calculatePrices(this.orderTicket.ticker, 
      this.orderTicket.trigger, this.orderTicket.type, this.selectedATMStrategy);
    atmCalculation.stopLossPrice = atmCalculation.stopLossPrice.filter(s => !isNaN(s));
    atmCalculation.takeProfitPrice = atmCalculation.takeProfitPrice.filter(s => !isNaN(s));

    this.atmCalculation = atmCalculation;
  }

  stopLossTicks(index){
    return this.selectedATMStrategy.stopLoss[index];
  }
}