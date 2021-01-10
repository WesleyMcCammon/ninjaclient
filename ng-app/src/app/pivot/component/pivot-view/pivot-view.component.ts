import { Component, OnInit } from '@angular/core';
import { Pivot } from '../../model/pivot';
import { OrderTicket } from '../../../order/model/orderTicket';
import { OrderService } from '../../../order/service/order.service';

@Component({
  selector: 'app-pivot-view',
  templateUrl: './pivot-view.component.html',
  styleUrls: ['./pivot-view.component.css']
})
export class PivotViewComponent implements OnInit {
  pivots: Pivot[] = new Array<Pivot>(); 

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.mockPivots();

    this.orderService.orderTicketInitiated.subscribe((orderTicket: OrderTicket) => {
      console.log('================================ orderTicketInitiated');
    });
  }

  mockPivots() {
    this.pivots.push(new Pivot('NQ', new Date(2020, 1, 8), 12959, 12646.5, 12928));
    this.pivots.push(new Pivot('ES', new Date(2020, 1, 8), 3824.5, 3775, 3822.25));
  }
}
