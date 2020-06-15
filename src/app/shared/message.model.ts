type Scheduled = 'scheduled';
type InProgress = 'inProgress';
type Success = 'success';
type Error = 'error';
type Expired = 'expired';
type Ready = 'ready';

type StateType = Scheduled | InProgress | Success | Error | Expired | Ready;

export class Message {
  constructor(
    public messageId: string,
    public state: StateType,
    public message: string,
    public error: string | null
  ) {}
}
