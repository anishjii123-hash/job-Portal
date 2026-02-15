import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./ulties/db.js";
import router from "./routes/user.router.js";
import companyRouter from "./routes/company.router.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.router.js";

dotenv.config();

//console.log(process.env.MONGO_URL);

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173", "https://job-portal-full-stack-project.netlify.app"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", router); 
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter); 
app.use("/api/v1/application", applicationRouter);
 
app.get("/", (req, res) => {
  res.send("Welcome to the Job Portal API");
}
);

// Example: http://localhost:8000/api/v1/user/register

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port http://localhost:${PORT}`);
});
