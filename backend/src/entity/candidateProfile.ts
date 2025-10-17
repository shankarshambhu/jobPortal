import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

export enum Gender {
    MALE = "male",
    FEMALE = 'female'
}

@Entity()
export class CandidateProfile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    age: number

    @Column()
    address: string

    @Column("text", { array: true, nullable: true })
    skills: string[]

    @Column()
    experienceYears: number

    @Column({ nullable: true })
    resume: string

    @Column({ type: "enum", enum: Gender, default: Gender.MALE })
    gender: Gender

    @Column()
    date_of_birth: Date

    @Column()
    phone_number: string

    @OneToOne(() => User, (user) => user.candidateProfile, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: User


}