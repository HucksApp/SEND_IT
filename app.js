import express from 'express';
import bodyParser from 'body-parser';
import  { header }  from './config/headers.js'
import createSQL from './db/createSQL.js';
import  { client as db } from './db/db3.js';
import route from './router'

import dotenv from 'dotenv';

// CONFIG AUTH ENVIROMENT
dotenv.config();



//CREATE DATABASE SQL OR VERIFY DATABASE
createSQL(db);



//APP
const app = express();

// BODY PARSER MIDDLEWARE
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

app.use(urlencodedParser);
app.use(jsonParser);

// GENERAL API RESPONSE HEADER 
app.use(function(req, res, next){

    res.set(header);
    next();

});



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