require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());

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