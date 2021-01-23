import { Component, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/configuration/service/settings.service';
import { AutoTradeSettingsService } from './order/service/auto-trade-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-app';
  configSettingsLoaded: EventEmitter<void> = new EventEmitter();

  constructor(
    private settingsService: SettingsService,
    private autoTradeSettingsService: AutoTradeSettingsService) { 
  }

  ngOnInit(): void {
    this.settingsService.Initialize();
    this.autoTradeSettingsService.Initialize();
  }
}
