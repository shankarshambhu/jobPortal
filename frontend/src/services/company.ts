import commonAPI from "./commonAPI"

const baseURL = import.meta.env.VITE_BASE_URL;


export const getCompanyProfile=async () => {
  return await commonAPI('GET',`${baseURL}/company/getProfile`);  
}

export const updateCompanyProfile=async (data:any) => {
    return await commonAPI('PUT',`${baseURL}/company/editprofile`,data);
    
}
export const createCompanyProfile=async (data:any) => {
    return await commonAPI('POST',`${baseURL}/company/createprofile`,data);
    
}