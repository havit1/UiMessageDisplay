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

  formatJson(newJson: string) {
    const data = JSON.parse(newJson);
    data.forEach((element: Dag) => {
      this.formatMessages(element);
    });
    this._JSONSource.next(data);
  }

  formatMessages(dag: Dag) {
    const messagesErrors = [];
    const activeMessages = [];
    const messagesState = new Map();
    let status = '';

    this.formatDagAndItsChildren(
      dag,
      messagesState,
      messagesErrors,
      activeMessages
    );

    status = this.getDagStatus(messagesState);

    dag.status = status;
    dag.activeMessages = activeMessages.join(', ');
    dag.errorMessage = messagesErrors[0];
  }

  formatDagAndItsChildren(
    dag: Dag,
    messagesState: Map<StateType, ''>,
    messagesErrors: String[],
    activeMessages: String[]
  ) {
    dag.messages.forEach((message) => {
      const messageInfo = message[1];

      let state = this.getMessageState(messageInfo);
      messagesState.set(state, '');
      messageInfo.state = state;

      const error = this.getMessageErrors(messageInfo);
      error && messagesErrors.push(error);

      const activeMessage = this.getActiveMessages(messageInfo);
      !!activeMessage && activeMessages.push(activeMessage);
    });

    if (dag.children.length > 0)
      dag.children.forEach((child) =>
        this.formatDagAndItsChildren(
          child,
          messagesState,
          messagesErrors,
          activeMessages
        )
      );
  }

  getMessageState(message: Message) {
    let state: StateType = Object.keys(message.state)[0] as StateType;
    return state;
  }

  getDagStatus(messagesState: Map<StateType, ''>) {
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

  getActiveMessages(message: Message) {
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
}
