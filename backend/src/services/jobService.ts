import { Job } from "../entity/job"

export const createJobService = async (payload: any, company: any) => {
    try {
        const { title, description, location, salary, jobtype, enddate, skills } = payload;
        const newJob = new Job();
        newJob.title = title;
        newJob.description = description;
        newJob.location = location;
        newJob.salary = salary;
        newJob.jobtype = jobtype;
        newJob.enddate = enddate;
        newJob.user = company;
        newJob.skills = skills;
        return await newJob.save();


    } catch (error) {
        console.log(error);
        throw error;

    }

}
export const editJobService = async (payload: any, job: any) => {
    try {
        Object.assign(job, payload);
        return await job.save();



    } catch (error) {
        console.log(error);
        throw error;


    }

}

export const getJobById = async (jobId: number) => {
    try {
        return await Job.findOne({
            where: { id: jobId },
            relations: ['user']
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAllJobs = async () => {
    try {
        return await Job.find();

    } catch (error) {
        console.log(error);
        throw error


    }

}




