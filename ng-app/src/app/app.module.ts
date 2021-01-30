import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MaterialDesignModule } from './material-design/material-design.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './component/home/home.component';
import { PivotEditComponent } from './pivot/component/pivot-edit/pivot-edit.component';
import { PivotViewComponent } from './pivot/component/pivot-view/pivot-view.component';
import { PivotTableComponent } from './pivot/component/pivot-table/pivot-table.component';
import { FormatNumberNoCommaPipe } from './pipe/format-number-no-comma.pipe';
import { PivotTableItemComponent } from './pivot/component/pivot-table-item/pivot-table-item.component';
import { TicketComponent } from './order/component/ticket/ticket.component';
import { PriceTickCurrencyComponent } from './shared/component/price-tick-currency/price-tick-currency.component';
import { TestPageComponent } from './component/test-page/test-page.component';
import { NavMenuComponent } from './component/nav-menu/nav-menu.component';

import { SettingsService } from './configuration/service/settings.service';
import { AutoTradeSettingsService } from './order/service/auto-trade-settings.service';

import { NgxMasonryModule } from 'ngx-masonry';
import { OrdersComponent } from './order/component/orders/orders.component';
import { ModalDialogComponent } from './shared/component/modal-dialog/modal-dialog.component';
import { OrderTicketErrorComponent } from './error/component/order-ticket-error/order-ticket-error.component';
import { TicketHeaderComponent } from './order/component/ticket-header/ticket-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PivotEditComponent,
    PivotViewComponent,
    PivotTableComponent,
    FormatNumberNoCommaPipe,
    PivotTableItemComponent,
    TicketComponent,
    PriceTickCurrencyComponent,
    TestPageComponent,
    NavMenuComponent,
    OrdersComponent,
    ModalDialogComponent,
    OrderTicketErrorComponent,
    TicketHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMasonryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
