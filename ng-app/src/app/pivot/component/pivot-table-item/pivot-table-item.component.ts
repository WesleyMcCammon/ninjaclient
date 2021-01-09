import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PivotService } from '../../service/pivot.service';
import { TradeTicket } from '../../model/tradeTicket';

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

  constructor(private pivotService: PivotService) { }

  ngOnInit(): void {
  }

  issueTradeTicket(type: string) {
    this.pivotService.initiateTradeTicket({
      ticker: this.ticker, 
      name: this.pivotPointName, 
      strategy: this.pivotName, 
      trigger: this.pivotValue, 
      type: type
    });
  }
}
