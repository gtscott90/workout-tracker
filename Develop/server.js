const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const logger = require("morgan");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(apiRoutes);
app.use(htmlRoutes);

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/devsync',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
