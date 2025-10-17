"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllJobs = exports.getJobById = exports.editJobService = exports.createJobService = void 0;
const job_1 = require("../entity/job");
const createJobService = async (payload, company) => {
    try {
        const { title, description, location, salary, jobtype, enddate, skills } = payload;
        const newJob = new job_1.Job();
        newJob.title = title;
        newJob.description = description;
        newJob.location = location;
        newJob.salary = salary;
        newJob.jobtype = jobtype;
        newJob.enddate = enddate;
        newJob.user = company;
        newJob.skills = skills;
        return await newJob.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.createJobService = createJobService;
const editJobService = async (payload, job) => {
    try {
        Object.assign(job, payload);
        return await job.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.editJobService = editJobService;
const getJobById = async (jobId) => {
    try {
        return await job_1.Job.findOne({
            where: { id: jobId },
            relations: ['user']
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getJobById = getJobById;
const getAllJobs = async () => {
    try {
        return await job_1.Job.find();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllJobs = getAllJobs;
