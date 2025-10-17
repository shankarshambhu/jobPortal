import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Application } from "./application";
import { User } from "./user";
import { Reschedule } from "./reshedule";

export enum InterviewStatus {
    SCHEDULED = "scheduled",
    COMPLETED = "completed",
    CANCELLED = "cancelled",
}

@Entity()
export class Interview extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // The application this interview belongs to
    @ManyToOne(() => Application, (application) => application.interviews, { onDelete: "CASCADE" })
    @JoinColumn()
    application: Application;

    // Optional: interviewer or company user
    @ManyToOne(() => User, { nullable: true })
    @JoinColumn()
    interviewer?: User;

    // Scheduled datetime
    @Column({ type: "timestamptz" })
    scheduledAt: Date;

    // Interview status
    @Column({ type: "enum", enum: InterviewStatus, default: InterviewStatus.SCHEDULED })
    status: InterviewStatus;

    @Column({ type: "text", nullable: true })
    roomLink?: string | null;


    // Optional notes or feedback
    @Column({ type: "text", nullable: true })
    notes?: string;

    // Relation to reschedule requests
    @OneToMany(() => Reschedule, (reschedule) => reschedule.interview)
    reschedule: Reschedule[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
