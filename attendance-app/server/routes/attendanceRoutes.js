const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.post("/", async (req, res) => {
    try {
        const { date, records } = req.body;

        const existing = await Attendance.findOne({
            date,
        });

        if (existing) {
            existing.records = records;
            await existing.save();

            return res.json(existing);
        }

        const attendance =
            await Attendance.create({
                date,
                records,
            });

        res.json(attendance);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await Attendance.find().sort({
            date: -1,
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.get("/student/:id", async (req, res) => {
    try {
        const studentId = req.params.id;

        const allAttendance =
            await Attendance.find();

        const history = [];
        let present = 0;
        let absent = 0;

        allAttendance.forEach((day) => {
            const record = day.records.find(
                (r) => r.studentId === studentId
            );

            if (record) {
                history.push({
                    date: day.date,
                    status: record.status,
                });

                if (record.status === "P") present++;
                if (record.status === "A") absent++;
            }
        });

        const total = present + absent;

        const percentage = total
            ? (
                (present / total) *
                100
            ).toFixed(1)
            : 0;

        res.json({
            history,
            present,
            absent,
            percentage,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.get("/:date", async (req, res) => {
    try {
        const data =
            await Attendance.findOne({
                date: req.params.date,
            });

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.delete("/:date", async (req, res) => {
    try {
        const deleted =
            await Attendance.findOneAndDelete({
                date: req.params.date,
            });

        if (!deleted) {
            return res.status(404).json({
                error: "Attendance not found",
            });
        }

        res.json({
            message:
                "Attendance deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

module.exports = router;