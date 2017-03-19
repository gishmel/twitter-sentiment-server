import {OAuth2} from "oauth";
import {redis} from "../initialization";

let oauth2 = new OAuth2(
  consumerKey,
  consumerSecret,
  'https://api.twitter.com/',
  null,
  'oauth2/token',
  null);

oauth2.getOAuthAccessToken(
  '',
  {'grant_type': 'client_credentials'},
  (err, access_token, refresh_token, results) => {
    process.env.ACCESS_TOKEN = access_token;
  });

export {oauth2};
