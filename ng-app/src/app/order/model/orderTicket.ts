export interface OrderTicket {
    ticker: string;
    technicalStrategy: string;  
    name: string;   
    trigger: number;
    type: string;   
    atmStrategy?: string;
}