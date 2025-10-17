"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const interviewController_1 = require("../controllers/interviewController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.route("/scheduleinterview").post(interviewController_1.scheduleInterview);
router.route("/rescheduleinterivew").post(interviewController_1.rescheduleInterview);
router.route("/getreschedule").get(interviewController_1.getreschedule);
router.route("/acceptreschedule").post(interviewController_1.updateRescheduleInterview);
router.route("/todayinterview").get(interviewController_1.getTodayInterview);
router.route("/interviewlink").post(interviewController_1.sendInterviewLink);
router.route("/sendnotes").post(interviewController_1.sendInterviewNotes);
router.route("/todayinterviewcandidate").get(interviewController_1.getTodayInterviewCandidate);
exports.default = router;
