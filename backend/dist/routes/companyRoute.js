"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_1 = require("../entity/user");
const body_validator_middleware_1 = require("../middlewares/body.validator.middleware");
const profile_validation_1 = require("../validation/profile.validation");
const companyController_1 = require("../controllers/companyController");
const router = express_1.default.Router();
router.use(auth_middleware_1.authenticate);
router.route('/createprofile').post((0, auth_middleware_1.authorize)(user_1.Role.COMPANY, user_1.Role.ADMIN), (0, body_validator_middleware_1.validateBody)(profile_validation_1.companyProfileSchema), companyController_1.createProfile);
router.route('/editprofile').put((0, auth_middleware_1.authorize)(user_1.Role.COMPANY, user_1.Role.ADMIN), (0, body_validator_middleware_1.validateBody)(profile_validation_1.companyProfileSchema), companyController_1.editProfile);
router.route("/companydetail").get(companyController_1.getCompanyDetail);
router.route("/allcompanies").get(companyController_1.getCompanyDetail);
router.route("/getProfile").get((0, auth_middleware_1.authorize)(user_1.Role.COMPANY), companyController_1.getCompanyProfile);
exports.default = router;
