"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCompanyProfile = exports.companyProfileService = exports.editCandidateProfile = exports.candidateProfileService = void 0;
const candidateProfile_1 = require("../entity/candidateProfile");
const companyProfile_1 = require("../entity/companyProfile");
const candidateProfileService = async (payload, user) => {
    try {
        const { age, address, skills, experienceYears, resume, gender, date_of_birth, phone_number } = payload;
        const newProfile = new candidateProfile_1.CandidateProfile();
        newProfile.age = age;
        newProfile.address = address;
        newProfile.skills = skills;
        newProfile.experienceYears = experienceYears;
        newProfile.resume = resume;
        newProfile.gender = gender;
        newProfile.date_of_birth = date_of_birth;
        newProfile.phone_number = phone_number;
        newProfile.user = user;
        return await newProfile.save();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.candidateProfileService = candidateProfileService;
const editCandidateProfile = async (candidate, candidateProfile) => {
    try {
        Object.assign(candidate, candidateProfile);
        return await candidate.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.editCandidateProfile = editCandidateProfile;
const companyProfileService = async (payload, user) => {
    try {
        const { companyName, website, address, logourl } = payload;
        const newProfile = new companyProfile_1.CompanyProfile();
        newProfile.companyName = companyName;
        newProfile.website = website;
        newProfile.address = address;
        newProfile.logourl = logourl;
        newProfile.user = user;
        return await newProfile.save();
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.companyProfileService = companyProfileService;
const editCompanyProfile = async (payload, company) => {
    try {
        Object.assign(company, payload);
        return await company.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.editCompanyProfile = editCompanyProfile;
