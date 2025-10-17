import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Application } from "./application";

export enum JobType {
    FULL_TIME = "fulltime",
    PART_TIME = "parttime",
    INTERNSHIP = "internship"
}
@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column("text")
    description: string

    @Column()
    location: string

    @Column("text", { array: true, nullable: true })
    skills: string[];


    @Column({ type: 'float' })
    salary: number

    @Column({ type: "enum", enum: JobType, default: JobType.FULL_TIME })
    jobtype: JobType

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    enddate: Date


    @ManyToOne(() => User, (user) => user.job, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User

    @OneToMany(() => Application, (application) => application.job)
    application: Application[]
}