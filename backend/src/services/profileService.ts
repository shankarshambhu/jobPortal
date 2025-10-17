import { CandidateProfile } from "../entity/candidateProfile";
import { CompanyProfile } from "../entity/companyProfile";
import { User } from "../entity/user";

export const candidateProfileService = async (payload: any, user: User) => {
    try {
        const { age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number } = payload;
        const newProfile = new CandidateProfile();
        newProfile.age = age;
        newProfile.address = address;
        newProfile.skills = skills;
        newProfile.experienceYears = experienceYears;
        newProfile.resume = resume;
        newProfile.gender = gender;
        newProfile.date_of_birth = date_of_birth;
        newProfile.phone_number = phone_number;
        newProfile.user = user;


        return await newProfile.save();

    } catch (error) {
        console.error(error);
        throw error;

    }

}

export const editCandidateProfile = async (candidate: CandidateProfile, candidateProfile: Partial<CandidateProfile>) => {
    try {

        Object.assign(candidate, candidateProfile);
        return await candidate.save();


    } catch (error) {

        console.log(error);
        throw error

    }

}


export const companyProfileService = async (payload: any, user: User) => {
    try {
        const { companyName, website, address, logourl } = payload;
        const newProfile = new CompanyProfile();
        newProfile.companyName = companyName;
        newProfile.website = website;
        newProfile.address = address;
        newProfile.logourl = logourl;
        newProfile.user = user;
        return await newProfile.save();

    } catch (error) {
        console.error(error);
        throw error;

    }
}

export const editCompanyProfile = async (payload: Partial<CompanyProfile>, company: CompanyProfile) => {
    try {
        Object.assign(company, payload);
        return await company.save();

    } catch (error) {
        console.log(error);
        throw error;


    }

}