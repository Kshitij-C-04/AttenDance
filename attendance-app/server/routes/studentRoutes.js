const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
    try {
        const students = await Student.find({
            active: true,
        }).sort({
            name: 1,
        });

        res.json(students);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const student = await Student.create({
            name: req.body.name,
        });

        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const student =
            await Student.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name,
                },
                { new: true }
            );

        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.patch("/:id/fees", async (req, res) => {
    try {
        const { month, paid } = req.body;

        const student =
            await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                error: "Student not found",
            });
        }

        const updatedFees = {
            ...student.fees,
            [month]: paid,
        };

        student.fees = updatedFees;

        await student.save();

        res.json(student);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Student.findByIdAndUpdate(
            req.params.id,
            {
                active: false,
            }
        );

        res.json({
            message: "Student deleted",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});

module.exports = router;