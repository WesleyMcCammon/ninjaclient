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
    const cancelOrderOffset = this.futuresValueService.dollarsToTicks(ticker, atmStrategy.cancelOrder);
    const cancelOrderPrice = type === 'buy' ? trigger + cancelOrderOffset : trigger - cancelOrderOffset;
    
    // calculate entry price
    const entryPriceOffset = this.futuresValueService.dollarsToTicks(ticker, atmStrategy.entry);    
    const entryPrice = type === 'buy' ? trigger + entryPriceOffset : trigger - entryPriceOffset;

    for(var index = 0; index <  atmStrategy.quantity; index++) {

      // calculate stop loss price
      const stopLossPriceOffset = this.futuresValueService.dollarsToTicks(ticker, atmStrategy.stopLoss[index]);
      stopLossPrice[index] = type === 'buy' ? trigger + stopLossPriceOffset : trigger - stopLossPriceOffset;

      // calculate take profit price
      const takeProfitPriceOffset = this.futuresValueService.dollarsToTicks(ticker, atmStrategy.takeProfit[index]);
      takeProfitPrice[index] = type === 'buy' ? trigger + takeProfitPriceOffset : trigger - takeProfitPriceOffset;
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
