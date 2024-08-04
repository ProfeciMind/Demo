import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
const mongoURI="mongodb+srv://harsh:harsh@mern-estate.huxd3yr.mongodb.net/mern_estate";

const connectToMongo = async () => {
    try {
       await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     });
        console.log("[+] Connected to MongoDB Successfully");
    }
    catch (error) {
        console.error(error);
    }
}
connectToMongo();
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');  
}
);

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
