import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class CompanyProfile extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    companyName: string

    @Column()
    website: string

    @Column()
    address: string

    @Column()
    logourl: string

    @OneToOne(() => User, (user) => user.companyProfile, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User


}