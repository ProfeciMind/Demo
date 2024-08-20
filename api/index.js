import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
const mongoURI = "mongodb+srv://harsh:harsh@mern-estate.huxd3yr.mongodb.net/mern_estate";
import { configDotenv } from 'dotenv';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

configDotenv();
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("[+] Connected to MongoDB Successfully");
    }
    catch (error) {
        console.error(error);
    }
}

const __dirname=path.resolve();

connectToMongo();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log('[+] Server is running on port 3000');
}
);

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing",listingRouter);

app.use(express.static(path.join(__dirname,'/real_estate/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'real_estate','dist','index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});