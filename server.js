require("./models/workout");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");


const app = express();
const PORT = process.env.PORT || 3001;



mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/workout-tracker',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger("dev"));
app.use(express.json());
app.use(apiRoutes);
app.use(htmlRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

module.exports = app;