import { Component, OnInit } from '@angular/core';
import { InputDataFormatterService } from '../shared/services/input-data-formatter.service';
import { Dag } from '../shared/models/dag.model';
import {
  Error,
  Expired,
  InProgress,
  Ready,
  Scheduled,
  Success,
} from '../shared/models/message.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private _inputDataFormatterServiceService: InputDataFormatterService
  ) {}

  displayedColumns: string[] = ['batchId', 'status', 'activeMessages', 'error'];

  dataSource: Array<Dag> = [];

  ngOnInit(): void {
    this._inputDataFormatterServiceService.JSONSource$.subscribe(
      (message: Array<Dag>): void => {
        message.forEach(
          (m) => (
            (m.status = getStatus(m)),
            (m.activeMessages = buildActiveMessage(m)),
            (m.error = getErrors(m))
          )
        );
        if (this.dataSource.length > 0) {
          const newData: Array<Dag> = getUpdates(message, this.dataSource);
          this.dataSource = newData;
        } else {
          this.dataSource = message;
        }
      }
    );
  }
}

function buildActiveMessage(dag: Dag) {
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

function getStatus(dag: Dag) {
  let status = '';
  const messagesState = dag.messages.map((d) => d[1].state);
  if (messagesState.includes(Error)) status = Error;
  else if (messagesState.includes(InProgress) || messagesState.includes(Ready))
    status = InProgress;
  else if (messagesState.includes(Expired)) status = Expired;
  else if (
    messagesState.includes(Scheduled) &&
    !messagesState.includes(Error) &&
    !messagesState.includes(Expired) &&
    !messagesState.includes(Success) &&
    !messagesState.includes(InProgress)
  ) {
    status = Scheduled;
  } else if (
    messagesState.includes(Success) &&
    !messagesState.includes(Error) &&
    !messagesState.includes(Expired) &&
    !messagesState.includes(Scheduled) &&
    !messagesState.includes(InProgress)
  )
    status = Success;
  return status;
}

function getErrors(dag: Dag): string {
  let error = [];
  console.log(dag, error);

  dag.messages.forEach((d) => {
    d[1].error
      ? error.push(`${Object.keys(d[1].message)[0]} : ${d[1].error}`)
      : null;
  });
  return error[0];
}

function getUpdates(newState: Array<Dag>, oldState: Array<Dag>): Array<Dag> {
  let updatedState: Array<Dag> = [];
  newState.forEach((dag) =>
    oldState.find((d, i) => {
      return d.batchId === dag.batchId
        ? (oldState.splice(i, 1, dag), (updatedState = [...oldState]))
        : (updatedState = [...newState]);
    })
  );
  return updatedState;
}
