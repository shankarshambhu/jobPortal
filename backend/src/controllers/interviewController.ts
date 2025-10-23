import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserById } from "../services/userService";
import { getApplicationByApplicationId, updateAppStatus } from "../services/applicationService";
import { ApiError } from "../utils/apiError";
import { changeInterviewStatus, getInterviewByApplicationId, getInterviewByCandidateId, getInterviewById, getInterviewByRoomId, getInterviewTime, getTodaysInterviewByCandidateId, getTodaysInterviewByCompanyId, interviewCreateService, interviewLinkSave, sendInterviewNotesService, updateInterview } from "../services/interviewService";
import { getRescheduleById, getRescheduleByUserId, rescheduleInterviewService, updateRescheduleStatus } from "../services/rescheduleService";
import crypto from 'crypto';
import { sendInterviewEmail } from "../utils/mail/sendInterviewEmail";
import { sendRoomLink } from "../utils/mail/sendRoomLink";
import { getJobById } from "../services/jobService";
import { InterviewStatus } from "../entity/interview";
import { Between } from "typeorm";


export const scheduleInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {


        const { userId } = req.user!;

        const interviewer = await getUserById(userId);
        const { candidateId, jobId, scheduledAt, applicationId } = req.body;

        const newDate = new Date(scheduledAt);
        const now = new Date();

        if (newDate.getTime() < now.getTime()) {
            throw new ApiError("Time is in the past");
        }
        const interviewTime = await getInterviewTime(scheduledAt);

        if (interviewTime && interviewTime.length > 0) {
            throw new ApiError("Another candidate has the same interview time", 400);
        }


        const candidate = await getUserById(candidateId);
        const application = await getApplicationByApplicationId(applicationId);
        const job = await getJobById(jobId);

        if (!candidate) {
            throw new ApiError("Candidate not found", 404);
        }

        if (!job) {
            throw new ApiError("Job not found", 404);
        }

        await sendInterviewEmail(
            candidate.email,
            `${candidate.firstName} ${candidate.lastName}`,
            job.title,
            scheduledAt
        )
        const interview = await interviewCreateService(application!, interviewer!, scheduledAt)
        const updatedStatus = await updateAppStatus(application!, "scheduled");
        res.status(200).json({
            success: true,
            message: "Interview schedulled successfully",
            interview,
            updatedStatus
        })

    } catch (error) {
        next(error);

    }

}

export const rescheduleInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { user, appId, reason, newDate } = req.body;
        const interview = await getInterviewByApplicationId(appId);

        if (!interview) {
            throw new ApiError("Interview not found", 404);
        }
        if (interview.roomLink) {
            throw new ApiError("Interview link already send", 400);
        }

        // Block if interview is finished
        if ([InterviewStatus.COMPLETED, InterviewStatus.CANCELLED].includes(interview.status)) {
            throw new ApiError("Interview cannot be rescheduled as it is finished or cancelled");
        }

        const newChangedDate = new Date(newDate);
        const now = new Date();


        if (newChangedDate.getTime() < now.getTime()) {
            throw new ApiError("New date cannot be in the past");
        }

        const reshedule = await rescheduleInterviewService(user, interview, reason, newChangedDate);
        if (!reshedule) {
            throw new ApiError("Failed to reschedule", 400);
        }

        res.status(200).json({
            success: true,
            message: "Interview rescheduled successfully",
            reshedule,
        });
    } catch (error) {
        next(error);
    }
};



export const getreschedule = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const reschedule = await getRescheduleByUserId(userId);
        if (!reschedule) {
            throw new ApiError("Not Found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            reschedule
        })

    } catch (error) {
        next(error);
    }

}

export const updateRescheduleInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { interviewId, dateTime, status, rescheduleId } = req.body;
        const reschedule = await getRescheduleById(rescheduleId);
        const interview = await getInterviewById(interviewId);
        if (!interview) {
            throw new ApiError("Interview not Found", 404);
        }
        if (!reschedule) {
            throw new ApiError("Reschedule not found", 404);
        }
        const updatedReschedule = await updateRescheduleStatus(reschedule, status);
        const udpatedInterview = await updateInterview(interview, dateTime);
        if (!updatedReschedule) {
            throw new ApiError("Not changed", 400);
        }
        if (!udpatedInterview) {
            throw new ApiError("Not Changed ", 400);
        }
        const result = {
            udpatedInterview,
            updatedReschedule
        }
        res.status(200).json({
            success: true,
            message: "Interview time changed successfully",
            result

        })

    } catch (error) {

        next(error)
    }

}

export const getTodayInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const todayInterview = await getTodaysInterviewByCompanyId(userId);

        if (!todayInterview) {
            throw new ApiError("No interviews for today");
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            todayInterview
        })

    } catch (error) {
        next(error)

    }

}


export const sendInterviewLink = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { email, candidateName, jobTitle, interviewId } = req.body;

        if (!email) {
            throw new ApiError("Email is required", 400);
        }

        if (!candidateName || !jobTitle) {
            throw new ApiError("Candidate name and  job title are required,", 400);
        }
        const interview = await getInterviewById(interviewId);
        if (!interview) {
            throw new ApiError("Interview not found", 404);
        }
        if (interview.status != 'scheduled') {
            throw new ApiError("Interview over cant send")
        }

        // 1️⃣ Generate unique room ID
        const frontendurl = process.env.FRONTEND_URL;
        const roomId = crypto.randomBytes(6).toString("hex");
        const link = `${frontendurl}/video/room/${roomId}`;

        // 2️⃣ Send the WebRTC room link via email
        await sendRoomLink({
            candidateEmail: email,
            candidateName,
            jobTitle,
            roomLink: link,
        });

        const handleInterview = await interviewLinkSave(interview, link);
        if (!handleInterview) {
            throw new ApiError("Link not saved to db", 400);
        }


        // 3️⃣ Return success response
        res.status(200).json({
            success: true,
            message: "Video room link sent successfully",
            handleInterview
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const sendInterviewNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { roomId, notes } = req.body;
        const interview = await getInterviewByRoomId(roomId);
        if (!interview) {   
            throw new ApiError("Interview not found", 404);
        }
        const udpatedInterview = await sendInterviewNotesService(interview, notes);
        res.status(200).json({
            success: true,
            message: "notes uploaded successfully",
            udpatedInterview

        })

    } catch (error) {
        next(error);

    }

}


export const getTodayInterviewCandidate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const todayInterview = await getTodaysInterviewByCandidateId(userId);

        if (!todayInterview) {
            throw new ApiError("No interviews for today");
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            todayInterview
        })

    } catch (error) {
        next(error)

    }
}


export const finishInterview = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const roomId = req.params.id;
        const interview = await getInterviewByRoomId(roomId);
        if (!interview) {
            throw new ApiError("Interview not found", 404);
        }
        const updatedInterview = await changeInterviewStatus(interview);
        if (!updatedInterview) {
            throw new ApiError("interview status not changed");
        }
        res.status(200).json({
            success: true,
            message: "Changed successfully",
            updatedInterview
        })
    } catch (error) {
        next(error)
    }

}


export const checkRoomAccess = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId, role } = req.user!;
        const roomId = req.params.id;

        if (role === "company") {
            return res.status(200).json({
                success: true,
                message: "Company has access",
            });
        }

        const interview = await getInterviewByCandidateId(userId);
        const storedRoomId = interview?.roomLink?.split("/").pop();

        if (storedRoomId !== roomId) {
            throw new ApiError("You don't have access to this room", 404);
        }

        res.status(200).json({
            success: true,
            message: "You have access",
        });

    } catch (error) {
        next(error);
    }
};
