const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/authRoutes");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT || 5252;

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/auth", authRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
