import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dag } from '../models/dag.model';

@Injectable({
  providedIn: 'root',
})
export class InputDataFormatterService {
  constructor() {}
  private _JSONSource = new Subject<Array<Dag>>();

  JSONSource$ = this._JSONSource.asObservable();

  formatJson(newJson: string) {
    const data = JSON.parse(newJson);
    data.forEach((element: any) => {
      element.messages.forEach(
        (message) =>
          message && (message[1].state = Object.keys(message[1].state)[0])
      );
    });
    this._JSONSource.next(data);
  }
}
