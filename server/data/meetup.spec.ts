import { IMeetup } from '@/interfaces/IMeetup';
import { should } from 'chai';
import { config } from 'dotenv';
import { getMeetupClient, initMeetupConnection } from './meetup';

config();

should();

describe('Meetup Stream Suite', () => {
  let client = null;
  beforeEach(() => {
    client = getMeetupClient();
  });
  afterEach(done => {
    done();
  });

  it('Stream URL should be defined', () => {
    // tslint:disable-next-line: no-unused-expression
    process.env.MEETUP_STREAM_URL.should.not.be.undefined;
  });
  it('initMeetupConnection should be a function', () => {
    initMeetupConnection.should.be.a('function');
  });

  it('getMeetupClient should be a function', () => {
    getMeetupClient.should.be.a('function');
  });
  it('getMeetupClient should be a singleton', () => {
    getMeetupClient()(() => {}).should.be.equal(client(() => {}));
  });

  it('initMeetupConnection should have an error of invalid url', () => {
    const meetup = initMeetupConnection();
    meetup.should.contain('Invalid URL: undefined');
  });

  it('initMeetupConnection should connect to the stream', () => {
    client(ws => {
      ws.target.readyState.should.be.within(1, 2);
      ws.target.close();
    });
  });

  it('initMeetupConnection should return a chunk of data', () => {
    client(ws => {
      const data: IMeetup = JSON.parse(ws.data.toString());
      data.should.have.property('rsvp_id');
      ws.target.close();
    });
  });
});
