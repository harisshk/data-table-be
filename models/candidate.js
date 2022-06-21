//Import Module's
const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

// Export the Schema with the name Candidate.
module.exports = mongoose.model("Candidate", candidateSchema);
