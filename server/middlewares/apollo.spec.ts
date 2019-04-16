import { should } from 'chai';
import { split } from 'apollo-link';
import { createTestClient } from 'apollo-server-testing';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { createServer } from 'server/setup/koa';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { logger } from 'server/utils/logger';
import { gql } from 'apollo-server-koa';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ws from 'ws';
import fetch from 'isomorphic-unfetch';
import { port, hostname } from 'config/env';
import { Messages } from 'server/resolvers/messages';
import { pubsub } from 'server/resolvers/meetup';

if (!(process as any).browser) {
  (global as any).fetch = fetch;
}
should();

describe('Apollo Server Suite', () => {
  let server = null;
  let instance = null;
  let client: ApolloClient<any> = null;
  let subscriptionClient = null;
  let defaultClient = null;
  let link = null;

  before(() => {
    const { app, apollo } = createServer();

    server = app.listen(port, () => {
      logger.info(`server is runninng on ${port}`);
    });
    apollo.installSubscriptionHandlers(server);
    instance = apollo;
    subscriptionClient = new WebSocketLink(
      new SubscriptionClient(
        `ws://${hostname}:${port}/graphql`,
        {
          reconnect: true
        },
        ws
      )
    );

    defaultClient = new HttpLink({
      uri: `http://${hostname}:${port}/graphql`
    });

    link = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionClient,
      defaultClient
    );

    client = new ApolloClient({
      link,
      cache: new InMemoryCache()
    });
  });
  after(() => {
    server.close();
    client = null;
  });

  it('Apollo Query: Meetups should have a property rsvp_id', async () => {
    const { query } = createTestClient(instance);
    const response = await query({
      query: gql`
        {
          Meetups {
            rsvp_id
          }
        }
      `
    });
    response.should.have
      .property('data')
      .and.to.be.an('object')
      .that.has.property('Meetups')
      .that.has.property('rsvp_id');
  });

  it('Apollo Query: Meetups subscription should recieve an object with a property rsvp_id', done => {
    setTimeout(() => {
      pubsub.publish(Messages.push, { Meetups: { rsvp_id: 22 } });
    }, 2000);
    const subscription = client
      .subscribe({
        query: gql`
          subscription {
            Meetups {
              rsvp_id
            }
          }
        `
      })
      .subscribe(response => {
        subscription.unsubscribe();
        response.should.have
          .property('data')
          .and.to.be.an('object')
          .that.has.property('Meetups')
          .that.has.property('rsvp_id')
          .and.to.be.equal('22');

        done();
      });
  });
});
