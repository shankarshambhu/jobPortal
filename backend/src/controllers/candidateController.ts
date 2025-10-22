import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CandidateProfile } from "../entity/candidateProfile";
import { ApiError } from "../utils/apiError";
import { candidateProfileService, editCandidateProfile } from "../services/profileService";
import { getAllCandidate, getCandidateDetailById, getCandidateProfileById } from "../services/candidateService";
import { editUser, getUserById } from "../services/userService";
import { firstName } from "../validation/commonFields";
import { getAllApplicationServiceCandidate } from "../services/applicationService";
import { getInterviewByApplicationId, getInterviewByCandidateId } from "../services/interviewService";

// export const createProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const { userId } = req.user!;
//         const found = await getCandidateProfileById(userId);
//         if (found) {
//             throw new ApiError("Profile already exists", 409);
//         }
//         const user = await getUserById(userId);
//         if (!user) {
//             throw new ApiError("User not found", 404)
//         }
//         const profile = await candidateProfileService(req.body, user);
//         res.status(200).json({
//             success: true,
//             message: "profile created successfully",
//             profile
//         })


//     } catch (error) {
//         next(error);


//     }

// }



export const createProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const found = await getCandidateProfileById(userId);
        if (found) {
            throw new ApiError("Profile already exists", 409);
        }

        const user = await getUserById(userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        // If a file was uploaded, overwrite resume in body
        if (req.file) {
            req.body.resume = `/uploads/resumes/${req.file.filename}`;
        }

        const profile = await candidateProfileService(req.body, user);

        res.status(200).json({
            success: true,
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        next(error);
    }
};





// export const editProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
//     try {
//         const { userId } = req.user!;
//         const { firstName, lastName, age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number } = req.body;
//         const userProfile = {
//             firstName,
//             lastName
//         }
//         const candidateProfile = {
//             age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number
//         }
//         const candidate = await getCandidateProfileById(userId);
//         const user = await getUserById(userId);
//         if (!user) {
//             throw new ApiError("User not found", 404);
//         }
//         if (!candidate) {
//             throw new ApiError("Proflie not made", 404);
//         }
//         await editUser(userProfile, user)
//         const updatedProfile = await editCandidateProfile(candidate, candidateProfile);
//         res.status(200).json({
//             success: true,
//             message: "Profile updated successfully",
//             profile: updatedProfile
//         });

//     } catch (error) {
//         next(error);

//     }

// }



export const editProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const { firstName, lastName, age, address, skills, experienceYears, gender, date_of_birth, phone_number } = req.body;

        const userProfile = { firstName, lastName };
        const candidateProfile: Partial<CandidateProfile> = {
            age,
            address,
            skills,
            experienceYears,
            gender,
            date_of_birth,
            phone_number
        };

        // If a file is uploaded, save its path
        if (req.file) {
            candidateProfile.resume = `/uploads/resumes/${req.file.filename}`;
        }

        const candidate = await getCandidateProfileById(userId);
        const user = await getUserById(userId);

        if (!user) throw new ApiError("User not found", 404);
        if (!candidate) throw new ApiError("Profile not made", 404);

        await editUser(userProfile, user);
        const updatedProfile = await editCandidateProfile(candidate, candidateProfile);

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (error) {
        next(error);
    }
};


export const getCandidate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!
        let candidates;

        if (userId) {
            const user = await getCandidateDetailById(userId);
            if (!user) throw new ApiError("Candidate Details not Found", 404);
            candidates = [user]; // wrap in array to reuse mapping
        } else {
            candidates = await getAllCandidate();
            if (!candidates || candidates.length === 0) {
                throw new ApiError("Candidate Details not Found", 404);
            }
        }

        const result = candidates.map(candidate => ({
            id: candidate.id,
            age: candidate.age,
            address: candidate.address,
            skills: candidate.skills,
            experienceYears: candidate.experienceYears,
            resume: candidate.resume,
            gender: candidate.gender,
            date_of_birth: candidate.date_of_birth,
            phone_number: candidate.phone_number,
            firstName: candidate.user.firstName,
            lastName: candidate.user.lastName,
            email: candidate.user.email,
            role: candidate.user.role,
            userId: candidate.user.id,
            date: candidate.user.date
        }));

        res.status(200).json({
            success: true,
            message: "Candidate details fetched successfully",
            result: userId ? result[0] : result
        });

    } catch (error) {
        next(error);
    }
};


export const getCandidateStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const candidate = await getUserById(userId);
        if (!candidate) {
            throw new ApiError("Candidate not found", 404);
        }
        const application = await getAllApplicationServiceCandidate(userId);
        const interview = await getInterviewByCandidateId(userId);
        // if (!interview) {
        //     throw new ApiError("Interview not found", 404);
        // }
        if (!application || application.length === 0) {
            throw new ApiError("Application not found", 404);
        }
        const result = {
            application,
            interview
        }
        res.status(200).json({
            success: true,
            message: "fetched successfully",
            result
        })


    } catch (error) {
        next(error);

    }

}
