import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { FuturesValueService } from 'src/app/reference/service/futures-value.service';
import { AutoTradeSetting } from '../model/auto-trade-setting';
import { OrderTicket } from '../model/orderTicket';
import { ATMCalculation } from '../model/atmCalculation';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderTickets: OrderTicket[] = new Array<OrderTicket>();
  orderTicketInitiated: Subject<OrderTicket> = new Subject<OrderTicket>();

  constructor(private futuresValueService: FuturesValueService) { }

  initiateOrderTicket(orderTicket: OrderTicket){
    this.orderTickets.push(orderTicket);
    this.orderTicketInitiated.next(orderTicket);
  }

  cancelOrderTicket(id: string) {
    this.orderTickets = this.orderTickets.filter(o => o.id !== id);
  }
  
  calculatePrices(ticker: string, trigger: number, type: string, autoTradeSetting: AutoTradeSetting): ATMCalculation {
    const stopLossPrice: number[] = [];
    const takeProfitPrice: number[] = [];
    
    // calculate cancel order price
    const cancelOrderPrice = type === 'buy' ? trigger - autoTradeSetting.cancelOrder : trigger + autoTradeSetting.cancelOrder;
    
    // calculate entry price
    const entryPrice = type === 'buy' ? trigger + autoTradeSetting.entry : trigger - autoTradeSetting.entry;

    for(var index = 0; index <  autoTradeSetting.quantity; index++) {

      // calculate stop loss price
      stopLossPrice[index] = type === 'buy' ? entryPrice - autoTradeSetting.stopLoss[index] : entryPrice + autoTradeSetting.stopLoss[index];

      // calculate take profit price
      takeProfitPrice[index] = type === 'buy' ? entryPrice + autoTradeSetting.takeProfit[index] : entryPrice - autoTradeSetting.takeProfit[index];
    }

    const atmCalculation: ATMCalculation = {
      entryPrice: entryPrice,
      cancelOrderPrice: cancelOrderPrice, 
      stopLossPrice: stopLossPrice, 
      takeProfitPrice: takeProfitPrice
    };

    return atmCalculation;
  }
}
