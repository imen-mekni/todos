require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

const origins = (process.env.CLIENT_ORIGIN || "*").split(",").map((o) => o.trim());
app.use(cors({ origin: origins.includes("*") ? true : origins }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ status: "ok", message: "Todo API running" }));

// Mounted on both paths because the challenge docs use /api/todo
// for most routes but /api/todos for DELETE.
app.use("/api/todo", todoRoutes);
app.use("/api/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
});
