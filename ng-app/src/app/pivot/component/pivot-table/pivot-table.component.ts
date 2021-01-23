import { Component, OnInit, Input } from '@angular/core';
import { PivotCalculation } from '../../model/pivot';
import { Pivot } from '../../model/pivot';
import { PivotService } from '../../service/pivot.service';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.css']
})
export class PivotTableComponent implements OnInit {
  @Input() pivots: Pivot[];
  @Input() pivotCalculation: PivotCalculation;
  @Input() liveMarketData: boolean = true;
  
  constructor(private pivotService: PivotService) { }

  ngOnInit(): void {
    this.pivotService.getPivotTickers().subscribe((pivots: Pivot[]) => {
      this.pivots = pivots;
    });
  }

  hasValue(value: number): boolean {
    return value > 0;
  }
}
