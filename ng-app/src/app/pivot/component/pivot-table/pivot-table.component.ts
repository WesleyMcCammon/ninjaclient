import { Component, OnInit, Input } from '@angular/core';
import { Pivot, PivotLevel, PivotCalculation } from '../../model/pivot';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.css']
})
export class PivotTableComponent implements OnInit {
  @Input() pivotCalculation: PivotCalculation;
  @Input() liveMarketData: boolean = true;
  @Input() showHeader: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  hasValue(value: number): boolean {
    return value > 0;
  }


}
