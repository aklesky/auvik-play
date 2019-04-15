import { isProduction } from 'config/env';

// tslint:disable-next-line: no-var-requires
require(isProduction ? 'server/setup/production' : 'server/setup/dev');
