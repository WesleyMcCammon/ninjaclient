import { OrderTicketPrice } from './orderTicketPrice';
import { OrderStatus } from './order-status';

export class OrderTicket {
    private _id: string;
    private _status: OrderStatus; // staged, submitted, executed, cancelled
    private _ticker: string;
    private _technicalStrategy: string;
    private _name: string;
    private _type: string;
    private _quantity: number = 0;
    private _orderTicketPrice: OrderTicketPrice; 
    private _trigger: number;
    private _entry: number = 0;
    private _stopLossTicks: number[] = [];
    private _takeProfitTicks: number[] = [];

    get id(): string { return this._id; }
    get ticker(): string { return this._ticker; }    
    get type(): string { return this._type; }
    get quantity(): number { return this._quantity; }
    get name(): string { return this._name; }
    get technicalStrategy(): string { return this._technicalStrategy; }

    set quantity(value: number) { this._quantity = value; }
    get trigger(): number { return this._trigger; }
    set trigger(value: number) { this._trigger = value; }    
    get entry(): number { return this._entry; }
    set entry(value: number) { 
        this._entry = value; 
        this.calculateTakeProfit(); 
        this.calculateStopLoss();
    }
    
    set stopLoss(value: number[]) { this._orderTicketPrice.stopLoss = value ;}
    set takeProfit(value: number[]) { this._orderTicketPrice.takeProfit = value; }

    get orderTicketPrice(): OrderTicketPrice { return this._orderTicketPrice; }

    get missingStopLossCount(): number { return this._quantity - this._orderTicketPrice.stopLoss.length; }
    get missingTakeProfitCount(): number { return this._quantity - this._orderTicketPrice.takeProfit.length; }

    get status(): OrderStatus { return this._status; }
    set status(value: OrderStatus) { this._status = value; }
    
    constructor(ticker: string, technicalStrategy: string, name: string, trigger: number, type: string) {
        this._id = ticker + new Date().getTime().toString();
        this._id = `${ticker.toLowerCase() + '-' + technicalStrategy.toLowerCase() + '-' + name.toLowerCase() + '-' + type.toLowerCase()}`;
        this._status = OrderStatus.Stage;
        this._trigger = trigger;
        this._orderTicketPrice = {
            cancelOrder: 0, stopLoss: [], takeProfit: []
        };

        this._ticker = ticker;
        this._technicalStrategy = technicalStrategy;
        this._name = name;
        this._type = type;
    }

    public updateOrderTicket(quantity: number, entry: number, cancelOrder: number, stopLoss: number[], takeProfit: number[]) {
        const isBuy: boolean = this._type === 'buy';        
        this._quantity = quantity;
        this._entry = isBuy ? this._trigger + entry : this._trigger - entry;  
        this._stopLossTicks = stopLoss;
        this._takeProfitTicks = takeProfit;

        this._orderTicketPrice.cancelOrder = isBuy ? this._entry - cancelOrder : this._entry  + cancelOrder; 
        this.calculateStopLoss();
        this.calculateTakeProfit();

    }

    public calculateStopLoss() {        
        const isBuy: boolean = this._type === 'buy';        
        const stopLossPrice: number[] = [];
        this._stopLossTicks.forEach(sl => {
            stopLossPrice.push(isBuy ? this._entry - sl : this._entry  + sl)
        });
        this._orderTicketPrice.stopLoss = stopLossPrice;
    }

    public calculateTakeProfit() {   
        const isBuy: boolean = this._type === 'buy';  

        const takeProfitPrice: number[] = [];
        this._takeProfitTicks.forEach(tp => {
            takeProfitPrice.push(isBuy ? this._entry + tp : this._entry - tp)
        }); 
        this._orderTicketPrice.takeProfit = takeProfitPrice;

    }
    private setStopLossByIndex(index: number, value: number) {
        if(this._orderTicketPrice.stopLoss.length < index) {
            this._orderTicketPrice.stopLoss[index] = value;
        }
    }

    private setTakeProfitByIndex(index: number, value: number) {
        if(this._orderTicketPrice.takeProfit.length < index) {
            this._orderTicketPrice.takeProfit[index] = value;
        }
    }

    private getStopLoss(index: number) {
        return this._orderTicketPrice.stopLoss[index];
    }
}