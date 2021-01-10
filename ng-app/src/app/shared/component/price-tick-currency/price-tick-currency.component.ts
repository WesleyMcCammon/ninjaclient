import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuturesValueService } from 'src/app/reference/service/futures-value.service';

@Component({
  selector: 'app-price-tick-currency',
  templateUrl: './price-tick-currency.component.html',
  styleUrls: ['./price-tick-currency.component.css']
})
export class PriceTickCurrencyComponent implements OnInit {
  @Input() label: string;
  @Input() ticker: string;
  @Input() price: number;
  @Input() ticks: number;
  @Output() change: EventEmitter<number> = new EventEmitter();  

  private _diff: number = 0;

  constructor(public futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this._diff = this.ticks;
    console.log('================ ' + this.ticks + ' ' + this.price);
  }

  onInputChange() {
    console.log('================ ' + this.ticks + ' ' + this.price);
  }
}
