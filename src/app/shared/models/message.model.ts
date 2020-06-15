type Scheduled = 'Scheduled';
type InProgress = 'InProgress';
type Success = 'Success';
type Error = 'Error';
type Expired = 'Expired';
type Ready = 'Ready';

type StateType = Scheduled | InProgress | Success | Error | Expired | Ready;

export class Message {
  constructor(
    public messageId: string,
    public state: StateType,
    public message: string,
    public error: string | null
  ) {}
}
