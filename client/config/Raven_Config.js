import Raven from 'raven-js';

const sentry_key = '7f6af7d5987043ba8f17a6da00b4c9e3';  // need to get number
const sentry_app = '172330';  //need to get number

export const sentry_url = 'https://7f6af7d5987043ba8f17a6da00b4c9e3@sentry.io/172330';   //url need to get

export function logException(ex, context){
  Raven.captureException(ex, {
    extra: context
  });

  // eslint no-console: 0
  window && window.console && console.error && console.error(ex);
}
