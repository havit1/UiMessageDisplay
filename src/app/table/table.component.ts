import { Component, OnInit } from '@angular/core';
import { InputDataFormatterServiceService } from '../shared/input-data-formatter-service.service';
import { Dag } from '../shared/dag.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private _inputDataFormatterServiceService: InputDataFormatterServiceService
  ) {}

  displayedColumns: string[] = ['batchId', 'status', 'activeMessages', 'error'];
  dataSource: Array<Dag> = [];

  ngOnInit(): void {
    this._inputDataFormatterServiceService.JSONSource$.subscribe(
      (message: Array<Dag>): void => {
        if (this.dataSource.length > 0) {
          const newData = getChanges(this.dataSource, message);
          console.log(newData);
          this.dataSource = newData || message || [];
          console.log(this.dataSource);
        } else {
          this.dataSource = message;
        }
      }
    );
  }
}

const getChanges = function (oldArray, newArray) {
  let changes, i, item, j, len;
  if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
    return false;
  }
  changes = [];
  for (i = j = 0, len = newArray.length; j < len; i = ++j) {
    item = newArray[i];
    if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
      changes.push(item);
    }
  }
  return changes;
};
