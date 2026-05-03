const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        records: [
            {
                studentId: String,
                name: String,
                status: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);