const express = require('express')
//const graphqlHTTP = require('express-graphql')
const { graphqlHTTP } = require('express-graphql');
//const mongoose = require('mongoose');
const schema = require('./schema/schema')
const cors = require('cors')

const app = express();
app.use(cors())
const mongoose = require("mongoose");
// mongoose
//     .connect(
//         "mongodb+srv://user:DEV123!@cluster0.wqoad.mongodb.net/projects?retryWrites=true&w=majority",
//         { useNewUrlParser: true, useUnifiedTopology: true }
//     )
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch(err => console.log("Error: ", err.message));





mongoose.connect('mongodb://dev:DEV123!@cluster0-shard-00-00.r2fa9.mongodb.net:27017,cluster0-shard-00-01.r2fa9.mongodb.net:27017,cluster0-shard-00-02.r2fa9.mongodb.net:27017/projects?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log("connected")

})
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log("now listening on port 4000")
})
