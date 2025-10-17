"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayInterviewCandidate = exports.sendInterviewNotes = exports.sendInterviewLink = exports.getTodayInterview = exports.updateRescheduleInterview = exports.getreschedule = exports.rescheduleInterview = exports.scheduleInterview = void 0;
const userService_1 = require("../services/userService");
const applicationService_1 = require("../services/applicationService");
const apiError_1 = require("../utils/apiError");
const interviewService_1 = require("../services/interviewService");
const rescheduleService_1 = require("../services/rescheduleService");
const crypto_1 = __importDefault(require("crypto"));
const sendInterviewEmail_1 = require("../utils/mail/sendInterviewEmail");
const sendRoomLink_1 = require("../utils/mail/sendRoomLink");
const jobService_1 = require("../services/jobService");
const interview_1 = require("../entity/interview");
const scheduleInterview = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const interviewer = await (0, userService_1.getUserById)(userId);
        const { candidateId, jobId, scheduledAt, applicationId } = req.body;
        const newDate = new Date(scheduledAt);
        const now = new Date();
        if (newDate.getTime() < now.getTime()) {
            throw new apiError_1.ApiError("Time is in the past");
        }
        const interviewTime = await (0, interviewService_1.getInterviewTime)(scheduledAt);
        if (interviewTime && interviewTime.length > 0) {
            throw new apiError_1.ApiError("Another candidate has the same interview time", 400);
        }
        const candidate = await (0, userService_1.getUserById)(candidateId);
        const application = await (0, applicationService_1.getApplicationByApplicationId)(applicationId);
        const job = await (0, jobService_1.getJobById)(jobId);
        if (!candidate) {
            throw new apiError_1.ApiError("Candidate not found", 404);
        }
        if (!job) {
            throw new apiError_1.ApiError("Job not found", 404);
        }
        await (0, sendInterviewEmail_1.sendInterviewEmail)(candidate.email, `${candidate.firstName} ${candidate.lastName}`, job.title, scheduledAt);
        const interview = await (0, interviewService_1.interviewCreateService)(application, interviewer, scheduledAt);
        const updatedStatus = await (0, applicationService_1.updateAppStatus)(application, "scheduled");
        res.status(200).json({
            success: true,
            message: "Interview schedulled successfully",
            interview,
            updatedStatus
        });
    }
    catch (error) {
        next(error);
    }
};
exports.scheduleInterview = scheduleInterview;
const rescheduleInterview = async (req, res, next) => {
    try {
        const { user, appId, reason, newDate } = req.body;
        const interview = await (0, interviewService_1.getInterviewByApplicationId)(appId);
        if (!interview) {
            throw new apiError_1.ApiError("Interview not found", 404);
        }
        // Block if interview is finished
        if ([interview_1.InterviewStatus.COMPLETED, interview_1.InterviewStatus.CANCELLED].includes(interview.status)) {
            throw new apiError_1.ApiError("Interview cannot be rescheduled as it is finished or cancelled");
        }
        const newChangedDate = new Date(newDate);
        const now = new Date();
        if (newChangedDate.getTime() < now.getTime()) {
            throw new apiError_1.ApiError("New date cannot be in the past");
        }
        const reshedule = await (0, rescheduleService_1.rescheduleInterviewService)(user, interview, reason, newChangedDate);
        if (!reshedule) {
            throw new apiError_1.ApiError("Failed to reschedule", 400);
        }
        res.status(200).json({
            success: true,
            message: "Interview rescheduled successfully",
            reshedule,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.rescheduleInterview = rescheduleInterview;
const getreschedule = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const reschedule = await (0, rescheduleService_1.getRescheduleByUserId)(userId);
        if (!reschedule) {
            throw new apiError_1.ApiError("Not Found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            reschedule
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getreschedule = getreschedule;
const updateRescheduleInterview = async (req, res, next) => {
    try {
        const { interviewId, dateTime, status, rescheduleId } = req.body;
        const reschedule = await (0, rescheduleService_1.getRescheduleById)(rescheduleId);
        const interview = await (0, interviewService_1.getInterviewById)(interviewId);
        if (!interview) {
            throw new apiError_1.ApiError("Interview not Found", 404);
        }
        if (!reschedule) {
            throw new apiError_1.ApiError("Reschedule not found", 404);
        }
        const updatedReschedule = await (0, rescheduleService_1.updateRescheduleStatus)(reschedule, status);
        const udpatedInterview = await (0, interviewService_1.updateInterview)(interview, dateTime);
        if (!updatedReschedule) {
            throw new apiError_1.ApiError("Not changed", 400);
        }
        if (!udpatedInterview) {
            throw new apiError_1.ApiError("Not Changed ", 400);
        }
        const result = {
            udpatedInterview,
            updatedReschedule
        };
        res.status(200).json({
            success: true,
            message: "Interview time changed successfully",
            result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateRescheduleInterview = updateRescheduleInterview;
const getTodayInterview = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const todayInterview = await (0, interviewService_1.getTodaysInterviewByCompanyId)(userId);
        if (!todayInterview) {
            throw new apiError_1.ApiError("No interviews for today");
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            todayInterview
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTodayInterview = getTodayInterview;
const sendInterviewLink = async (req, res, next) => {
    try {
        const { email, candidateName, jobTitle, interviewId } = req.body;
        if (!email) {
            throw new apiError_1.ApiError("Email is required", 400);
        }
        if (!candidateName || !jobTitle) {
            throw new apiError_1.ApiError("Candidate name and  job title are required,", 400);
        }
        const interview = await (0, interviewService_1.getInterviewById)(interviewId);
        if (!interview) {
            throw new apiError_1.ApiError("Interview not found", 404);
        }
        if (interview.status != 'scheduled') {
            throw new apiError_1.ApiError("Interview over cant send");
        }
        // 1️⃣ Generate unique room ID
        const roomId = crypto_1.default.randomBytes(6).toString("hex");
        const link = `http://localhost:5173/video/room/${roomId}`;
        // 2️⃣ Send the WebRTC room link via email
        await (0, sendRoomLink_1.sendRoomLink)({
            candidateEmail: email,
            candidateName,
            jobTitle,
            roomLink: link,
        });
        const handleInterview = await (0, interviewService_1.interviewLinkSave)(interview, link);
        if (!handleInterview) {
            throw new apiError_1.ApiError("Link not saved to db", 400);
        }
        // 3️⃣ Return success response
        res.status(200).json({
            success: true,
            message: "Video room link sent successfully",
            handleInterview
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.sendInterviewLink = sendInterviewLink;
const sendInterviewNotes = async (req, res, next) => {
    try {
        const { roomId, notes } = req.body;
        const interview = await (0, interviewService_1.getInterviewByRoomId)(roomId);
        if (!interview) {
            throw new apiError_1.ApiError("Interview not found", 404);
        }
        const udpatedInterview = await (0, interviewService_1.sendInterviewNotesService)(interview, notes);
        res.status(200).json({
            success: true,
            message: "notes uploaded successfully",
            udpatedInterview
        });
    }
    catch (error) {
        next(error);
    }
};
exports.sendInterviewNotes = sendInterviewNotes;
const getTodayInterviewCandidate = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const todayInterview = await (0, interviewService_1.getTodaysInterviewByCandidateId)(userId);
        if (!todayInterview) {
            throw new apiError_1.ApiError("No interviews for today");
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            todayInterview
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getTodayInterviewCandidate = getTodayInterviewCandidate;
