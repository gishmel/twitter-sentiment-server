/* Libraries needed */
import "babel-polyfill";
import Koa from "koa";
import logger from "koa-logger";
import parser from "koa-bodyparser";
import cors from "kcors";
import rp from "request-promise";
import {oauth2, tweets} from "./twitter/index";
/* Artifacts from Libraries */
const app = new Koa();

app
  .use(logger()) // Logs information
  .use(parser()) // Parses json body requests.
  .use(cors()) // Attaches the necessary res.headers
  /* A universal interceptor, that prints the ctx each time a request is
  ** made of the server
  */
  .use(tweets.routes()) // Assigns routes defined by tweets
  .use(tweets.allowedMethods()); // Security manager for allowed HTTP methods on an endpoint basis for tweets

app.listen('0.0.0.0', 8000, () => console.log("Listening on port 8000."));
export {app};
