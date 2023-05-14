const express = require("express");
const cors = require("cors");
const { connection } = require("./connection/db");
const { userRouter } = require("./Routes/user.Routes");
const { Relater } = require("./middleware/UsertoBookRelater");
const { orderRouter } = require("./Routes/order.Router");
const { PropertyRouter } = require("./Routes/property.Router");
// Create an instance of Express app
const app = express();

// Enable all CORS requests
app.use(cors());

// Body parsing middleware
app.use(express.json());

// Serve Swagger UI at /api-docs

// Mount routers
app.use("/", userRouter);
app.use(Relater);
app.use("/property", PropertyRouter);
app.use("/", orderRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const port = process.env.PORT || 4800;
app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log(err.message);
  }
});
