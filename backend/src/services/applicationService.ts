import { Application, ApplicationStatus } from "../entity/application";
import { Job } from "../entity/job";
import { User } from "../entity/user";

export const createApplicationService = async (payload: any, user: User, job: Job) => {
    try {
        const { coverLetter } = payload;
        const newApplication = new Application();
        newApplication.coverLetter = coverLetter;
        newApplication.user = user;
        newApplication.job = job;
        return await newApplication.save();


    } catch (error) {
        console.log(error);
        throw error;

    }

}

export const getAllApplicationServiceCompany = async (userId: number) => {
    try {
        return await Application.find({ where: { job: { user: { id: userId } } }, relations: ['job', 'user', 'job.user', 'user.candidateProfile', 'job.user.companyProfile'] });

    } catch (error) {
        console.log(error);

        throw error

    }

}



export const getAllApplicationServiceCandidate = async (userId: number) => {
    try {
        return await Application.find({ where: { user: { id: userId } }, relations: ['job', 'user', 'job.user', 'user.candidateProfile', 'interviews'] });

    } catch (error) {
        console.log(error);

        throw error


    }

}


export const getApplicationsByJobId = async (jobId: number) => {
    try {
        return await Application.find({
            where: { job: { id: jobId } },
            relations: ["job", "user", "user.candidateProfile", 'interviews'],
            order: { appliedAt: "DESC" },
        });
    } catch (error) {
        console.error("Error fetching applications by job ID:", error);
        throw error;
    }
};


export const getApplicationByApplicationId = async (appId: number) => {
    try {
        return await Application.findOne({ where: { id: appId }, relations: ["user"] });

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAppStatus = async (application: Application, status: string) => {
    try {
        application.status = status as ApplicationStatus;
        await application.save();
        return application;

    } catch (error) {
        console.error("Error updating application status:", error);
        throw error;

    }

}

