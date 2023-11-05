const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const routes = require("./routes/index.routes");
const connectAMQP = require("./config/rabbitmq");
const app = express();
const port = 3001

app.use(express.json());

dotenv.config();
database();
connectAMQP();

app.use("/api/auth", routes)

app.listen(port, () => {
  console.log(`Server started on port ${port} 🔥`);
});
