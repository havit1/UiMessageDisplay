import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dag } from './dag.model';

@Injectable({
  providedIn: 'root',
})
export class InputDataFormatterServiceService {
  constructor() {}
  private _JSONSource = new Subject<Array<Dag>>();

  JSONSource$ = this._JSONSource.asObservable();

  formatJson(newJson: string) {
    const data = JSON.parse(newJson);
    this._JSONSource.next(data);
  }
}
