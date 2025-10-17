import express from 'express'
import { errorHandler } from './middlewares/error.handler';
import authRoutes from './routes/authRoute'
import candidateRoutes from './routes/candidateRoute'
import companyRoutes from './routes/companyRoute'
import jobRoutes from './routes/jobRoute'
import applicationRoutes from './routes/applicationRoute'
import interviewRoutes from './routes/interviewRoute'
import cors from "cors";


const app = express();


app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/interview", interviewRoutes);



app.use(errorHandler);


export default app;
