import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order/service/order.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {
  orderTicketErrorGroup: any;
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    const id1: string = this.orderService.orderTickets[0].id;
    this.orderTicketErrorGroup = {existingOrderTicketId: id1, errorOrderTicket: this.orderService.orderTickets[1]};
  }
}
