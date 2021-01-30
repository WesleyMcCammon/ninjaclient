import { Component, OnInit, Input } from '@angular/core';
import { OrderTicket } from '../../model/orderTicket';

@Component({
  selector: 'app-ticket-header',
  templateUrl: './ticket-header.component.html',
  styleUrls: ['./ticket-header.component.css']
})
export class TicketHeaderComponent implements OnInit {
  @Input() orderTicket: OrderTicket;
  @Input() showOpened: boolean = false;
  headerText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.headerText = `${this.orderTicket.ticker} ${this.orderTicket.type} STOP|LIMIT trigger ${this.orderTicket.trigger}`;
  }

  getPanelHeaderClass(status: string) {
    //return 'panel-header-' + status.toLowerCase();
    return 'panel-header';
  }

}
