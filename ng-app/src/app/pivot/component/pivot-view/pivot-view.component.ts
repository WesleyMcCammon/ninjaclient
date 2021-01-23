import { Component, OnInit } from '@angular/core';
import { OrderTicket } from '../../../order/model/orderTicket';
import { OrderService } from '../../../order/service/order.service';

@Component({
  selector: 'app-pivot-view',
  templateUrl: './pivot-view.component.html',
  styleUrls: ['./pivot-view.component.css']
})
export class PivotViewComponent implements OnInit {
  //orderTickets: OrderTicket[] = new Array<OrderTicket>();

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    // this.orderService.orderTicketInitiated.subscribe((orderTicket: OrderTicket) => {
    //   this.orderTickets.push(orderTicket);
    // });
  }
}
