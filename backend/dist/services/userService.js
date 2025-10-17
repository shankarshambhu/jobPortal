"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.getUserById = exports.getUserByEmail = void 0;
const user_1 = require("../entity/user");
const getUserByEmail = async (email) => {
    try {
        return await user_1.User.findOne({ where: { email } });
    }
    catch (error) {
    }
};
exports.getUserByEmail = getUserByEmail;
const getUserById = async (userId) => {
    try {
        return await user_1.User.findOne({
            where: { id: userId }, relations: ['candidateProfile'] // <-- load candidateProfile
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserById = getUserById;
const editUser = async (userProfile, user) => {
    try {
        Object.assign(user, userProfile);
        return await user.save();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.editUser = editUser;
