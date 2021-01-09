import { Injectable } from '@angular/core';
import { TradeTicket } from '../model/tradeTicket';
import { Subject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class PivotService {
  tradeTicketInitiated: Subject<TradeTicket> = new Subject<TradeTicket>();

  constructor() { }

  initiateTradeTicket(tradeTicket: TradeTicket){
    this.tradeTicketInitiated.next(tradeTicket);
  }
}
