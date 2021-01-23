import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { AutoTradeSetting } from '../model/auto-trade-setting';
import { OrderTicket } from '../model/orderTicket';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderTickets: OrderTicket[] = new Array<OrderTicket>();
  orderTicketInitiated: Subject<OrderTicket> = new Subject<OrderTicket>();

  constructor() { }

  initiateOrderTicket(orderTicket: OrderTicket){
    this.orderTickets.push(orderTicket);
    this.orderTicketInitiated.next(orderTicket);
  }

  cancelOrderTicket(id: string) {
    this.orderTickets = this.orderTickets.filter(o => o.id !== id);
  }
}
