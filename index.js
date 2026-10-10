import "dotenv/config"
import express from "express";
import connectDB from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import chatRouter from "./routes/chatRouter.js";
import cookieParser from "cookie-parser";





const app = express();

// app.use("/" , (req,res)=>{
//     res.json("hello ji");
// })

app.use(express.json());
app.use(cookieParser());





 

app.use("/user", userRouter);
app.use("/msg" , messageRouter);
app.use("/chat", chatRouter );






const startServer = async ()=>{
    try{

        connectDB();
        
        app.listen(process.env.PORT, ()=>{
            console.log(`Server is listening at port ${process.env.PORT}`);
        })
    }
    catch(err){
        console.log(err);
    } 
}


startServer();