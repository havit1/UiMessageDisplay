import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dag } from '../models/dag.model';
import {
  Error,
  Expired,
  InProgress,
  Ready,
  Scheduled,
  Success,
  Message,
} from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class InputDataFormatterService {
  constructor() {}
  private _JSONSource = new Subject<Array<Dag>>();

  JSONSource$ = this._JSONSource.asObservable();

  getStatus(dag: Dag) {
    let status = '';
    const messagesState = dag.messages.map((d) => d[1].state);
    if (messagesState.includes(Error)) status = Error;
    else if (
      messagesState.includes(InProgress) ||
      messagesState.includes(Ready)
    )
      status = InProgress;
    else if (messagesState.includes(Expired)) status = Expired;
    else if (
      messagesState.includes(Scheduled) &&
      !messagesState.includes(Error) &&
      !messagesState.includes(Expired) &&
      !messagesState.includes(Success) &&
      !messagesState.includes(InProgress) &&
      !messagesState.includes(Ready)
    ) {
      status = Scheduled;
    } else if (
      messagesState.includes(Success) &&
      !messagesState.includes(Error) &&
      !messagesState.includes(Expired) &&
      !messagesState.includes(Scheduled) &&
      !messagesState.includes(InProgress) &&
      !messagesState.includes(Ready)
    )
      status = Success;
    return status;
  }

  buildActiveMessage(dag: Dag) {
    let messages = [];
    dag.messages.forEach(
      (message) =>
        message[1].state !== Scheduled &&
        message[1].state !== Success &&
        messages.push(Object.keys(message[1].message)[0])
    );
    let messagesString = messages.join(', ');
    return messagesString;
  }

  getErrors(dag: Dag): string {
    let error = [];

    dag.messages.forEach((d) => {
      d[1].error
        ? error.push(`${Object.keys(d[1].message)[0]} : ${d[1].error}`)
        : null;
    });
    return error[0];
  }

  getState(dag: Dag) {
    dag.messages.forEach(
      (message: Message) =>
        message && (message[1].state = Object.keys(message[1].state)[0])
    );
  }

  formatJson(newJson: string) {
    const data = JSON.parse(newJson);
    data.forEach((element: Dag) => {
      this.getState(element);
      element.status = this.getStatus(element);
      element.activeMessages = this.buildActiveMessage(element);
      element.error = this.getErrors(element);
    });
    this._JSONSource.next(data);
  }
}
