import express from 'express';
import userRouter from './userRoute.js';
import orderRouter from './orderRoute.js';
import adminRouter from './adminRoute.js';
import cookieSession from 'cookie-session';



const app = express();



// SESSION
app.use(cookieSession({
    name:"userSession",
    maxAge:60*60*1000,
    keys:[process.env.COOKIE_KEY]
}));

// END SESSION -route common to all users i.e Admin and User
app.get('/logout', (req, res)=>{
    req.session = null;
    res.json({message:"SESSION ENDED"});
});

// MOUNT THE SUB ROUTERS
app.use('/', userRouter);
app.use('/', orderRouter);
app.use('/', adminRouter);


export default app;