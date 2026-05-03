const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

const frontendPath = path.join(
    __dirname,
    "../dist"
);

app.use(express.static(frontendPath));

// fallback route for React
app.get("/*rest", (req, res) => {
    res.sendFile(
        path.join(frontendPath, "index.html")
    );
});

app.listen(process.env.PORT || 5000, () => {
    console.log(
        `Server running on ${process.env.PORT || 5000}`
    );
});