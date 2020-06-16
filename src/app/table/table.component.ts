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
