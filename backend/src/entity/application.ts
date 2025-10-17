import { BaseEntity, Column, CreateDateColumn, Entity, Join, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Job } from "./job";
import { Interview } from "./interview";


export enum ApplicationStatus {
    APPLIED = "applied",
    SHORTLISTED = 'shortlisted',
    REJECTED = 'rejected',
    HIRED = 'hired',
    SCHEDULED = 'scheduled'
}
@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "enum", enum: ApplicationStatus, default: ApplicationStatus.APPLIED })
    status: ApplicationStatus


    @Column({ nullable: true })
    coverLetter?: string;

    @CreateDateColumn()
    appliedAt: Date;

    @OneToMany(() => Interview, (interview) => interview.application)
    interviews: Interview[];



    @ManyToOne(() => User, (user) => user.application, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User

    @ManyToOne(() => Job, (job) => job.application, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    job: Job


}