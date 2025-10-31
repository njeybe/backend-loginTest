const express = require("express");
const app = express();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Some went wrong" });
});
