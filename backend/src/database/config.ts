import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/user"
import { CompanyProfile } from "../entity/companyProfile"
import { CandidateProfile } from "../entity/candidateProfile"
import { Job } from "../entity/job"
import { Application } from "../entity/application"
import { Reschedule } from "../entity/reshedule"
import { Interview } from "../entity/interview"
import dotenv from "dotenv"
dotenv.config();
console.log(typeof(process.env.DB_PORT));
console.log(process.env.DB_USER);



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)||5432,
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, CompanyProfile, CandidateProfile, Job, Application, Reschedule, Interview]

})