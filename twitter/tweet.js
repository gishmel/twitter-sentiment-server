import mongoose from "mongoose";

const {Schema} = mongoose;
const {Mixed} = Schema.Types;

const TweetSchema = new Schema({
  query: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  tweets: {
    type: Mixed
  }
});

const Tweet = mongoose.model("Tweet", TweetSchema);

export {Tweet, TweetSchema};
