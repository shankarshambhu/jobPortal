import express from 'express'
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { Role } from '../entity/user';
import { validateBody } from '../middlewares/body.validator.middleware';
import { jobCreationSchema } from '../validation/job.validation';
import { getAllJob, getJob, jobCreate, jobEdit, skillsMatch } from '../controllers/jobController';
const router = express.Router();
router.use(authenticate);

router.route("/createjob").post(authorize(Role.ADMIN, Role.COMPANY), validateBody(jobCreationSchema), jobCreate);
router.route("/editjob").put(authorize(Role.ADMIN, Role.COMPANY), validateBody(jobCreationSchema), jobEdit);
router.route("/getalljob").get(getAllJob);
router.route("/getjob/:id").get(getJob);

router.route("/skillsmatch").get(skillsMatch);

export default router;