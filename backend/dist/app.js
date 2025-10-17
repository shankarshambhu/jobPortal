"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = require("./middlewares/error.handler");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const candidateRoute_1 = __importDefault(require("./routes/candidateRoute"));
const companyRoute_1 = __importDefault(require("./routes/companyRoute"));
const jobRoute_1 = __importDefault(require("./routes/jobRoute"));
const applicationRoute_1 = __importDefault(require("./routes/applicationRoute"));
const interviewRoute_1 = __importDefault(require("./routes/interviewRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL
}));
app.use("/api/v1/auth", authRoute_1.default);
app.use("/api/v1/candidate", candidateRoute_1.default);
app.use("/api/v1/company", companyRoute_1.default);
app.use("/api/v1/job", jobRoute_1.default);
app.use("/api/v1/application", applicationRoute_1.default);
app.use("/api/v1/interview", interviewRoute_1.default);
app.use(error_handler_1.errorHandler);
exports.default = app;
