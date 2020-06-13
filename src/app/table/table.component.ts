import { Component, OnInit } from '@angular/core';
import { InputDataFormatterServiceService } from '../shared/input-data-formatter-service.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// “batchId, status, active messages, error”
// type StateType = Scheduled | InProgress | Success | Error | Expired | Ready

// class Dag(batchId: string,
//   dependencyCount: int,
//   messages: List[(string, Message)],
//   children: List[Dag])
// class Message(messageId: string, state: StateType, message: string, error: string | null)

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private _inputDataFormatterServiceService: InputDataFormatterServiceService
  ) {}

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [];

  ngOnInit(): void {
    this._inputDataFormatterServiceService.JSONSource$.subscribe((message) =>
      console.log(message)
    );
  }
}
