import { should } from 'chai';
import { config } from 'dotenv';
import { initMeetupConnection } from './meetup';
import { IMeetup } from '../interfaces/IMeetup';

config();

should();

describe('Meetup Stream Suite', () => {
  it('Stream URL should be defined', () => {
    process.env.MEETUP_STREAM_URL.should.not.be.undefined;
  });
  it('initMeetupConnection should be a function', () => {
    initMeetupConnection.should.be.a('function');
  });

  it('initMeetupConnection should have an error of invalid url', () => {
    const meetup = initMeetupConnection();
    meetup.should.be.eqls('Invalid URL: undefined');
  });

  it('initMeetupConnection should connect to the stream', done => {
    const meetup = initMeetupConnection(process.env.MEETUP_STREAM_URL);
    meetup.onopen = ws => {
      ws.target.readyState.should.be.eqls(1);
      done();
      meetup.close();
    };
  });

  it('initMeetupConnection should return a chunk of data', done => {
    const meetup = initMeetupConnection(process.env.MEETUP_STREAM_URL);
    meetup.onmessage = ws => {
      const data: IMeetup = JSON.parse(ws.data.toString());
      data.should.have.property('rsvp_id');
      done();
      meetup.close();
    };
  });
});
