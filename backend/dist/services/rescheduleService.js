"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRescheduleStatus = exports.getRescheduleById = exports.rescheduleInterviewService = exports.getRescheduleByUserId = void 0;
const reshedule_1 = require("../entity/reshedule");
const getRescheduleByUserId = async (userId) => {
    try {
        return await reshedule_1.Reschedule.find({
            where: { interview: { interviewer: { id: userId } } },
            relations: {
                candidate: true, // candidate info
                interview: {
                    application: {
                        job: true, // include job details
                    },
                    interviewer: true,
                },
            },
            order: { createdAt: "DESC" },
        });
    }
    catch (error) {
        console.error("Error fetching reschedules:", error);
        throw error;
    }
};
exports.getRescheduleByUserId = getRescheduleByUserId;
const rescheduleInterviewService = async (user, interview, reason, newDate) => {
    try {
        const newReschedule = new reshedule_1.Reschedule();
        newReschedule.reason = reason;
        newReschedule.newDateTime = newDate;
        newReschedule.candidate = user;
        newReschedule.interview = interview;
        return await newReschedule.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.rescheduleInterviewService = rescheduleInterviewService;
const getRescheduleById = async (id) => {
    try {
        return await reshedule_1.Reschedule.findOne({ where: { id } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getRescheduleById = getRescheduleById;
const updateRescheduleStatus = async (reschedule, status) => {
    try {
        reschedule.status = status;
        return await reschedule.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.updateRescheduleStatus = updateRescheduleStatus;
