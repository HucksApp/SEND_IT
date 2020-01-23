import express from 'express';
import bodyParser from 'body-parser';
import  { header }  from './config/headers.js'
import createSQL from './db/createSQL.js';
import  { client as db } from './db/db3.js';
import route from './router'
import cookieSession from 'cookie-session';

import dotenv from 'dotenv';

// CONFIG AUTH ENVIROMENT
dotenv.config();

//APP
const app = express();





// GENERAL API RESPONSE HEADER 
app.use(function(req, res, next){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers",
     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();

});




//CREATE DATABASE SQL OR VERIFY DATABASE
createSQL(db);



// BODY PARSER MIDDLEWARE
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

app.use(urlencodedParser);
app.use(jsonParser);




// MOUNT THE SUB APP
app.use('/api/v1', route);



//ERROR HANDLING
app.all('*',(req,res)=>{
    res.send("NOT A VALID ENDPOINT")
});

//PORT
const PORT =process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`HUCKSAPP API LISTENING ON PORT ${PORT}`)
})