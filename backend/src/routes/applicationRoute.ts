import express from 'express'
import { authenticate } from '../middlewares/auth.middleware';
import { createApplication, getAllApplicationCompany, getApplicationStatus, getApplicationTrends, getCandidateApplication, getCandidateJobApplication, getUserApplication, updateApplicationStatus } from '../controllers/applicationController';

const router=express.Router();

router.use(authenticate);

router.route("/createapplication/:id").post(createApplication);
router.route("/getallapp").get(getAllApplicationCompany);
router.route("/getcanapp").get(getCandidateApplication);
router.route("/getjobapp/:id").get(getCandidateJobApplication);

router.route("/updatestatus/:id").put(updateApplicationStatus);

router.route("/applicationtrends").get(getApplicationTrends);

router.route("/applicationstatus").get(getApplicationStatus);

router.route("/getuserapp").get(getUserApplication)





export default router;