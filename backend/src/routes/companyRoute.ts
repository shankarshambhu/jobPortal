import express from 'express'
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '../entity/user';
import { validateBody } from '../middlewares/body.validator.middleware';
import { companyProfileSchema } from '../validation/profile.validation';
import { createProfile, editProfile, getCompanyDetail, getCompanyProfile } from '../controllers/companyController';

const router = express.Router();

router.use(authenticate);

router.route('/createprofile').post(authorize(Role.COMPANY, Role.ADMIN), validateBody(companyProfileSchema), createProfile);
router.route('/editprofile').put(authorize(Role.COMPANY, Role.ADMIN), validateBody(companyProfileSchema), editProfile);
router.route("/companydetail").get(getCompanyDetail);
router.route("/allcompanies").get(getCompanyDetail);

router.route("/getProfile").get(authorize(Role.COMPANY),getCompanyProfile);



export default router;