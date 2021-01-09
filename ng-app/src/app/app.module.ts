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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PivotEditComponent,
    PivotViewComponent,
    PivotTableComponent,
    FormatNumberNoCommaPipe,
    PivotTableItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
