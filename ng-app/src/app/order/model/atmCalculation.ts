export interface AutoTradeCalculation {
    entryPrice: number;
    cancelOrderPrice: number;
    stopLossPrice: number[];
    takeProfitPrice: number[];
}