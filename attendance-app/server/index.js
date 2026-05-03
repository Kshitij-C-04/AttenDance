const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
    res.send("Attendance API running");
});

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server running on port ${process.env.PORT || 5000}`
    );
});