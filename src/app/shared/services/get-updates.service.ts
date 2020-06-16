import { Injectable } from '@angular/core';
import { Dag } from '../models/dag.model';

@Injectable({
  providedIn: 'root',
})
export class GetUpdatesService {
  constructor() {}

  getUpdates(newState: Array<Dag>, oldState: Array<Dag>): Array<Dag> {
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
}
