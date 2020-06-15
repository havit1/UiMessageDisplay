import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class Dag {
  constructor(
    public batchId: string,
    public dependencyCount: number,
    public messages: Array<string | Message>,
    public children?: Array<Dag>
  ) {}
}
