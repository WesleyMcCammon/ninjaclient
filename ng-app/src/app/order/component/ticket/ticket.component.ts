import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../../../order/service/order.service';
import { OrderTicket } from '../../model/orderTicket';
import { AutoTradeSettingsService } from '../../service/auto-trade-settings.service';
import { AutoTradeSetting } from '../../../order/model/auto-trade-setting';
import { SettingsService } from '../../../configuration/service/settings.service';
import { FuturesValueService } from '../../../reference/service/futures-value.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  private _orderTicket: OrderTicket;
  get orderTicket() { return this._orderTicket; }
  @Input() set orderTicket(value: OrderTicket) {
    this._orderTicket = value;
    this.orderTicketLoaded();
  }
  selectedAutoTradeSetting: AutoTradeSetting;

  constructor(private autoTradeSettingsService: AutoTradeSettingsService, 
    private orderService: OrderService,
    private settingsService: SettingsService,
    private futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
  }

  private orderTicketLoaded() { 
    const defaultAutoTradingId = this.settingsService.getDefaultAutoTradingId();
    this.selectedAutoTradeSetting = this.autoTradeSettingsService
      .autoTradingSettings.find(a => a.id === defaultAutoTradingId);
    this.autoTradeCalculations();
  }
  
  private autoTradeCalculations() {
    const cancelOrder: number = this.futuresValueService
      .tickPriceAdjust(this.orderTicket.ticker, this.selectedAutoTradeSetting.cancelOrder);
    const entryOrderPrice: number = this.futuresValueService
      .tickPriceAdjust(this.orderTicket.ticker, this.selectedAutoTradeSetting.entry);
    
    this.orderTicket.updateOrderTicket(
      this.selectedAutoTradeSetting.quantity, entryOrderPrice, cancelOrder, this.calculateStopLoss(), this.calculateTakeProfit());
  }

  calculateStopLoss(): number[]{
    const stopLossPrice: number[] = new Array<number>();

    this.selectedAutoTradeSetting.stopLoss.forEach(sl => {
      stopLossPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket.ticker, sl));
    });

    return stopLossPrice;
  }

  calculateTakeProfit(): number[] {
    const takeProfitPrice: number[] = new Array<number>();
    
    this.selectedAutoTradeSetting.takeProfit.forEach(tp => {
      takeProfitPrice.push(this.futuresValueService.dollarsPriceAdjust(this.orderTicket.ticker, tp));
    });

    return takeProfitPrice;
  }

  stopLossTicks(index){
    return this.selectedAutoTradeSetting.stopLoss[index];
  }

  // entry is originally set in ticks, this event changes the price
  onEntryChange(event) {
    if(!isNaN(event)) {
      this.orderTicket.entry = (parseFloat(event)*100)/100;
    }
  }

  onQuantityChange(event) {
    if(!isNaN(event)) {
      this.selectedAutoTradeSetting.quantity = event;
    }
  }

  cancelTicket() {
    this.orderService.cancelOrderTicket(this.orderTicket.id);
  }

  resetTicket() {
    console.log('reset ticket');
  }

  submitTicket() {
    console.log('submit ticket');
  }
}

