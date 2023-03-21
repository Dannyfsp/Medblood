require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// creating an instance of express
const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

const userRouter = require("./routes/user.routes");
const donateRouter = require("./routes/donate.routes");

// serving the home route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Medblood: The best blood bank APP 😊");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", donateRouter);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on port: ${port}`));
