"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyDetail = exports.getCompanyProfile = exports.editProfile = exports.createProfile = void 0;
const userService_1 = require("../services/userService");
const apiError_1 = require("../utils/apiError");
const profileService_1 = require("../services/profileService");
const companyService_1 = require("../services/companyService");
const createProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const found = await (0, companyService_1.getCompanyProfileById)(userId);
        if (found) {
            throw new apiError_1.ApiError("Profile already exist", 400);
        }
        const user = await (0, userService_1.getUserById)(userId);
        if (!user) {
            throw new apiError_1.ApiError("User not found", 404);
        }
        const profile = await (0, profileService_1.companyProfileService)(req.body, user);
        res.status(200).json({
            success: true,
            message: "profile created successfully",
            profile
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProfile = createProfile;
const editProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const company = await (0, companyService_1.getCompanyProfileById)(userId);
        if (!company) {
            throw new apiError_1.ApiError("Profile not found", 404);
        }
        const updatedProfile = await (0, profileService_1.editCompanyProfile)(req.body, company);
        return res.status(200).json({
            sucess: true,
            message: "Company profile updated successfully",
            profile: updatedProfile
        });
    }
    catch (error) {
        next(error);
    }
};
exports.editProfile = editProfile;
const getCompanyProfile = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        const companyId = Number(userId);
        const company = await (0, companyService_1.getCompanyProfileById)(companyId);
        if (!company) {
            throw new apiError_1.ApiError("Profile not Found", 404);
        }
        res.status(200).json({
            success: true,
            message: "profile fetched successfully",
            company
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCompanyProfile = getCompanyProfile;
const getCompanyDetail = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const companyId = userId;
        if (companyId && isNaN(companyId)) {
            throw new apiError_1.ApiError("Invalid company ID", 400);
        }
        let companies;
        if (companyId) {
            // Fetch single company by ID
            const company = await (0, companyService_1.getCompanyProfileById)(companyId);
            if (!company) {
                throw new apiError_1.ApiError("No company found", 404);
            }
            companies = [company]; // wrap in array to reuse mapping
        }
        else {
            // Fetch all companies
            companies = await (0, companyService_1.getAllCompanies)();
            if (!companies || companies.length === 0) {
                throw new apiError_1.ApiError("No companies found", 404);
            }
        }
        console.log(companies);
        // Map to format output
        const result = companies.map(company => ({
            id: company.id,
            name: company.companyName,
            email: company.user.email,
            website: company.website,
            address: company.address,
            logourl: company.logourl
        }));
        res.status(200).json({
            success: true,
            message: companyId ? "Company details fetched successfully" : "All companies fetched successfully",
            result: companyId ? result[0] : result
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCompanyDetail = getCompanyDetail;
