import commonAPI from "./commonAPI"

const baseURL = import.meta.env.VITE_BASE_URL;

export const getCandidateProfile = async () => {
    return await commonAPI('GET', `${baseURL}/candidate/candidatedetail`)

}
export const updateCandidateProfile = async (edit: any) => {
    return await commonAPI('PUT', `${baseURL}/candidate/editprofile`, edit);

}

export const createCandidateProfile = async (edit: any) => {
    return await commonAPI("POST", `${baseURL}/candidate/createprofile`, edit)

}

export const getCandidateStats=async () => {
    return await commonAPI("GET",`${baseURL}/candidate/getcandidatestat`)
    
}