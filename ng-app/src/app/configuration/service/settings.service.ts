import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigrationSettings } from '../model/configuration-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private configrationSettings: ConfigrationSettings;

  constructor() { 
  }

  public Initialize() {
    this.loadConfigurationSettings().subscribe(configurationSettings => {
      this.configrationSettings = configurationSettings;
    });
  }

  public getDefaultAutoTradingId(): number {
    return this.configrationSettings.defaultAutoTradingId;
  }

  private loadConfigurationSettings(): Observable<ConfigrationSettings> {
    const configSettings: ConfigrationSettings = {
      defaultAutoTradingId: 2
    }

    return of(configSettings);
  }
}
