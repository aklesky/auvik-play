import { apolloClient } from '@/utils/apollo';
import ApolloClient from 'apollo-client';
import { ApolloServerBase } from 'apollo-server-core';
import { gql } from 'apollo-server-koa';
import { createTestClient } from 'apollo-server-testing';
import { should } from 'chai';
import fetch from 'isomorphic-unfetch';
import { pubsub } from 'server/data/subscription';
import { createServer } from 'server/setup/koa';
import { logger } from 'server/utils/logger';

if (!process.browser) {
  global.fetch = fetch;
}
should();

describe('Apollo Server Suite', () => {
  let server = null;
  let instance: ApolloServerBase = null;
  let client: ApolloClient<any> = null;

  before(() => {
    const { app, apollo } = createServer();
    server = app.listen('3002', () => {
      logger.info(`server is runninng on 3002`);
    });

    apollo.installSubscriptionHandlers(server);
    instance = apollo;

    client = apolloClient(false, `127.0.0.1:3002/graphql`);
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
      pubsub.publish('test', { Meetups: { rsvp_id: 22 } });
    }, 1000);

    const subscription = client
      .subscribe({
        query: gql`
          subscription getMeetups($channel: String) {
            Meetups(channel: $channel) {
              rsvp_id
            }
          }
        `,
        variables: {
          channel: 'test'
        }
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
