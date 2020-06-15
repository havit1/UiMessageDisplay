import { Component, OnInit } from '@angular/core';
import { InputDataFormatterService } from '../shared/services/input-data-formatter.service';
import { Dag } from '../shared/models/dag.model';

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
        message.forEach((m) => (m.status = getStatus(m)));
        console.log(message);
        if (this.dataSource.length > 0) {
          const newData: Array<Dag> = getChanges(this.dataSource, message);
          this.dataSource = newData || message || [];
        } else {
          this.dataSource = message;
        }
      }
    );
  }
}

function getStatus(dag: Dag) {
  let status = '';
  const messagesState = dag.messages.map((d) => d[1].state);
  if (messagesState.includes('Error')) status = 'Error';
  else if (
    messagesState.includes('InProgress') ||
    messagesState.includes('Ready')
  )
    status = 'InProgress';
  else if (messagesState.includes('Expired')) status = 'Expired';
  else if (
    messagesState.includes('Scheduled') &&
    !messagesState.includes('Error') &&
    !messagesState.includes('Expired') &&
    !messagesState.includes('Success') &&
    !messagesState.includes('InProgress')
  ) {
    status = 'Scheduled';
  } else if (
    messagesState.includes('Success') &&
    !messagesState.includes('Error') &&
    !messagesState.includes('Expired') &&
    !messagesState.includes('Scheduled') &&
    !messagesState.includes('InProgress')
  )
    status = 'Success';
  return status;
}

const getChanges = function (oldArray, newArray) {
  let changes, i, item, j, len;
  if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
    return false;
  }
  changes = [];
  for (i = 0, len = newArray.length; i < len; ++i) {
    item = newArray[i];
    if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
      changes.push(item);
    }
  }
  return changes;
};
