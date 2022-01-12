const restify = require("restify");
const mongoose = require("mongoose");
const config = require("./config");

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// listen at
server.listen(config.PORT, (err) => {
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
  });
});

const db = mongoose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => {
  require("./routes/customers")(server);
  console.log(`Server started on PORT:${config.PORT}`);
});
