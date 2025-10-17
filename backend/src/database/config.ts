import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/user"
import { CompanyProfile } from "../entity/companyProfile"
import { CandidateProfile } from "../entity/candidateProfile"
import { Job } from "../entity/job"
import { Application } from "../entity/application"
import { Reschedule } from "../entity/reshedule"
import { Interview } from "../entity/interview"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Root@123",
    database: "jobPortal",
    synchronize: true,
    logging: false,
    entities: [User, CompanyProfile, CandidateProfile, Job, Application, Reschedule, Interview]

})