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
import { User } from "./user";
import { Interview } from "./interview";

export enum RescheduleStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

@Entity()
export class Reschedule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // The interview being requested to reschedule
    @ManyToOne(() => Interview, (interview) => interview.reschedule, { onDelete: "CASCADE" })
    @JoinColumn()
    interview: Interview;

    // Candidate making the request
    @ManyToOne(() => User, (user) => user.reschedules, { onDelete: "CASCADE" })
    @JoinColumn()
    candidate: User;

    // The requested new date/time
    @Column({ type: "timestamptz", nullable: false })
    newDateTime: Date;

    // Optional reason for rescheduling
    @Column({ type: "text", nullable: true })
    reason?: string;

    // Status of the reschedule request
    @Column({ type: "enum", enum: RescheduleStatus, default: RescheduleStatus.PENDING })
    status: RescheduleStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
