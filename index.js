require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// creating an instance of express
const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

const userRouter = require("./src/routes/user.routes");
const donateRouter = require("./src/routes/donate.routes");

// serving the home route
app.get("/api/v1", (req, res) => {
  res.status(200).send("Welcome to Medblood: The best blood bank APP 😊");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", donateRouter);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server up and running on port ${port}`));
