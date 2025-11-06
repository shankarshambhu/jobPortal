import { number } from "joi";
import { Application } from "../entity/application";
import { Interview, InterviewStatus } from "../entity/interview";
import { Job } from "../entity/job";
import { Reschedule } from "../entity/reshedule";
import { User } from "../entity/user";
import { Between, Not } from "typeorm";
import { stat } from "fs";

export const interviewCreateService = async (application: Application, interviewer: User, scheduledAt: any) => {
    try {
        const newInterview = new Interview();
        newInterview.scheduledAt = scheduledAt;
        newInterview.application = application;
        newInterview.interviewer = interviewer;
        return await newInterview.save();

    } catch (error) {
        console.log(error);
        throw error


    }

}


export const getInterviewByApplicationId = async (appId: number) => {
    try {
        return await Interview.findOne({ where: { application: { id: appId } } })

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getInterviewById = async (interviewId: number) => {
    try {
        return await Interview.findOne({ where: { id: interviewId } })

    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const updateInterview = async (interview: Interview, dateTime: Date) => {
    try {
        interview.scheduledAt = dateTime;
        await interview.save();
        return interview;
    } catch (error) {
        console.error("Failed to update interview:", error);
        throw error;

    }

}

export const getTodaysInterviewByCompanyId = async (userId: number) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0); // today 00:00:00

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // today 23:59:59

        return await Interview.find({
            where: {
                interviewer: { id: userId },
                scheduledAt: Between(startOfDay, endOfDay),
                status: Not(InterviewStatus.COMPLETED),
            },
            relations: ["application", "application.user", "application.job"], // optional, if you want related data
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getTodaysInterviewByCandidateId = async (userId: number) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today);
        startOfDay.setHours(0, 0, 0, 0); // today 00:00:00

        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // today 23:59:59

        return await Interview.find({
            where: {
                application: { user: { id: userId } },
                scheduledAt: Between(startOfDay, endOfDay),

            },
            relations: ["application", "application.user", "application.job", "interviewer.companyProfile"],
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const interviewLinkSave = async (interview: Interview, link: string) => {
    try {
        interview.roomLink = link;
        await interview.save();  
        return interview;
    } catch (error) {
        console.error("Failed to save interview link:", error);
        throw error;
    }
};

export const getInterviewByRoomId = async (roomId: string) => {
    try {
        const frontendurl = process.env.FRONTEND_URL
        const roomLink = `${frontendurl}/video/room/${roomId}`;
        return await Interview.findOne({ where: { roomLink } });

    } catch (error) {
        console.log(error);
        throw error;
    }

}
export const sendInterviewNotesService = async (interview: Interview, notes: string) => {
    try {
        interview.notes = notes;
        return await interview.save();

    } catch (error) {
        console.log(error);
        throw error;
    }

}


export const getInterviewByCandidateId = async (userId: number) => {
    try {
        return await Interview.findOne({ where: { application: { user: { id: userId } } } });
    } catch (error) {
        console.log(error);
        throw error
    }

}


export const getInterviewTime = async (scheduledAt: Date) => {
    try {
        const start = new Date(scheduledAt);
        start.setSeconds(0, 0); // remove seconds and milliseconds

        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 59); // assume 1-hour slot

        return await Interview.find({
            where: {
                scheduledAt: Between(start, end),
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const changeInterviewStatus = async (interview: Interview) => {
    try {
        const status = "completed"
        interview.status = status as InterviewStatus;
        interview.roomLink = null;
        return await interview.save();

    } catch (error) {
        console.log(error);
        throw error
    }

}



