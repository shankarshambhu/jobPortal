import { CandidateProfile } from "../entity/candidateProfile";


export const getAllCandidate = async () => {
    try {
        return await CandidateProfile.find({
            relations: ['user'], 
        });
    } catch (error) {
        console.log(error);

    }

}

export const getCandidateProfileById = async (userId: number) => {
    try {

        return await CandidateProfile.findOne({ where: { user: { id: userId } } })
    } catch (error) {
        console.log(error);

    }

}
export const getCandidateDetailById = async (userId: number) => {
    try {

        return await CandidateProfile.findOne({ where: { user: { id: userId } }, relations: ['user'] })
    } catch (error) {
        console.log(error);

    }

}
