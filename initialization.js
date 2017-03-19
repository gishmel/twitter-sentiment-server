import mongoose from "mongoose";

// This mongo will be used as a selector inside of kubernetes and it will get the IP address of the running container that is labeled mongo
const dbConnection = mongoose.connect("mongodb://mongo:27017/twitterSentimentsGiphy");
mongoose.connection.on("error", console.error);


export {dbConnection as db};
