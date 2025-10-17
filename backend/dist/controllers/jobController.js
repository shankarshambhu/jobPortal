"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsMatch = exports.getJob = exports.getAllJob = exports.jobEdit = exports.jobCreate = void 0;
const companyService_1 = require("../services/companyService");
const apiError_1 = require("../utils/apiError");
const jobService_1 = require("../services/jobService");
const userService_1 = require("../services/userService");
const application_1 = require("../entity/application");
const jobCreate = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const company = await (0, companyService_1.getCompanyUser)(userId);
        if (!company) {
            throw new apiError_1.ApiError("No company found", 404);
        }
        const job = await (0, jobService_1.createJobService)(req.body, company);
        if (!job) {
            throw new apiError_1.ApiError("Not created", 400);
        }
        res.status(200).json({
            success: true,
            message: "job created successfully",
            job
        });
    }
    catch (error) {
        next(error);
    }
};
exports.jobCreate = jobCreate;
const jobEdit = async (req, res, next) => {
    try {
        const jobId = Number(req.params.id);
        const job = await (0, jobService_1.getJobById)(jobId);
        if (!job) {
            throw new apiError_1.ApiError("No Job found", 404);
        }
        const updatedJob = await (0, jobService_1.editJobService)(req.body, job);
        if (!updatedJob) {
            throw new apiError_1.ApiError("Not updated", 400);
        }
        res.status(200).json({
            success: true,
            message: "updated successfully",
            updatedJob
        });
    }
    catch (error) {
        next(error);
    }
};
exports.jobEdit = jobEdit;
const getAllJob = async (req, res, next) => {
    try {
        const jobs = await (0, jobService_1.getAllJobs)();
        if (!jobs) {
            throw new apiError_1.ApiError("Jobs not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "jobs fetched successfully",
            jobs
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllJob = getAllJob;
const getJob = async (req, res, next) => {
    try {
        const jobId = Number(req.params.id);
        const job = await (0, jobService_1.getJobById)(jobId);
        if (!job) {
            throw new apiError_1.ApiError("Job not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "job fetched",
            job
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getJob = getJob;
const skillsMatch = async (req, res, next) => {
    try {
        const { userId } = req.user;
        // 1. Get candidate profile
        const candidate = await (0, userService_1.getUserById)(userId);
        if (!candidate || !candidate.candidateProfile) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found",
                result: []
            });
        }
        // Original skills (for preserving proper casing)
        const candidateSkillsOriginal = candidate.candidateProfile.skills || [];
        const candidateSkills = candidateSkillsOriginal.map(s => s.toLowerCase());
        // Map lowercase -> original casing
        const skillMap = {};
        candidateSkillsOriginal.forEach(s => {
            skillMap[s.toLowerCase()] = s;
        });
        // 2. Get all applications with job details
        const applications = await application_1.Application.find({
            where: { user: { id: userId } },
            relations: ['job']
        });
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found",
                result: []
            });
        }
        // 3. Count skill matches (case-insensitive)
        const skillCounts = {};
        applications.forEach(app => {
            const jobSkills = (app.job.skills || []).map(s => s.toLowerCase());
            candidateSkills.forEach(skill => {
                if (jobSkills.includes(skill)) {
                    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
                }
            });
        });
        const totalJobs = applications.length;
        // 4. Build result with proper formatting
        const result = Object.entries(skillCounts).map(([skill, jobsCount]) => ({
            skill: skillMap[skill], // preserve original casing
            match: totalJobs > 0 ? Math.round((jobsCount / totalJobs) * 100) : 0,
            jobsCount,
            totalJobs
        }));
        // 5. Send response
        res.status(200).json({
            success: true,
            message: "Skill match fetched successfully",
            result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.skillsMatch = skillsMatch;
