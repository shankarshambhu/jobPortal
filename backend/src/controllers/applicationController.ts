import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiError } from "../utils/apiError";
import { getUserById } from "../services/userService";
import { createApplicationService, getAllApplicationServiceCandidate, getAllApplicationServiceCompany, getApplicationByApplicationId, getApplicationsByJobId, updateAppStatus, } from "../services/applicationService";
import { Application } from "../entity/application";
import { v4 as uuidv4 } from "uuid";
import { getJobById } from "../services/jobService";
import { getInterviewByApplicationId } from "../services/interviewService";
import { InterviewStatus } from "../entity/interview";


export const createApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const user = await getUserById(userId);
        const jobId = Number(req.params.id);

        const job = await getJobById(jobId);
        if (!job) throw new ApiError("Job not found", 404);

        // Prevent duplicate applications
        const existingApp = await Application.findOne({
            where: { user: { id: userId }, job: { id: job.id } },
        });
        if (existingApp) {
            throw new ApiError("You have already applied for this job", 400);
        }

        const application = await createApplicationService(req.body, user!, job);

        res.status(200).json({
            success: true,
            message: "Application created successfully",
            application,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllApplicationCompany = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const applications = await getAllApplicationServiceCompany(userId);
        if (!applications || applications.length === 0) {
            throw new ApiError("Applications not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "applications fetched successfully",
            applications
        })

    } catch (error) {
        next(error)

    }
}
export const getCandidateApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const application = await getAllApplicationServiceCandidate(userId);
        if (!application) {
            throw new ApiError("Not found", 404);
        }

        res.status(200).json({
            success: true,
            message: "fetched successfully",
            application
        })
    } catch (error) {
        next(error)

    }

}

export const getCandidateJobApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {

        const jobId = Number(req.params.id);
        const job = await getJobById(jobId);
        if (!job) {
            throw new ApiError("Job not found", 404);
        }
        const application = await getApplicationsByJobId(job.id);
        if (!application) {
            throw new ApiError("Application not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "fetched successfuly",
            application
        })

    } catch (error) {
        next(error);

    }
}


export const updateApplicationStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        const applicationId = Number(req.params.id);
        const interview = await getInterviewByApplicationId(applicationId);
        if (interview && ![InterviewStatus.COMPLETED, InterviewStatus.CANCELLED].includes(interview.status)) {
            throw new ApiError("Interview is not finished");
        }

        const application = await getApplicationByApplicationId(applicationId);
        if (!application) {
            throw new ApiError("No Application Found", 404);
        }
        const updatedApp = await updateAppStatus(application, status);
        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application: updatedApp,
        });


    } catch (error) {
        next(error);

    }

}

export const getApplicationTrends = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const applications = await getAllApplicationServiceCandidate(userId);

        if (!applications || applications.length === 0) {
            throw new ApiError("Application not found", 404);
        }

        // Aggregate applications per month
        const trends: Record<string, number> = {};
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

    } catch (error) {
        next(error);
    }
};


export const getApplicationStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const applications = await Application.find({
            where: { user: { id: userId } },
        });
        if (!applications) {
            throw new ApiError("Applciation not found", 404);
        }
        const statusCount: Record<string, number> = {};
        applications.forEach(app => {
            statusCount[app.status] = (statusCount[app.status] || 0) + 1;
        });
        const result = Object.entries(statusCount).map(([status, count]) => ({ status, count }));
        res.status(200).json({
            success: true,
            message: "Application status fetched successfully",
            result
        });
    } catch (error) {
        next(error)

    }
}


export const getUserApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const application = await getAllApplicationServiceCandidate(userId);
        if (!application) {
            throw new ApiError("Application not found", 404)
        }
        res.status(200).json({
            success: true,
            message: "Fetched successfully",
            application
        })


    } catch (error) {
        next(error)

    }

}