import { Injectable } from '@angular/core';
import { Pivot } from '../model/pivot';
import { Observable, of, Subject } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class PivotService {

  constructor() { }

  public getPivotTickers(): Observable<Pivot[]> {
    const pivots: Pivot[] = new Array<Pivot>();
    pivots.push(new Pivot('NQ', new Date(2020, 1, 8), 12959, 12646.5, 12928));
    pivots.push(new Pivot('ES', new Date(2020, 1, 8), 3824.5, 3775, 3822.25));
    pivots.push(new Pivot('RTY', new Date(2020, 1, 8), 3824.5, 3775, 3822.25));
    pivots.push(new Pivot('YM', new Date(2020, 1, 8), 3824.5, 3775, 3822.25));

    return of(pivots);
  }
}
