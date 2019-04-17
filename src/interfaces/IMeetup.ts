import { IEvent } from './IEvent';
import { IGroup } from './IGroup';
import { IVenue } from './IVenue';


export interface IMeetup {
  rsvp_id: number;
  mtime: number;
  response: string;
  guests: number;
  visibility: string;
  venue: IVenue;
  event: IEvent;
  group: IGroup;
}

export interface IMeetupState {
  state: boolean;
  meetups: IMeetup[];
}
