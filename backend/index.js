require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",  //for local testing, change it to *
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

require("./configDb");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");


app.get("/", (req, res) => {
    res.send("Lead Management API Running");
});

//routes

app.use("/api", authRoutes);
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});