"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const applicationController_1 = require("../controllers/applicationController");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.route("/createapplication/:id").post(applicationController_1.createApplication);
router.route("/getallapp").get(applicationController_1.getAllApplicationCompany);
router.route("/getcanapp").get(applicationController_1.getCandidateApplication);
router.route("/getjobapp/:id").get(applicationController_1.getCandidateJobApplication);
router.route("/updatestatus/:id").put(applicationController_1.updateApplicationStatus);
router.route("/applicationtrends").get(applicationController_1.getApplicationTrends);
router.route("/applicationstatus").get(applicationController_1.getApplicationStatus);
exports.default = router;
