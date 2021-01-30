import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderService } from '../../../order/service/order.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-pivot-table-item',
  templateUrl: './pivot-table-item.component.html',
  styleUrls: ['./pivot-table-item.component.css']
})
export class PivotTableItemComponent implements OnInit {
  @Input() pivotName: string = '';
  @Input() pivotPointName: string = '';
  @Input() pivotValue: number = 0;
  @Input() ticker: string = '';
  @Input() liveMarketData: boolean = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.pivotValue = parseInt(Math.round(this.pivotValue * 100).toString()) / 100;
  }

  issueOrderTicket(type: string) {
    this.orderService.initiateOrderTicket(this.ticker, this.pivotName, this.pivotPointName, this.pivotValue, type);
  }
}
