const Candidate = require('../models/candidate')
const { StatusCodes } = require("http-status-codes");

const createCandidate = async (req, res) => {
    try {
        const newCandidateData = await new Candidate(req?.body).save();
        res.status(StatusCodes.CREATED).json(({
            success: true,
            data: newCandidateData
        }))

    } catch (error) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in creating the Candidate",
            success: false,
            err: error.message,
        });
    }
}

module.exports = { createCandidate }
