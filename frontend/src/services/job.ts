import commonAPI from "./commonAPI"

const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllJobs = async () => {
    return commonAPI("GET", `${baseURL}/job/getalljob`);

}
export const createJobs=async (data:any) => {
    return commonAPI("POST",`${baseURL}/job/createjob`,data);

}

export const getSkillsMatch=async () => {
    return commonAPI("GET",`${baseURL}/job/skillsmatch`);
    
}

export const getIndividualJobs=async () => {
    return commonAPI("GET",`${baseURL}/job/getprivatejob`)    
}