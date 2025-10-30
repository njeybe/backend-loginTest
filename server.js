const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get('/auth')

const PORT = process.env.PORT || 5252;
app.listen(PORT, (req, res) => {});
