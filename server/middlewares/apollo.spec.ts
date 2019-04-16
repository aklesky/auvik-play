import { should, expect } from 'chai';
import { createTestClient } from 'apollo-server-testing';
import { createServer } from 'server/setup/koa';
import { logger } from 'server/utils/logger';
import { gql } from 'apollo-server-koa';
should();

describe('Apollo Server Suite', () => {
  let server = null;
  let instance = null;

  beforeEach(() => {
    const { app, apollo } = createServer();

    server = app.listen(3200, () => {
      logger.info(`server is runninng on 3200`);
    });
    instance = apollo;
  });
  after(() => {
    server.close();
  });

  it('Apollo Query: Meetup should have a property rsvp_id', async () => {
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
      .that.has.property('rsvp_id')
  });
});
