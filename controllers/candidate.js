const Candidate = require('../models/candidate')
const { StatusCodes } = require("http-status-codes");

const createCandidate = async (req, res) => {
    console.log(req.body)
    try {
        const newCandidateData = await new Candidate(req?.body).save();
        res.status(StatusCodes.CREATED).json(({
            success: true,
            data: newCandidateData
        }))

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in creating the Candidate",
            success: false,
            err: error.message,
        });
    }
}

const getAllCandidates = async (req, res) => {
    try {
        const candidateData = await Candidate.find({ isDeleted: false })

        res.status(StatusCodes.OK).json(({
            success: true,
            data: candidateData
        }))

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in getting the Candidate Data",
            success: false,
            err: error.message,
        });
    }
}

const editCandidateData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCandidateData = await Candidate.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        );
        res.status(StatusCodes.OK).json(({
            success: true,
            data: updatedCandidateData
        }))

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in updating the Candidate",
            success: false,
            err: error.message,
        });
    }
}

const getCandidateById = async (req, res) => {
    try {

        const { id } = req.params;
        const candidateData = await Candidate.findOne({ _id: id });

        res.status(StatusCodes.OK).json(({
            success: true,
            data: candidateData
        }))

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error in getting the Candidate Data",
            success: false,
            err: error.message,
        });
    }
}

module.exports = { createCandidate, getAllCandidates, editCandidateData, getCandidateById }
