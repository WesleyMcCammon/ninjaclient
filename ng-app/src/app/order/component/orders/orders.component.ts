import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../../order/service/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @Input() showOpened: boolean = true;
  @Input() displayStyle: string = 'summary'

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
  }

  getPanelHeaderClass(status: string) {
    return 'panel-header-' + status.toLowerCase();
  }
}
