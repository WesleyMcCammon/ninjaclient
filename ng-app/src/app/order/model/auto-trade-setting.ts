export class AutoTradeSetting {
    private _id: number;
    private _name: string;
    private _entry: number;
    private _quantity: number;
    private _stopLoss: number[];
    private _takeProfit: number[];
    private _cancelOrder: number;

    get id(): number { return this._id; }
    get name(): string { return this._name; }
    get entry(): number { return this._entry; }
    set entry(value: number) {this._entry = value;}

    get quantity(): number { return this._quantity; }
    set quantity(value: number) { this._quantity = value; }
    
    get stopLoss(): number[] { return this._stopLoss; }
    get takeProfit(): number[] { return this._takeProfit; }
    get cancelOrder(): number {return this._cancelOrder; }
    get missingStopLoss(): boolean { return this._stopLoss.length < this._quantity; }
    get missingStopLossCount(): number { return this._quantity - this._stopLoss.length; }
    get missingTakeProfit(): boolean { return this._takeProfit.length < this._quantity; }
    get missingTakeProfileCount(): number { return this._quantity - this._takeProfit.length; }
    
    constructor(id: number, name: string, quantity: number, entry: number, stopLoss: number[], takeProfit: number[], cancelOrder: number){
        this._id = id;
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
        }

        if(takeProfit.length > 0 && takeProfit.length !== quantity) {
            if(takeProfit.length > quantity) {
                this._takeProfit = takeProfit.slice(0, quantity);
            }
        }
    }
}