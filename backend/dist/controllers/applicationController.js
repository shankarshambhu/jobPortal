"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApplicationStatus = exports.getApplicationTrends = exports.updateApplicationStatus = exports.getCandidateJobApplication = exports.getCandidateApplication = exports.getAllApplicationCompany = exports.createApplication = void 0;
const apiError_1 = require("../utils/apiError");
const userService_1 = require("../services/userService");
const applicationService_1 = require("../services/applicationService");
const application_1 = require("../entity/application");
const jobService_1 = require("../services/jobService");
const interviewService_1 = require("../services/interviewService");
const interview_1 = require("../entity/interview");
const createApplication = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const user = await (0, userService_1.getUserById)(userId);
        const jobId = Number(req.params.id);
        const job = await (0, jobService_1.getJobById)(jobId);
        if (!job)
            throw new apiError_1.ApiError("Job not found", 404);
        // Prevent duplicate applications
        const existingApp = await application_1.Application.findOne({
            where: { user: { id: userId }, job: { id: job.id } },
        });
        if (existingApp) {
            throw new apiError_1.ApiError("You have already applied for this job", 400);
        }
        const application = await (0, applicationService_1.createApplicationService)(req.body, user, job);
        res.status(200).json({
            success: true,
            message: "Application created successfully",
            application,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createApplication = createApplication;
const getAllApplicationCompany = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const applications = await (0, applicationService_1.getAllApplicationServiceCompany)(userId);
        if (!applications || applications.length === 0) {
            throw new apiError_1.ApiError("Applications not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "applications fetched successfully",
            applications
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllApplicationCompany = getAllApplicationCompany;
const getCandidateApplication = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const application = await (0, applicationService_1.getAllApplicationServiceCandidate)(userId);
        if (!application) {
            throw new apiError_1.ApiError("Not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            application
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidateApplication = getCandidateApplication;
const getCandidateJobApplication = async (req, res, next) => {
    try {
        const jobId = Number(req.params.id);
        const job = await (0, jobService_1.getJobById)(jobId);
        if (!job) {
            throw new apiError_1.ApiError("Job not found", 404);
        }
        const application = await (0, applicationService_1.getApplicationsByJobId)(job.id);
        if (!application) {
            throw new apiError_1.ApiError("Application not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched successfuly",
            application
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidateJobApplication = getCandidateJobApplication;
const updateApplicationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const applicationId = Number(req.params.id);
        const interview = await (0, interviewService_1.getInterviewByApplicationId)(applicationId);
        if (interview && ![interview_1.InterviewStatus.COMPLETED, interview_1.InterviewStatus.CANCELLED].includes(interview.status)) {
            throw new apiError_1.ApiError("Interview is not finished");
        }
        const application = await (0, applicationService_1.getApplicationByApplicationId)(applicationId);
        if (!application) {
            throw new apiError_1.ApiError("No Application Found", 404);
        }
        const updatedApp = await (0, applicationService_1.updateAppStatus)(application, status);
        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application: updatedApp,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateApplicationStatus = updateApplicationStatus;
const getApplicationTrends = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const applications = await (0, applicationService_1.getAllApplicationServiceCandidate)(userId);
        if (!applications || applications.length === 0) {
            throw new apiError_1.ApiError("Application not found", 404);
        }
        // Aggregate applications per month
        const trends = {};
        applications.forEach(app => {
            const date = new Date(app.appliedAt); // Convert timestamp to JS Date
            const month = date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g., "Oct 2025"
            trends[month] = (trends[month] || 0) + 1;
        });
        // Convert object to array for frontend
        const trendsArray = Object.entries(trends)
            .map(([month, count]) => ({ month, count }))
            // Optional: sort by date ascending
            .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
        // Send response
        res.status(200).json({
            success: true,
            message: "Application trends fetched successfully",
            result: trendsArray
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getApplicationTrends = getApplicationTrends;
const getApplicationStatus = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const applications = await application_1.Application.find({
            where: { user: { id: userId } },
        });
        if (!applications) {
            throw new apiError_1.ApiError("Applciation not found", 404);
        }
        const statusCount = {};
        applications.forEach(app => {
            statusCount[app.status] = (statusCount[app.status] || 0) + 1;
        });
        const result = Object.entries(statusCount).map(([status, count]) => ({ status, count }));
        res.status(200).json({
            success: true,
            message: "Application status fetched successfully",
            result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getApplicationStatus = getApplicationStatus;
