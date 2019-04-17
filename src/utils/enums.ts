export enum Channels {
  Meetups = 'Meetups',
  Logs = 'Logs',
}

export enum StreamRequest {
  stop = 'stop',
  start = 'start'
}

export enum EventTypes {
  StartStream = 'start_stream',
  StopStream = 'stop_stream'
}

export enum ActionTypes {
  ADD_MEETUPS = 'ADD_MEETUP_LOG',
  START_RECEIVING = 'START RECEIVING',
  STOP_RECEIVING = 'STOP RECEIVING',
}
