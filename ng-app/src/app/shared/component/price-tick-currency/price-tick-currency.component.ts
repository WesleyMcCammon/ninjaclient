import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FuturesValueService } from 'src/app/reference/service/futures-value.service';

@Component({
  selector: 'app-price-tick-currency',
  templateUrl: './price-tick-currency.component.html',
  styleUrls: ['./price-tick-currency.component.css']
})
export class PriceTickCurrencyComponent implements OnInit {
  @Input() label: string = '';
  @Input() ticker: string = '';
  @Input() price: number = 0;
  @Input() step: number = 1;
  @Input() entry: number = 0;
  @Input() type: string;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();  
  showTicks: boolean = false;
  errorMessage: string = '';

  ticks: number = 0;

  constructor(public futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this.price = Math.round(this.price * 100) / 100;
    this.recalculate();
  }

  recalculate() {
    this.showTicks = this.ticker.length > 0;
    const ticks = (((this.price - this.entry) * (this.type === 'sell' ? -1 : 1)) * 100)/100;
    const ticksDiff = Math.round(this.futuresValueService.ticksPerPoint(this.ticker) * ticks);
    this.ticks = ticksDiff;
  }

  onKeyUp(event){
    this.recalculate();
    console.log('emit change');
    this.change.emit(this.price);
  }

  onKeyDown(event) {
    const isNumber: boolean = (event.keyCode >= 48 && event.keyCode <= 57) || 
      (event.keyCode >= 97 && event.keyCode <= 106);

    const decmialPosition = event.target.value.indexOf('.');
    const isDecimal: boolean = event.keyCode === 110;

    if(this.step === 1 && event.keyCode === 110) {
      event.preventDefault();
    }
    
    if(isNumber || isDecimal) {
      let selectedText: string = window.getSelection().toString();
      if(selectedText.length > 0) {   
        const newValue: string = event.target.value.replace(selectedText, '');
        this.price = (parseInt(newValue, 10) * 100)/100;
      }
      else {
        const digitsPastDecimal = decmialPosition && event.target.value.length - decmialPosition - 1;
        if(decmialPosition >= 0 && digitsPastDecimal == 2 && isNumber) {
          event.preventDefault();
        }
      }
    } 
  }
}
