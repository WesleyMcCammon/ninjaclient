import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigrationSettings } from '../model/configuration-settings';
import { ErrorMessage } from '../model/error-message';

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

  public getErrorMessage(section: string, name: string, parameters: string[] = []): string {
    const errorMessage: ErrorMessage = this.configrationSettings
      .errorMessages.find(e => e.section === section && e.name === name);
      
    return errorMessage !== undefined ? errorMessage.getFormattedMessage(parameters) : 'no error message found';
  }

  private loadConfigurationSettings(): Observable<ConfigrationSettings> {
    const configSettings: ConfigrationSettings = {
      defaultAutoTradingId: 2,
      errorMessages: [
        new ErrorMessage('order-ticket-create', 'found', 'This order ticket already exists.'),        
        new ErrorMessage('order-ticket-create', 'reverseorderfound', 'A {0} order ticket already exists.')
      ]
    }

    return of(configSettings);
  }
}
