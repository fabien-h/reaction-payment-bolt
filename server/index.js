/**
 * Allow the bolt server to communicate with our server
 */
import { BrowserPolicy } from 'meteor/browser-policy-common';
BrowserPolicy.content.allowOriginForAll('*.bolt.com');

/**
 * Listen to incoming request and intercept bolt requests
 */
WebApp.rawConnectHandlers.use((request, response, next) => {
  if (request.originalUrl === '/bolt-hook') {
    console.log('hook');
    //return response.end(boltHooks(request));
  }

  if (request.originalUrl === '/bolt-shipping') {
    console.log('shipping');
    //return response.end(boltShipping(request))
  }

  /**
   * Keep going
   * /!\ DO NOT DELETE /!\
   */
  return next();
});
