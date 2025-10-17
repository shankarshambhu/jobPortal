import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CandidateProfile } from "./candidateProfile";
import { CompanyProfile } from "./companyProfile";
import { Application } from "./application";
import { Job } from "./job";
import { Reschedule } from "./reshedule";


export enum Role {
    CANDIDATE = "candidate",
    COMPANY = "company",
    ADMIN = "admin"

}
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: "enum", enum: Role, default: Role.CANDIDATE })
    role: Role

    @CreateDateColumn()
    date: string

    @OneToOne(() => CandidateProfile, (profile) => profile.user)
    candidateProfile: CandidateProfile

    @OneToOne(() => CompanyProfile, (profile) => profile.user)
    companyProfile: CompanyProfile


    @OneToMany(() => Application, (application) => application.user)
    application: Application[];

    @OneToMany(() => Job, (job) => job.user)
    job: Job[];

    @OneToMany(() => Reschedule, (reschedule) => reschedule.candidate)
    reschedules: Reschedule[];

}