import commonAPI from "./commonAPI"
const baseURL = import.meta.env.VITE_BASE_URL;

export const registerApi = async (data: any) => {
    return await commonAPI('POST', `${baseURL}/auth/register`, data);

}
export const loginApi = async function name(data: any) {
    return await commonAPI('POST', `${baseURL}/auth/login`, data)

}
