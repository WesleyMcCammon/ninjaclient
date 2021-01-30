import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';  
import { OrderTicket } from '../model/orderTicket';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/component/modal-dialog/modal-dialog.component';
import { SettingsService } from 'src/app/configuration/service/settings.service';

enum OrderTicketCreationStatus {
  NotFound,
  Found,
  ReverseOrderFound
};

interface OrderTicketSearchResult {
  existingOrderTicket?: OrderTicket,
  newOrderTicket?: OrderTicket,
  orderTicketCreationStatus: OrderTicketCreationStatus
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderTickets: OrderTicket[] = new Array<OrderTicket>();
  orderTicketInitiated: Subject<OrderTicket> = new Subject<OrderTicket>();

  constructor(private settingsService: SettingsService, public matDialog: MatDialog) { }

  initiateOrderTicket(ticker: string, technicalStrategy: string, name: string, trigger: number, type: string): void {
    
    const orderTicket: OrderTicket = new OrderTicket(ticker, technicalStrategy, name, trigger, type);
    const orderTicketSearchResult: OrderTicketSearchResult = this.findOrderTicket(orderTicket.id, type);

    if(orderTicketSearchResult.orderTicketCreationStatus === OrderTicketCreationStatus.NotFound) {
      this.orderTickets.push(orderTicket);
      this.orderTicketInitiated.next(orderTicket);
    }
    else {
      if(orderTicketSearchResult.orderTicketCreationStatus === OrderTicketCreationStatus.ReverseOrderFound) {
        orderTicketSearchResult.newOrderTicket = orderTicket;
      }
      this.showOrderTicketError(orderTicketSearchResult);
    }
  }

  cancelOrderTicket(id: string) {
    this.orderTickets = this.orderTickets.filter(o => o.id !== id);
  }
  

  findOrderTicket(id: string, type: string): OrderTicketSearchResult {   
    const orderTicketSearchResult: OrderTicketSearchResult = {
      orderTicketCreationStatus: OrderTicketCreationStatus.NotFound        
    }
    
    const existingOrderTicket = this.orderTickets.find(o => o.id === id);
    if(existingOrderTicket) {
      orderTicketSearchResult.orderTicketCreationStatus = OrderTicketCreationStatus.Found;
      orderTicketSearchResult.existingOrderTicket = existingOrderTicket;
      orderTicketSearchResult.newOrderTicket = existingOrderTicket;
    }
    else {
      const reverseTicketId: string = id.replace(type === 'buy' ? 'buy' : 'sell', type === 'buy' ? 'sell' : 'buy');
      const reverseOrderTicket = this.orderTickets.find(o => o.id === reverseTicketId);
      if(reverseOrderTicket) {
        orderTicketSearchResult.orderTicketCreationStatus = OrderTicketCreationStatus.ReverseOrderFound;
        orderTicketSearchResult.existingOrderTicket = reverseOrderTicket;        
      }
    }
    
    return orderTicketSearchResult;
  }

  showOrderTicketError(orderTicketSearchResult: OrderTicketSearchResult) {

    const status: string = OrderTicketCreationStatus[orderTicketSearchResult.orderTicketCreationStatus].toLowerCase();
    const parameters: string[] = orderTicketSearchResult.orderTicketCreationStatus === OrderTicketCreationStatus.Found ? [] : 
      [orderTicketSearchResult.existingOrderTicket.type === 'buy' ? 'buy' : 'sell'];
    const errorMessage: string = this.settingsService.getErrorMessage('order-ticket-create', status, parameters);
    
    const dialogConfig = new MatDialogConfig();
    const buttons: any[] = [];
    if(orderTicketSearchResult.orderTicketCreationStatus === OrderTicketCreationStatus.ReverseOrderFound) {
      buttons.push({name: 'Replace', title: 'Replace Existing Order with New Order', 
      clickEvent: () => {  
          this.cancelOrderTicket(orderTicketSearchResult.existingOrderTicket.id);
          this.orderTickets.push(orderTicketSearchResult.newOrderTicket);
        }
      });
    }
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      name: "logout",
      modalType: 'orderTicketError',
      orderTicketErrorGroup: {
        existingOrderTicket: orderTicketSearchResult.existingOrderTicket,
        errorOrderTicket: orderTicketSearchResult.newOrderTicket,
        errorMessage: errorMessage,
        buttons: buttons
      }
    }
    
    const modalDialog = this.matDialog.open(ModalDialogComponent, dialogConfig);
  }
}