import { OrderTicketPrice } from './orderTicketPrice';

export class OrderTicket {
    private _ticker: string;
    private _technicalStrategy: string;
    private _name: string;
    private _type: string;
    private _quantity: number = 0;
    private _orderTicketPrice: OrderTicketPrice; 
    private _trigger: number;
    private _entry: number = 0;

    get ticker(): string { return this._ticker; }    
    get type(): string { return this._type; }
    get quantity(): number { return this._quantity; }
    get name(): string { return this._name; }
    get technicalStrategy(): string { return this._technicalStrategy; }

    set quantity(value: number) { this._quantity = value; }
    get trigger(): number { return this._trigger; }
    set trigger(value: number) { this._trigger = value; }    
    get entry(): number { return this._entry; }
    set entry(value: number) { this._entry = value; }
    
    set stopLoss(value: number[]) { this._orderTicketPrice.stopLoss = value ;}
    set takeProfile(value: number[]) { this._orderTicketPrice.takeProfit = value; }

    get orderTicketPrice(): OrderTicketPrice { return this._orderTicketPrice; }

    get missingStopLossCount(): number { return this._quantity - this._orderTicketPrice.stopLoss.length; }
    get missingTakeProfitCount(): number { return this._quantity - this._orderTicketPrice.takeProfit.length; }

    constructor(ticker: string, technicalStrategy: string, name: string, trigger: number, type: string) {
        this._trigger = trigger;
        this._orderTicketPrice = {
            cancelOrder: 0, stopLoss: [], takeProfit: []
        };

        this._ticker = ticker;
        this._technicalStrategy = technicalStrategy;
        this._name = name;
        this._type = type;
    }

    public setATM(quantity: number, entry: number, cancelOrder: number, stopLoss: any[], takeProfit: any[]) {
        const isBuy: boolean = this._type === 'buy';        
        this._quantity = quantity;
        this._entry = isBuy ? this._trigger + entry : this._trigger - entry;  
        
        const stopLossPrice: number[] = [];
        stopLoss.forEach(sl => {
            stopLossPrice.push(isBuy ? this._entry - sl : this._entry  + sl)
        });

        const takeProfitPrice: number[] = [];
        takeProfit.forEach(tp => {
            takeProfitPrice.push(isBuy ? this._entry + tp : this._entry - tp)
        }); 

        this._orderTicketPrice.cancelOrder = isBuy ? this._entry - cancelOrder : this._entry  + cancelOrder; 
        this._orderTicketPrice.stopLoss = stopLossPrice;
        this._orderTicketPrice.takeProfit = takeProfitPrice;

    }

    public setStopLossByIndex(index: number, value: number) {
        if(this._orderTicketPrice.stopLoss.length < index) {
            this._orderTicketPrice.stopLoss[index] = value;
        }
    }

    public setTakeProfitByIndex(index: number, value: number) {
        if(this._orderTicketPrice.takeProfit.length < index) {
            this._orderTicketPrice.takeProfit[index] = value;
        }
    }

    public getStopLoss(index: number) {
        return this._orderTicketPrice.stopLoss[index];
    }
}