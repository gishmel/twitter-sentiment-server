import mongoose from "mongoose";

// This mongo will be used as a selector inside of kubernetes and it will get the IP address of the running container that is labeled mongo
const dbConnection = mongoose.connect("mongodb://96.249.210.132:3127/twitterSentimentsGiphy");
mongoose.connection.on("error", console.error);


export {dbConnection as db};
