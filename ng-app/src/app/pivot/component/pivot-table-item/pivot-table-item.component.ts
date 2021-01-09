import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pivot-table-item',
  templateUrl: './pivot-table-item.component.html',
  styleUrls: ['./pivot-table-item.component.css']
})
export class PivotTableItemComponent implements OnInit {
  @Input() pivotValue: number = 0;
  @Input() liveMarketData: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
