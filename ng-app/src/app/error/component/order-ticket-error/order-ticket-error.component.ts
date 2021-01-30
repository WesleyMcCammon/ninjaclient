import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderTicket } from 'src/app/order/model/orderTicket';
import { OrderService } from 'src/app/order/service/order.service';

@Component({
  selector: 'app-order-ticket-error',
  templateUrl: './order-ticket-error.component.html',
  styleUrls: ['./order-ticket-error.component.css']
})
export class OrderTicketErrorComponent implements OnInit {
  // private _orderTicketErrorGroup: any;
  // get orderTicketErrorGroup() { return this._orderTicketErrorGroup; }
  // @Input() set orderTicketErrorGroup(value: any) {
  //   this._orderTicketErrorGroup = value;
  // }

  @Input() orderTicketErrorGroup: any;
  @Input() errorDescription: string = 'Order Ticket Error';
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onClick(clickEvent: any) {  
    clickEvent.clickEvent();
    this.closeDialog.emit(true);
  }
}
