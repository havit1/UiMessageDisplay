export type TScheduled = 'Scheduled';
export type TInProgress = 'InProgress';
export type TSuccess = 'Success';
export type TError = 'Error';
export type TExpired = 'Expired';
export type TReady = 'Ready';

export const Scheduled = 'Scheduled';
export const InProgress = 'InProgress';
export const Success = 'Success';
export const Error = 'Error';
export const Expired = 'Expired';
export const Ready = 'Ready';

export type StateType =
  | TScheduled
  | TInProgress
  | TSuccess
  | TError
  | TExpired
  | TReady;

export class Message {
  constructor(
    public messageId: string,
    public state: StateType,
    public message: string,
    public error: string | null
  ) {}
}
