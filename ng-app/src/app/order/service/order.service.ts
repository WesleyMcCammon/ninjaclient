import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { AutoTradeSetting } from '../model/auto-trade-setting';
import { OrderTicket } from '../model/orderTicket';

enum OrderTicketCreationStatus {
  NotFound,
  Found,
  ReverseOrderFound
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderTickets: OrderTicket[] = new Array<OrderTicket>();
  orderTicketInitiated: Subject<OrderTicket> = new Subject<OrderTicket>();

  constructor() { }

  initiateOrderTicket(ticker: string, technicalStrategy: string, name: string, trigger: number, type: string): string {
    let createdNewOrderTicket: string = '';
    
    const orderTicket: OrderTicket = new OrderTicket(ticker, technicalStrategy, name, trigger, type);
    const orderTicketCreationStatus: OrderTicketCreationStatus = this.findOrderTicket(orderTicket.id, type);
    if(orderTicketCreationStatus === OrderTicketCreationStatus.NotFound) {
      this.orderTickets.push(orderTicket);
      this.orderTicketInitiated.next(orderTicket);
      createdNewOrderTicket = 'created';
    }
    else {
      if(orderTicketCreationStatus === OrderTicketCreationStatus.Found) {
        createdNewOrderTicket = 'found duplicate';
      }
      else {
        createdNewOrderTicket = 'found reverse order';
      }
    }

    return createdNewOrderTicket;
  }

  cancelOrderTicket(id: string) {
    this.orderTickets = this.orderTickets.filter(o => o.id !== id);
  }

  findOrderTicket(id: string, type: string): OrderTicketCreationStatus {   
    let orderTicketCreationStatus: OrderTicketCreationStatus = OrderTicketCreationStatus.NotFound;

    if(this.orderTickets.filter(o => o.id === id).length > 0) {
      orderTicketCreationStatus = OrderTicketCreationStatus.Found;
    } 
    else {
      const reverseTicketId: string = id.replace(type === 'buy' ? 'buy' : 'sell', type === 'buy' ? 'sell' : 'buy');
      if(this.orderTickets.filter(o => o.id === reverseTicketId).length > 0) {
        orderTicketCreationStatus = OrderTicketCreationStatus.ReverseOrderFound;
      } 
    }

    return orderTicketCreationStatus;
  }
}
