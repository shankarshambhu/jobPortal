"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateDetailById = exports.getCandidateProfileById = exports.getAllCandidate = void 0;
const candidateProfile_1 = require("../entity/candidateProfile");
const getAllCandidate = async () => {
    try {
        return await candidateProfile_1.CandidateProfile.find({
            relations: ['user'],
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllCandidate = getAllCandidate;
const getCandidateProfileById = async (userId) => {
    try {
        return await candidateProfile_1.CandidateProfile.findOne({ where: { user: { id: userId } } });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getCandidateProfileById = getCandidateProfileById;
const getCandidateDetailById = async (userId) => {
    try {
        return await candidateProfile_1.CandidateProfile.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getCandidateDetailById = getCandidateDetailById;
