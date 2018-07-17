import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class DataForChartService {

  constructor() { }
  getData (): Observable<any> {
    const data = [84, 14, 234, 37, 64, 42, 197, 11];
    return of(data);
  }
}
