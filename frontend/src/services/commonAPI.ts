import axios from "axios";

const commonAPI = async (
    httpMethod: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    url: string,
    reqBody?: any
) => {
    const token = localStorage.getItem("token");

    const isFormData = reqBody instanceof FormData;

    const reqConfig = {
        method: httpMethod,
        url,
        ...(httpMethod === "GET" ? { params: reqBody } : { data: reqBody }),
        headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            // Only set JSON content-type if it's not FormData
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
    };

    try {
        const response = await axios(reqConfig);
        return response;
    } catch (error: any) {
        if (error?.response?.status === 403) {
            console.warn("🔐 Token expired or invalid. Logging out...");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        throw error.response || error;
    }
};

export default commonAPI;
