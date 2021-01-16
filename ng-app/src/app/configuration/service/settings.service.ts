import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getDefaultATM(): number {
    return 2;
  }
}
