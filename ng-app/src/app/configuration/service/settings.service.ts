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

  public getDefaultATM(): number {
    return this.configrationSettings.defaultATM;
  }

  private loadConfigurationSettings(): Observable<ConfigrationSettings> {
    const configSettings: ConfigrationSettings = {
      defaultATM: 2
    }

    return of(configSettings);
  }
}
