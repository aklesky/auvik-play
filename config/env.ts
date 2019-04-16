import { config } from 'dotenv';
import os from 'os';

config();

export const port = process.env.PORT || 3000;
export const redis_port = process.env.REDIS_PORT || 6379;
export const redis_passwd = process.env.REDIS_PASSWORD || '';

export const hostname = process.env.NODE_APP_HOST || os.hostname();
export const isProduction = process.env.NODE_ENV === 'production';
export const publicUrl = process.env.PUBLIC_URL || `http://${hostname}:${port}`;
export const meetupUri = process.env.MEETUP_STREAM_URL || '';
