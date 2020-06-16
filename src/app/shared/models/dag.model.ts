import { Message, Scheduled, Success } from './message.model';

export class Dag {
  constructor(
    public batchId: string,
    public dependencyCount: number,
    public messages: Array<Message>,
    public children?: Array<Dag>,
    public status?: string,
    public activeMessages?: string,
    public error?: string
  ) {}
}
