import express from 'express'
import {  checkRoomAccess, finishInterview, getreschedule, getTodayInterview, getTodayInterviewCandidate, rescheduleInterview, scheduleInterview, sendInterviewLink, sendInterviewNotes, updateRescheduleInterview } from '../controllers/interviewController';
import { authenticate } from '../middlewares/auth.middleware';
const router = express.Router();

router.use(authenticate);

router.route("/scheduleinterview").post(scheduleInterview);

router.route("/rescheduleinterivew").post(rescheduleInterview);

router.route("/getreschedule").get(getreschedule);

router.route("/acceptreschedule").post(updateRescheduleInterview);

router.route("/todayinterview").get(getTodayInterview);


router.route("/interviewlink").post(sendInterviewLink);

router.route("/sendnotes").post(sendInterviewNotes);

router.route("/todayinterviewcandidate").get(getTodayInterviewCandidate);

router.route("/interviewstatus/:id").post(finishInterview);

router.route("/checkroomaccess/:roomId").get(checkRoomAccess)

export default router;