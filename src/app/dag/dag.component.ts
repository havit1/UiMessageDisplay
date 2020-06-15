import { Component, OnInit, Input } from '@angular/core';
import { Dag } from '../shared/models/dag.model';

@Component({
  selector: 'app-dag',
  templateUrl: './dag.component.html',
  styleUrls: ['./dag.component.scss'],
})
export class DagComponent implements OnInit {
  constructor() {}

  @Input() dag: Dag;

  ngOnInit(): void {}
}
