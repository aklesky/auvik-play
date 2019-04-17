import { withAppIntl } from '@/hoc/i18n';
import { withSubscription } from '@/hoc/subscription';
import { IMeetup } from '@/interfaces';
import subscription from '@/queries/meetups.graphql';
import { Channels } from '@/utils/enums';
import React from 'react';
import { Marker } from 'react-google-maps';

const Container = props => {
  const { Meetups }: { Meetups: IMeetup } = props;
  if (Meetups.venue === null) {
    return null;
  }
  return (
    <Marker
      label={{ text: Meetups.event.event_name }}
      title={Meetups.event.event_name}
      position={{
        lat: parseInt(Meetups.venue.lat, 0),
        lng: parseInt(Meetups.venue.lon, 0)
      }}
    />
  );
};

export const MarkerSub = withSubscription(subscription, {
  channel: Channels.Meetups
})(withAppIntl(Container));
