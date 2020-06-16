import { Component, OnInit } from '@angular/core';
import { InputDataFormatterService } from '../shared/services/input-data-formatter.service';
import { GetUpdatesService } from '../shared/services/get-updates.service';
import { Dag } from '../shared/models/dag.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private _inputDataFormatterService: InputDataFormatterService,
    private _getUpdatedDataService: GetUpdatesService
  ) {}

  displayedColumns: string[] = ['batchId', 'status', 'activeMessages', 'error'];

  dataSource: Array<Dag> = [];

  ngOnInit(): void {
    this._inputDataFormatterService.JSONSource$.subscribe(
      (message: Array<Dag>): void => {
        if (this.dataSource.length > 0) {
          const newData: Array<Dag> = this._getUpdatedDataService.getUpdates(
            message,
            this.dataSource
          );
          this.dataSource = newData;
        } else {
          this.dataSource = message;
        }
      }
    );
  }
}
