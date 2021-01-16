import { Component, OnInit } from '@angular/core';
import { AtmStrategyService } from '../../order/service/atm-strategy.service';
import { OrderService } from '../../order/service/order.service';
import { SettingsService } from '../../configuration/service/settings.service';
import { FuturesValueService } from '../../reference/service/futures-value.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor(private atmStrategyService: AtmStrategyService, 
    private orderService: OrderService, 
    private settingsService: SettingsService,
    private futuresValueService: FuturesValueService) { }

  ngOnInit(): void {
  }
}
