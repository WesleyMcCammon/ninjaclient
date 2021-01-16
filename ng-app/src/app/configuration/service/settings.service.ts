import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public defaultATMStrategy(): string {
    return 'Reversal 5';
  }
}
