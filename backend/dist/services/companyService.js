"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyUser = exports.getAllCompanies = exports.getCompanyProfileById = void 0;
const companyProfile_1 = require("../entity/companyProfile");
const user_1 = require("../entity/user");
const getCompanyProfileById = async (userId) => {
    try {
        return await companyProfile_1.CompanyProfile.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getCompanyProfileById = getCompanyProfileById;
const getAllCompanies = async () => {
    try {
        return await companyProfile_1.CompanyProfile.find({ relations: ['user'] });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getAllCompanies = getAllCompanies;
const getCompanyUser = async (userId) => {
    try {
        return await user_1.User.findOne({ where: { id: userId } });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getCompanyUser = getCompanyUser;
