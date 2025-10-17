import { CompanyProfile } from "../entity/companyProfile";
import { User } from "../entity/user";

export const getCompanyProfileById = async (userId: number) => {
    try {
        return await CompanyProfile.findOne({ where: { user: { id: userId } }, relations: ['user'] })

    } catch (error) {
        console.log(error);
        throw error;

    }

}

export const getAllCompanies = async () => {
    try {
        return await CompanyProfile.find({ relations: ['user'] });
    } catch (error) {
        console.log(error);
        throw error;


    }
}

export const getCompanyUser = async (userId: number) => {
    try {
        return await User.findOne({ where: { id: userId } })
    } catch (error) {
        console.log(error);
        throw error


    }

}
