export interface TradeTicket {
    ticker: string;
    strategy: string;   // pivot, etc
    name: string;   // pivot=[floor, cam, woodie]
    trigger: number;
    type: string;   // buy, sell, reverse, cancel
}