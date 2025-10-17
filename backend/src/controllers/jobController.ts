import { NextFunction, Response } from "express";
import { AuthRequest, } from "../middlewares/auth.middleware";
import { getCompanyUser } from "../services/companyService";
import { ApiError } from "../utils/apiError";
import { createJobService, editJobService, getAllJobs, getJobById } from "../services/jobService";
import { getUserById } from "../services/userService";
import { Application } from "../entity/application";

export const jobCreate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const company = await getCompanyUser(userId);
        if (!company) {
            throw new ApiError("No company found", 404);
        }

        const job = await createJobService(req.body, company);
        if (!job) {
            throw new ApiError("Not created", 400);
        }
        res.status(200).json({
            success: true,
            message: "job created successfully",
            job

        })

    } catch (error) {
        next(error)

    }

}

export const jobEdit = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const jobId = Number(req.params.id);
        const job = await getJobById(jobId);
        if (!job) {
            throw new ApiError("No Job found", 404);
        }
        const updatedJob = await editJobService(req.body, job);
        if (!updatedJob) {
            throw new ApiError("Not updated", 400);
        }

        res.status(200).json({
            success: true,
            message: "updated successfully",
            updatedJob
        })


    } catch (error) {
        next(error)

    }

}


export const getAllJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const jobs = await getAllJobs();
        if (!jobs) {
            throw new ApiError("Jobs not found", 404)
        }
        res.status(200).json({
            success: true,
            message: "jobs fetched successfully",
            jobs
        })

    } catch (error) {
        next(error)

    }

}


export const getJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const jobId = Number(req.params.id);
        const job = await getJobById(jobId);
        if (!job) {
            throw new ApiError("Job not found", 404);
        }
        res.status(200).json({
            success: true,
            message: "job fetched",
            job
        })
    } catch (error) {
        next(error)

    }

}


export const skillsMatch = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;

        // 1. Get candidate profile
        const candidate = await getUserById(userId);

        if (!candidate || !candidate.candidateProfile) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found",
                result: []
            });
        }

        // Original skills (for preserving proper casing)
        const candidateSkillsOriginal: string[] = candidate.candidateProfile.skills || [];
        const candidateSkills = candidateSkillsOriginal.map(s => s.toLowerCase());

        // Map lowercase -> original casing
        const skillMap: Record<string, string> = {};
        candidateSkillsOriginal.forEach(s => {
            skillMap[s.toLowerCase()] = s;
        });

        // 2. Get all applications with job details
        const applications = await Application.find({
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
        const skillCounts: Record<string, number> = {};
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
            skill: skillMap[skill],        // preserve original casing
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

    } catch (error) {
        next(error);
    }
};
