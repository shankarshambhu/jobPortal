"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppStatus = exports.getApplicationByApplicationId = exports.getApplicationsByJobId = exports.getAllApplicationServiceCandidate = exports.getAllApplicationServiceCompany = exports.createApplicationService = void 0;
const application_1 = require("../entity/application");
const createApplicationService = async (payload, user, job) => {
    try {
        const { coverLetter } = payload;
        const newApplication = new application_1.Application();
        newApplication.coverLetter = coverLetter;
        newApplication.user = user;
        newApplication.job = job;
        return await newApplication.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createApplicationService = createApplicationService;
const getAllApplicationServiceCompany = async (userId) => {
    try {
        return await application_1.Application.find({ where: { user: { id: userId } }, relations: ['job', 'user', 'job.user', 'user.candidateProfile', 'job.user.companyProfile'] });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllApplicationServiceCompany = getAllApplicationServiceCompany;
const getAllApplicationServiceCandidate = async (userId) => {
    try {
        return await application_1.Application.find({ where: { user: { id: userId } }, relations: ['job', 'user', 'job.user', 'user.candidateProfile'] });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllApplicationServiceCandidate = getAllApplicationServiceCandidate;
const getApplicationsByJobId = async (jobId) => {
    try {
        return await application_1.Application.find({
            where: { job: { id: jobId } },
            relations: ["job", "user", "user.candidateProfile"],
            order: { appliedAt: "DESC" },
        });
    }
    catch (error) {
        console.error("Error fetching applications by job ID:", error);
        throw error;
    }
};
exports.getApplicationsByJobId = getApplicationsByJobId;
const getApplicationByApplicationId = async (appId) => {
    try {
        return await application_1.Application.findOne({ where: { id: appId }, relations: ["user"] });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getApplicationByApplicationId = getApplicationByApplicationId;
const updateAppStatus = async (application, status) => {
    try {
        application.status = status;
        await application.save();
        return application;
    }
    catch (error) {
        console.error("Error updating application status:", error);
        throw error;
    }
};
exports.updateAppStatus = updateAppStatus;
