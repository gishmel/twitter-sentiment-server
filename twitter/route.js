import rp from "request-promise";
import Router from "koa-router";
import {Tweet} from "./index";
import sentiment from "sentiment";

var tweets = new Router({
  prefix: "/tweets"
});

tweets
  .get("/", async (ctx, next) => {
    console.log(process.env.ACCESS_TOKEN);
    let bearer = `Bearer ${process.env.ACCESS_TOKEN}`;
    let options = {
      uri: `https://api.twitter.com/1.1/search/tweets.json?${ctx.querystring}`,
      method: 'GET',
      headers: {
        'Authorization': bearer
      }
    };
    let response = await rp(options);
    response = JSON.parse(response);
    let tweets = response.statuses;
    for (let i = 0; i < tweets.length; i++) {
      tweets[i].score = await sentiment(tweets[i].text).score;
    }
    await new Tweet({"query": ctx.query.q, "tweets": tweets}).save();
    ctx.body = response;
  })
  .get("/archive", async (ctx, next) => {
    if(ctx.query.q != '' && (ctx.query.q != null && ctx.query.q != undefined)) {
      var response = await Tweet.find({query: ctx.query.q});
    } else {
      var response = await Tweet.find({});
      let queries = {};
      let searches = [];
      if (Array.isArray(response)) {
        response.map((obj) => {
          if (!queries[obj.query]) {
            queries[obj.query] = 1;
          } else {
            queries[obj.query] += 1;
          }
        });
        for (let key in queries) {
          let obj = {"text": key, "frequency": queries[key]};
          searches = searches.concat(obj);
        }
        response = searches;
      }
    }
    ctx.body = response;
  });

export {tweets};
