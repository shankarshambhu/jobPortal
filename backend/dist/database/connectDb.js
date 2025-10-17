"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const config_1 = require("./config");
const Connection = async () => {
    try {
        await config_1.AppDataSource.initialize();
        console.log("connected to database");
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.Connection = Connection;
