"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_validation_1 = require("../validation/auth.validation");
const body_validator_middleware_1 = require("../middlewares/body.validator.middleware");
const router = express_1.default.Router();
router.route("/register").post((0, body_validator_middleware_1.validateBody)(auth_validation_1.registerSchema), authController_1.userRegister);
router.route("/login").post(authController_1.userLogin);
exports.default = router;
