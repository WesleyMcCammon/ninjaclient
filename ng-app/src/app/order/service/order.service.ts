import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { FuturesValueService } from 'src/app/reference/service/futures-value.service';
import { ATMStrategy } from '../model/atmStrategy';
import { OrderTicket } from '../model/orderTicket';
import { ATMCalculation } from '../model/atmCalculation';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderTicketInitiated: Subject<OrderTicket> = new Subject<OrderTicket>();

  constructor(private futuresValueService: FuturesValueService) { }

  initiateOrderTicket(orderTicket: OrderTicket){
    this.orderTicketInitiated.next(orderTicket);
  }

  calculatePrices(ticker: string, trigger: number, type: string, atmStrategy: ATMStrategy): ATMCalculation {
    const stopLossPrice: number[] = [];
    const takeProfitPrice: number[] = [];
    
    // calculate cancel order price
    const cancelOrderPrice = type === 'buy' ? trigger - atmStrategy.cancelOrder : trigger + atmStrategy.cancelOrder;
    
    // calculate entry price
    const entryPrice = type === 'buy' ? trigger + atmStrategy.entry : trigger - atmStrategy.entry;

    for(var index = 0; index <  atmStrategy.quantity; index++) {

      // calculate stop loss price
      stopLossPrice[index] = type === 'buy' ? entryPrice - atmStrategy.stopLoss[index] : entryPrice + atmStrategy.stopLoss[index];

      // calculate take profit price
      takeProfitPrice[index] = type === 'buy' ? entryPrice + atmStrategy.takeProfit[index] : entryPrice - atmStrategy.takeProfit[index];
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
