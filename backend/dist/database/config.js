"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("../entity/user");
const companyProfile_1 = require("../entity/companyProfile");
const candidateProfile_1 = require("../entity/candidateProfile");
const job_1 = require("../entity/job");
const application_1 = require("../entity/application");
const reshedule_1 = require("../entity/reshedule");
const interview_1 = require("../entity/interview");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Root@123",
    database: "jobPortal",
    synchronize: true,
    logging: false,
    entities: [user_1.User, companyProfile_1.CompanyProfile, candidateProfile_1.CandidateProfile, job_1.Job, application_1.Application, reshedule_1.Reschedule, interview_1.Interview]
});
