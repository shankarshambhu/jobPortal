import express from 'express'
import { validateBody } from '../middlewares/body.validator.middleware';
import { candidateProfileSchema } from '../validation/profile.validation';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '../entity/user';
import { createProfile, editProfile, getCandidate, getCandidateStats } from '../controllers/candidateController';
import { upload } from '../multer/config';

const router = express.Router();

router.use(authenticate);

router.route('/createprofile').post(authorize(Role.CANDIDATE, Role.ADMIN), upload.single('resume'), validateBody(candidateProfileSchema), createProfile);

router.route('/editprofile')
    .put(
        authorize(Role.CANDIDATE, Role.ADMIN),
        upload.single("resume"),   // <-- handle resume file
        validateBody(candidateProfileSchema),
        editProfile
    );

router.route("/candidatedetail").get(authorize(Role.CANDIDATE, Role.COMPANY, Role.ADMIN), getCandidate);
router.route("/allcandidate").get(getCandidate);

router.route("/getcandidatestat").get(getCandidateStats);

export default router;