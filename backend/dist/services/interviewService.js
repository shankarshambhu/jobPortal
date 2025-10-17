"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterviewTime = exports.getInterviewByCandidateId = exports.sendInterviewNotesService = exports.getInterviewByRoomId = exports.interviewLinkSave = exports.getTodaysInterviewByCandidateId = exports.getTodaysInterviewByCompanyId = exports.updateInterview = exports.getInterviewById = exports.getInterviewByApplicationId = exports.interviewCreateService = void 0;
const interview_1 = require("../entity/interview");
const typeorm_1 = require("typeorm");
const interviewCreateService = async (application, interviewer, scheduledAt) => {
    try {
        const newInterview = new interview_1.Interview();
        newInterview.scheduledAt = scheduledAt;
        newInterview.application = application;
        newInterview.interviewer = interviewer;
        return await newInterview.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.interviewCreateService = interviewCreateService;
const getInterviewByApplicationId = async (appId) => {
    try {
        return await interview_1.Interview.findOne({ where: { application: { id: appId } } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getInterviewByApplicationId = getInterviewByApplicationId;
const getInterviewById = async (interviewId) => {
    try {
        return await interview_1.Interview.findOne({ where: { id: interviewId } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getInterviewById = getInterviewById;
const updateInterview = async (interview, dateTime) => {
    try {
        interview.scheduledAt = dateTime;
        await interview.save();
        return interview;
    }
    catch (error) {
        console.error("Failed to update interview:", error);
        throw error;
    }
};
exports.updateInterview = updateInterview;
const getTodaysInterviewByCompanyId = async (userId) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0); // today 00:00:00
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // today 23:59:59
        return await interview_1.Interview.find({
            where: {
                interviewer: { id: userId },
                scheduledAt: (0, typeorm_1.Between)(startOfDay, endOfDay),
            },
            relations: ["application", "application.user", "application.job"], // optional, if you want related data
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getTodaysInterviewByCompanyId = getTodaysInterviewByCompanyId;
const getTodaysInterviewByCandidateId = async (userId) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0); // today 00:00:00
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // today 23:59:59
        return await interview_1.Interview.find({
            where: {
                application: { user: { id: userId } },
                scheduledAt: (0, typeorm_1.Between)(startOfDay, endOfDay),
            },
            relations: ["application", "application.user", "application.job", "interviewer.companyProfile"],
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getTodaysInterviewByCandidateId = getTodaysInterviewByCandidateId;
const interviewLinkSave = async (interview, link) => {
    try {
        interview.roomLink = link;
        await interview.save(); //
        return interview;
    }
    catch (error) {
        console.error("Failed to save interview link:", error);
        throw error;
    }
};
exports.interviewLinkSave = interviewLinkSave;
const getInterviewByRoomId = async (roomId) => {
    try {
        const frontendurl = process.env.FRONTEND_URL;
        const roomLink = `${frontendurl}/video/room/${roomId}`;
        return await interview_1.Interview.findOne({ where: { roomLink } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getInterviewByRoomId = getInterviewByRoomId;
const sendInterviewNotesService = async (interview, notes) => {
    try {
        interview.notes = notes;
        return await interview.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.sendInterviewNotesService = sendInterviewNotesService;
const getInterviewByCandidateId = async (userId) => {
    try {
        return await interview_1.Interview.find({ where: { application: { user: { id: userId } } } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getInterviewByCandidateId = getInterviewByCandidateId;
const getInterviewTime = async (scheduledAt) => {
    try {
        const start = new Date(scheduledAt);
        start.setSeconds(0, 0); // remove seconds and milliseconds
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 59); // assume 1-hour slot
        return await interview_1.Interview.find({
            where: {
                scheduledAt: (0, typeorm_1.Between)(start, end),
            },
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getInterviewTime = getInterviewTime;
