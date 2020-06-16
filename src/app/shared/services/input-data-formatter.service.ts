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
  StateType,
} from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class InputDataFormatterService {
  constructor() {}
  private _JSONSource = new Subject<Array<Dag>>();

  JSONSource$ = this._JSONSource.asObservable();

  getMessageState(message: Message) {
    let state: StateType = Object.keys(message.state)[0] as StateType;
    return state;
  }

  getMessageStatus(messagesState: Map<StateType, ''>) {
    if (messagesState.has(Error)) return Error;
    else if (messagesState.has(InProgress) || messagesState.has(Ready))
      return InProgress;
    else if (messagesState.has(Expired)) return Expired;
    else if (
      messagesState.has(Scheduled) &&
      !messagesState.has(Error) &&
      !messagesState.has(Expired) &&
      !messagesState.has(Success) &&
      !messagesState.has(InProgress) &&
      !messagesState.has(Ready)
    ) {
      return Scheduled;
    } else if (
      messagesState.has(Success) &&
      !messagesState.has(Error) &&
      !messagesState.has(Expired) &&
      !messagesState.has(Scheduled) &&
      !messagesState.has(InProgress) &&
      !messagesState.has(Ready)
    )
      return Success;
  }

  buildActiveMessage(message: Message) {
    let messages = [];
    message.state !== Scheduled &&
      message.state !== Success &&
      messages.push(Object.keys(message.message));

    let messagesString = messages.join(', ');
    return messagesString;
  }

  getMessageErrors(message: Message): string {
    return message.error
      ? `${Object.keys(message.message)[0]} : ${message.error}`
      : null;
  }

  formatMessages(dag: Dag) {
    const messagesErrors = [];
    const activeMessages = [];
    let status = '';
    const messagesState = new Map();
    dag.messages.forEach((message) => {
      let state = this.getMessageState(message[1]);
      messagesState.set(state, '');
    });

    dag.messages.forEach((message) => {
      const messageInfo = message[1];
      messageInfo.state = this.getMessageState(messageInfo);

      const error = this.getMessageErrors(messageInfo);
      error && messagesErrors.push(error);

      status = this.getMessageStatus(messagesState);

      const activeMessage = this.buildActiveMessage(messageInfo);
      !!activeMessage && activeMessages.push(activeMessage);
    });
    dag.status = status;
    dag.activeMessages = activeMessages.join(', ');
    dag.errorMessage = messagesErrors[0];
  }

  formatJson(newJson: string) {
    const data = JSON.parse(newJson);
    data.forEach((element: Dag) => {
      this.formatMessages(element);
    });
    this._JSONSource.next(data);
  }
}
