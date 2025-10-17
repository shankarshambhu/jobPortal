import { CompanyProfile } from "../entity/companyProfile";
import { User } from "../entity/user";

export const getUserByEmail = async (email: string) => {
    try {
        return await User.findOne({ where: { email } })

    } catch (error) {

    }

}
export const getUserById = async (userId: number) => {
    try {
        return await User.findOne({
            where: { id: userId }, relations: ['candidateProfile'] // <-- load candidateProfile
        })
    } catch (error) {
        console.log(error);


    }
}



export const editUser = async (userProfile: Partial<User>, user: User) => {
    try {
        Object.assign(user, userProfile);
        return await user.save();

    } catch (error) {
        console.log(error);

        throw error;

    }

}