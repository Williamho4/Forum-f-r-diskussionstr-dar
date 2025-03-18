require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const threadRoutes = require("./routes/threadRoutes");

app.use("/threads", threadRoutes);

const postRoutes = require("./routes/postRoutes");

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
