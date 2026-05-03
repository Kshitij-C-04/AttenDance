const mongoose = require("mongoose");

const defaultFees = {
    Jan: false,
    Feb: false,
    Mar: false,
    Apr: false,
    May: false,
    Jun: false,
    Jul: false,
    Aug: false,
    Sep: false,
    Oct: false,
    Nov: false,
    Dec: false,
};

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        active: {
            type: Boolean,
            default: true,
        },

        fees: {
            type: mongoose.Schema.Types.Mixed,
            default: () => ({ ...defaultFees }),
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Student",
    studentSchema
);