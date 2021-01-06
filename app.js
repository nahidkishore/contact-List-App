const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/contacts", router);

app.get("/", (req, res) => {
  res.send("<h2>database create</h2>");
});

const port = process.env.port || 5000;
mongoose
  .connect(
    `mongodb+srv://stackLearner:test123@cluster0.jolmh.mongodb.net/stackLearner?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then(() => {
    app.listen(port, () => {
      console.log(`port is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
