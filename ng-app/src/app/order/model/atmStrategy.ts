export class ATMStrategy {
    private _name: string;
    private _entry: number;
    private _quantity: number;
    private _stopLoss: number[];
    private _takeProfit: number[];
    private _cancelOrder: number;

    get name(): string { return this._name; }
    get entry(): number { return this._entry; }
    get quantity(): number { return this._quantity; }
    get stopLoss(): number[] { return this._stopLoss; }
    get takeProfit(): number[] { return this._takeProfit; }
    get cancelOrder(): number {return this._cancelOrder; }
    
    constructor(name: string, quantity: number, entry: number, stopLoss: number[], takeProfit: number[], cancelOrder: number){
        this._name = name;
        this._quantity = quantity;
        this._stopLoss = stopLoss;
        this._takeProfit = takeProfit;
        this._cancelOrder = cancelOrder;
        this._entry = entry;
        
        if(stopLoss.length > 0 && stopLoss.length !== quantity) {
            if(stopLoss.length > quantity) {
                this._stopLoss = stopLoss.slice(0, quantity);
            }
            else {
                const lastValue = this._stopLoss[this._stopLoss.length-1];
                while(this._stopLoss.length !== quantity) {
                    this._stopLoss.push(lastValue);
                }
            }
        }

        if(takeProfit.length > 0 && takeProfit.length !== quantity) {
            if(takeProfit.length > quantity) {
                this._takeProfit = takeProfit.slice(0, quantity);
            }
            else {
                const lastValue = this._takeProfit[this._takeProfit.length-1];
                while(this._takeProfit.length !== quantity) {
                    this._takeProfit.push(lastValue);
                }
            }
        }
    }
}