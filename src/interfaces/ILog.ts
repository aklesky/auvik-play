export interface ILog {
  time: number;
  message: string;
}

export interface ILogsState {
  logs: ILog[];
}
