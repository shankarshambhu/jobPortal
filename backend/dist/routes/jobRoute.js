"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_1 = require("../entity/user");
const body_validator_middleware_1 = require("../middlewares/body.validator.middleware");
const job_validation_1 = require("../validation/job.validation");
const jobController_1 = require("../controllers/jobController");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.route("/createjob").post((0, auth_middleware_1.authorize)(user_1.Role.ADMIN, user_1.Role.COMPANY), (0, body_validator_middleware_1.validateBody)(job_validation_1.jobCreationSchema), jobController_1.jobCreate);
router.route("/editjob").put((0, auth_middleware_1.authorize)(user_1.Role.ADMIN, user_1.Role.COMPANY), (0, body_validator_middleware_1.validateBody)(job_validation_1.jobCreationSchema), jobController_1.jobEdit);
router.route("/getalljob").get(jobController_1.getAllJob);
router.route("/getjob/:id").get(jobController_1.getJob);
router.route("/skillsmatch").get(jobController_1.skillsMatch);
exports.default = router;
