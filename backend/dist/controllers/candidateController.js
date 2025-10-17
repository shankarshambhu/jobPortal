"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidateStats = exports.getCandidate = exports.editProfile = exports.createProfile = void 0;
const apiError_1 = require("../utils/apiError");
const profileService_1 = require("../services/profileService");
const candidateService_1 = require("../services/candidateService");
const userService_1 = require("../services/userService");
const applicationService_1 = require("../services/applicationService");
const interviewService_1 = require("../services/interviewService");
const createProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const found = await (0, candidateService_1.getCandidateProfileById)(userId);
        if (found) {
            throw new apiError_1.ApiError("Profile already exists", 409);
        }
        const user = await (0, userService_1.getUserById)(userId);
        if (!user) {
            throw new apiError_1.ApiError("User not found", 404);
        }
        const profile = await (0, profileService_1.candidateProfileService)(req.body, user);
        res.status(200).json({
            success: true,
            message: "profile created successfully",
            profile
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProfile = createProfile;
const editProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { firstName, lastName, age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number } = req.body;
        const userProfile = {
            firstName,
            lastName
        };
        const candidateProfile = {
            age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number
        };
        const candidate = await (0, candidateService_1.getCandidateProfileById)(userId);
        const user = await (0, userService_1.getUserById)(userId);
        if (!user) {
            throw new apiError_1.ApiError("User not found", 404);
        }
        if (!candidate) {
            throw new apiError_1.ApiError("Proflie not made", 404);
        }
        await (0, userService_1.editUser)(userProfile, user);
        const updatedProfile = await (0, profileService_1.editCandidateProfile)(candidate, candidateProfile);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editProfile = editProfile;
const getCandidate = async (req, res, next) => {
    try {
        const { userId } = req.user;
        let candidates;
        if (userId) {
            const user = await (0, candidateService_1.getCandidateDetailById)(userId);
            if (!user)
                throw new apiError_1.ApiError("Candidate Details not Found", 404);
            candidates = [user]; // wrap in array to reuse mapping
        }
        else {
            candidates = await (0, candidateService_1.getAllCandidate)();
            if (!candidates || candidates.length === 0) {
                throw new apiError_1.ApiError("Candidate Details not Found", 404);
            }
        }
        const result = candidates.map(candidate => ({
            id: candidate.id,
            age: candidate.age,
            address: candidate.address,
            skills: candidate.skills,
            experienceYears: candidate.experienceYears,
            resume: candidate.resume,
            gender: candidate.gender,
            date_of_birth: candidate.date_of_birth,
            phone_number: candidate.phone_number,
            firstName: candidate.user.firstName,
            lastName: candidate.user.lastName,
            email: candidate.user.email,
            role: candidate.user.role,
            userId: candidate.user.id,
            date: candidate.user.date
        }));
        res.status(200).json({
            success: true,
            message: "Candidate details fetched successfully",
            result: userId ? result[0] : result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidate = getCandidate;
const getCandidateStats = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const candidate = await (0, userService_1.getUserById)(userId);
        if (!candidate) {
            throw new apiError_1.ApiError("Candidate not found", 404);
        }
        const application = await (0, applicationService_1.getAllApplicationServiceCandidate)(userId);
        const interview = await (0, interviewService_1.getInterviewByCandidateId)(userId);
        if (!interview || interview.length === 0) {
            throw new apiError_1.ApiError("Interview not found", 404);
        }
        if (!application || application.length === 0) {
            throw new apiError_1.ApiError("Application not found", 404);
        }
        const result = {
            application,
            interview
        };
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidateStats = getCandidateStats;
