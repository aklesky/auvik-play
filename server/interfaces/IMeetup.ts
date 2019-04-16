import { IVenue } from "./IVenue";
import { IEvent } from "./IEvent";
import { IGroup } from "./IGroup";

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
