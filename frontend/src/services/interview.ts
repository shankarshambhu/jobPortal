import commonAPI from "./commonAPI"

const baseURL = import.meta.env.VITE_BASE_URL;

export const sendInterview = async (candidateId: number, jobId: number, scheduledAt: any, applicationId: number) => {
    return commonAPI("POST", `${baseURL}/interview/scheduleinterview`, { candidateId, jobId, scheduledAt, applicationId });

}

export const interviewReschedule = async (user: any, appId: number, reason: string, newDate: any) => {
    return commonAPI("POST", `${baseURL}/interview/rescheduleinterivew`, { user, appId, reason, newDate });

}

export const getRescheduleRequests = async () => {
    return commonAPI("GET", `${baseURL}/interview/getreschedule`);

}

export const updateRescheduleStatus = async (rescheduleId: number, interviewId: number, dateTime: Date, status: string) => {
    return commonAPI("POST", `${baseURL}/interview/acceptreschedule`, { interviewId, dateTime, status, rescheduleId });

}

export const todayInterview = async () => {
    return commonAPI("GET", `${baseURL}/interview/todayinterview`);

}

export const sendRoomLink = async (email: string, candidateName: string, jobTitle: string) => {
    return commonAPI("POST", `${baseURL}/interview/interviewlink`, { email, candidateName, jobTitle })
}


export const sendInterviewNotes = async (roomId: string, notes: string) => {
    return commonAPI("POST", `${baseURL}/interview/sendnotes`, { roomId, notes })

}


export const todayInterviewCandidate = async () => {
    return commonAPI("GET", `${baseURL}/interview/todayinterviewcandidate`)

}

export const finishInterview = async (roomId: string) => {
    return commonAPI("POST", `${baseURL}/interview/interviewstatus/${roomId}`)

}

export const findRoomAccess = async (roomId: string) => {
    return commonAPI("GET", `${baseURL}/interview/checkroomaccess/${roomId}`)

}