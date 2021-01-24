import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FuturesValueService } from 'src/app/reference/service/futures-value.service';
import { fromEvent } from 'rxjs';
import { debounce } from "rxjs/operators";
import { interval, Subscription } from "rxjs";

@Component({
  selector: 'app-price-tick-currency',
  templateUrl: './price-tick-currency.component.html',
  styleUrls: ['./price-tick-currency.component.css']
})
export class PriceTickCurrencyComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() ticker: string = '';
  @Input() price: number = 0;
  @Input() step: number = 1;
  @Input() entry: number = 0;
  @Input() type: string;
  @Input() entryValueThreshold: string = '';
  @Input() controlId: string;
  @Output() priceTickCurrencyEventEmitter: EventEmitter<number> = new EventEmitter<number>();  
  showTicks: boolean = false;
  errorMessage: string = '';

  ticks: number = 0;
  priceTickCurrencyFormGroup: FormGroup = new FormGroup({
    inputValue: new FormControl()
  });

  valueChangeSubscription: Subscription
  @ViewChild('input', {static:true}) inputControl: ElementRef; 

  constructor(public futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
    this.price = Math.round(this.price * 100) / 100;
    this.priceTickCurrencyFormGroup.controls['inputValue'].setValue(this.price);    
    this.recalculate();

    this.valueChangeSubscription = this.priceTickCurrencyFormGroup.valueChanges
      .pipe(debounce(() => interval(750)))
      .subscribe((priceTickCurrencyForm) => {
        this.price = priceTickCurrencyForm.inputValue.length === 0 ? 0 : 
          (parseFloat(priceTickCurrencyForm.inputValue) * 100) / 100;           
        this.recalculate();
        if(!this.errorCheck()) { 
          this.priceTickCurrencyEventEmitter.emit(this.price);
        }
      });
  }
  
  ngOnDestroy() {
    if(this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }

  errorCheck(): boolean {
    const isBuy: boolean = this.type === 'buy';  
    if(this.entryValueThreshold === 'min') {
      this.errorMessage = this.price >= this.entry ? 'value cannot be above entry price' : '';
    }
    else if(this.entryValueThreshold === 'max') {
      this.errorMessage = this.price <= this.entry ? 'value cannot be below entry price' : '';
    }
    else {
      this.errorMessage = '';
    }

    if(this.entryValueThreshold.length > 0) {
      this.showTicks = this.errorMessage.length === 0;
    }

    return this.errorMessage.length > 0;
  }
  recalculate() {
    this.showTicks = this.ticker.length > 0;
    const ticks = (((this.price - this.entry) * (this.type === 'sell' ? -1 : 1)) * 100)/100;
    const ticksDiff = Math.round(this.futuresValueService.ticksPerPoint(this.ticker) * ticks);
    this.ticks = ticksDiff;
  }

  onKeyDown(event) {
    const isNumber: boolean = (event.keyCode >= 48 && event.keyCode <= 57) || 
      (event.keyCode >= 96 && event.keyCode <= 106);
    const isDecimal: boolean = event.keyCode === 110;
    const backSpace: boolean = event.keyCode === 8;

    if(!isNumber && !isDecimal && !backSpace) {
      event.preventDefault();
    }
    
    if(this.step === 1 && event.keyCode === 110) {
      event.preventDefault();
    }

    const selectionStart: number = this.inputControl.nativeElement.selectionStart
    const selectionEnd: number = this.inputControl.nativeElement.selectionEnd;
    const addedToEnd: boolean = selectionEnd === selectionStart && selectionStart === event.target.value.length;

    const decmialPosition = event.target.value.indexOf('.');
    const digitsPastDecimal = decmialPosition && event.target.value.length - decmialPosition - 1;
    if(addedToEnd && decmialPosition >= 0 && digitsPastDecimal == 2 && !backSpace) {
      event.preventDefault();
    }
  }
}
