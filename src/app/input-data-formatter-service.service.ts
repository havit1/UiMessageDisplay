import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputDataFormatterServiceService {
  constructor() {}

  private _JSONSource = new Subject<JSON>();
  JSONSource$ = this._JSONSource.asObservable();
  formatJson(newJson: JSON) {
    console.log(newJson);
    this._JSONSource.next(newJson);
  }
}
