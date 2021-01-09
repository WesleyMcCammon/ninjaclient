import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

export interface PivotLevel {
    r3: number;
    r2: number;
    r1: number;
    pivot: number;
    s1: number;
    s2: number;
    s3: number;
}

export interface PivotCalculation {
    name: string;
    ticker: string;
    date: Date;
    pivotLevel: PivotLevel;
}

export class Pivot {
    private _ticker: string;
    private _date: Date;
    private _high: number;
    private _low: number;
    private _close: number;


    public get ticker() { return this._ticker; }
    public get date() { return this._date; }

    private _pivotCalculations: PivotCalculation[] = new Array<PivotCalculation>();

    constructor(ticker: string, date: Date, high: number, low: number, close: number) {        
        this._ticker = ticker;
        this._date = date;
        this._high = high;
        this._low = low;
        this._close = close;

        this.calculatePivots();
    }

    public getPivotCalculations(): PivotCalculation[] {
        return this._pivotCalculations;
    }

    public getPivotCalculation(name: string): PivotCalculation {
        return this._pivotCalculations.find(p => p.name === name);
    }

    private calculatePivots() {
        this.floor();
        this.woodie();
        this.camarilla();
    }

    private addPivot(name: string, pivotLevels: PivotLevel) {
        return this._pivotCalculations.push({ticker: this.ticker, date: this.date, name: name, pivotLevel: pivotLevels});
    }

    private camarilla() {
        const pivot = (this._high + this._low + this._close) / 3;
        this.addPivot('camarilla', {
            r3: this._close + ((this._high - this._low) * 1.25),
            r2: this._close + ((this._high - this._low) * 1.1666),
            r1: this._close + ((this._high - this._low) * 1.0833),
            pivot: pivot,
            s1: this._close - ((this._high - this._low) * 1.0833),
            s2: this._close - ((this._high - this._low) * 1.1666),
            s3: this._close - ((this._high - this._low) * 1.25)
        });
    }

    private woodie() {
        const pivot = (this._high + this._low + (2 * (this._close)))/4;
        this.addPivot('woodie', {
            r3: 0,
            r2: pivot + this._high - this._low,
            r1: (2 * pivot) - this._low,
            pivot: pivot,
            s1: (2 * pivot) - this._high,
            s2: pivot - this._high + this._low,
            s3: 0
        });
    }

    private floor() {
        const pivot = (this._high + this._low + this._close) / 3;
        this.addPivot('floor', {
            r3: this._high + (2 * (pivot - this._low)),
            r2: pivot + this._high - this._low,
            r1: (2 * pivot) - this._low,
            pivot: pivot,
            s1: (2 * pivot) - this._high,
            s2: pivot - this._high + this._low,
            s3: this._low - (2 * (this._high - pivot))
        });
    }
}

