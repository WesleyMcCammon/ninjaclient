import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { TradeTicket } from '../../model/tradeTicket';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  tradeTicketInitiated: Subject<TradeTicket> = new Subject<TradeTicket>();

  constructor() { }

  initiateTradeTicket(tradeTicket: TradeTicket){
    this.tradeTicketInitiated.next(tradeTicket);
  }
}
