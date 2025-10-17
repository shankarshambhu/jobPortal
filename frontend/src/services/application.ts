import commonAPI from "./commonAPI"

const baseURL = import.meta.env.VITE_BASE_URL;

export const createApplication = async (id: number, coverLetter: string) => {
    return commonAPI("POST", `${baseURL}/application/createapplication/${id}`, { coverLetter });

}

export const getCandidateJobApplication = async (jobId: number) => {
    return commonAPI("GET", `${baseURL}/application/getjobapp/${jobId}`);

}

export const getUserApplications = async () => {
    return commonAPI("GET", `${baseURL}/application/getuserapp`);

}

export const getApplicationsByJobId = async (jobId: number) => {
    return commonAPI('GET', `${baseURL}/application/getjobapp/${jobId}`);

}

export const updateApplicationStatus = async (id: number, status: string) => {
    return commonAPI("PUT", `${baseURL}/application/updatestatus/${id}`, { status });
}


export const getAllApplications = async () => {
    return await commonAPI("GET", `${baseURL}/application/getallapp`);

}

export const getApplicationTrends=async () => {
    return await commonAPI("GET",`${baseURL}/application/applicationtrends`)
    
}

export const getApplicationStatus=async () => {
    return await commonAPI("GET",`${baseURL}/application/applicationstatus`)
    
}