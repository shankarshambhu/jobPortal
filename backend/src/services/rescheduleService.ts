import { Interview } from "../entity/interview";
import { Reschedule, RescheduleStatus } from "../entity/reshedule";
import { User } from "../entity/user";

export const getRescheduleByUserId = async (userId: number) => {
    try {
        return await Reschedule.find({
            where: { interview: { interviewer: { id: userId } } },
            relations: {
                candidate: true, // candidate info
                interview: {
                    application: {
                        job: true, // include job details
                    },
                    interviewer: true,
                },
            },
            order: { createdAt: "DESC" },
        });
    } catch (error) {
        console.error("Error fetching reschedules:", error);
        throw error;
    }
};


export const rescheduleInterviewService = async (user: User, interview: Interview, reason: string, newDate: any) => {
    try {
        const newReschedule = new Reschedule();
        newReschedule.reason = reason;
        newReschedule.newDateTime = newDate;
        newReschedule.candidate = user;
        newReschedule.interview = interview;
        return await newReschedule.save();



    } catch (error) {
        console.log(error);
        throw error

    }

}

export const getRescheduleById = async (id: number) => {
    try {
        return await Reschedule.findOne({ where: { id } })

    } catch (error) {
        console.log(error);
        throw error;


    }

}


export const updateRescheduleStatus=async (reschedule:Reschedule,status:RescheduleStatus) => {
    try {
        reschedule.status=status;
        return await reschedule.save();
        
    } catch (error) {
        console.log(error);
    throw error;        
        
    }
    
}