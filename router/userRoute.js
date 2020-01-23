import express from 'express';
import auth,{ generateToken } from '../config/auth/auth.js';
import  { client as db } from '../db/db3.js';


const router = express.Router();
let message;
const superuser= false;






//GET USER
router.get('/account', auth, (req,res)=>{
    
    if (req.session){
    const { email }= req.session._ctx.decoded;
    const id = email;

    console.log(req.session._ctx.decoded)
        
        db.query('SELECT * FROM users WHERE email= $1',[id],(err, result)=>{
            if (err){
                console.log(err);
            }
            res.status(200).json(result.rows)
            console.log('here 4')
        });
    }else{
        console.log('here 5')
        res.sendStatus(412)
    }
});



//UPDATE USER INFORMATION

router.put('/update_profile', auth, (req,res)=>{
    if(req.session){
        const {keyToValue, newVal} = req.body;
        const { email }= req.session._ctx.decoded;
        const id = email;
        if(keyToValue =='user-name'){
        db.query('UPDATE users SET username = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
            if (err){
                console.log(err)
            }else if(result){
                res.send('MODIFIED');
            }else{
                res.send('COMMAND UNKNOWN');
            }          
        });
        }else if(keyToValue =='house-address'){
            db.query('UPDATE users SET address = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){
                    console.log(err)
                }else if(result){
                    res.send('MODIFIED');
                }else{
                    res.send('COMMAND UNKNOWN');
                }     
            });
        }else if(keyToValue =='phone-number'){
            db.query('UPDATE users SET phone_number = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){
                    console.log(err)
                }else if(result){
                    res.send('MODIFIED');
                }else{
                    res.send('COMMAND UNKNOWN');
                }     
            });
        }else if(keyToValue =='password'){
            db.query('UPDATE users SET user_password = $1 WHERE email = $2 ',[newVal,id],(err, result)=>{
                if (err){
                    console.log(err)
                }else if(result){
                    res.send('MODIFIED');
                }else{
                    res.send('COMMAND UNKNOWN');
                }     
            });
        }  
    }else{
        res.sendStatus(406)
    }
  
});



//VERIFY USER AND GRANT TOKEN

router.post('/old_user', (req, res)=>{
    console.log('JUST HERE');

    if(req.body){
        const {email, password} = req.body;
        db.query('SELECT * FROM users WHERE email = $1 AND user_password = $2',[email,password],(err, result)=>{
            if(err){console.log(err)};
            const {rows} = result;
            if(rows.length != 0){
                console.log('JUST HERE 1');
        generateToken(req, superuser, (err,token)=>{
            console.log('JUST HERE 2');
            if(err){
                    message= 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
                res.status(302).json({ message, error: err.detail, valid:false })


            }else if(token){
                console.log('JUST HERE 3');
                req.session = {id: email};
                message="LOGGED IN SUCCESFULLY AND SESSION CREATED";
                res.status(200).json({ message, token, expire: "1 HOUR", valid:true })
            }else{
                console.log('JUST HERE 4');
                message = "COULD NOT GENERATE A TOKEN FOR THE SESSION";
                res.status(302).json({ message, error: err.detail, valid:false })
            }
        } )
        
            }else if(rows.length == 0){
                console.log('JUST HERE 5');
                    message="INVALID CREDENTIALS !!!"
                res.status(404).json({ message, valid: false })
            }   
        })
                }
                else{
                        return
                }
});








// CREATE USER AND GRANT TOKEN

router.post('/new_user', (req,res)=>{
    const {username, phoneNumber, houseAddress,password,email}  = req.body;  
    console.log(req.body);
       db.query('SELECT * FROM users WHERE email=$1',[email],(err,result)=>{
                   if(err){console.log(err)};
                    const {rows}= result;
               if (rows.length != 0){
                               message ="YOU HAVE AN ACCOUNT ALREADY!!!";
                       res.status(302).json({ message, valid:false })
    }else if (rows.length == 0){
            db.query('SELECT * FROM users WHERE phone_number=$1',[phoneNumber],(err, result)=>{
                if (err){console.log(err)};
                const {rows}= result;
                if (rows.length != 0) {
                        message ='YOUR PHONE NUMBER IS  REGISTERED TO ANOTHER PROFILE!!!'
                    res.status(302).json({ message, valid:false })
                }   if (rows.length == 0){
                    db.query('INSERT INTO users(email,phone_number,username,user_password,address) VALUES($1,$2,$3,$4,$5)',
                    [email,phoneNumber,username,password,houseAddress],
                        (err,result)=>{
                            if(err){
                        console.log(err)
                }else{

                generateToken(req,superuser, (err,token)=>{

                    if(err){
                            message= 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
                        res.status(302).json({ message, error: err.detail, valid:false })


                    }else if(token){

                        message=" NEW USER ADDED AND SESSION CREATED";
                        req.session = {id: email};
                        res.status(200).json({ message, token, expire: "1 HOUR", valid: true })
                    }else{
                        message = "COULD NOT GENERATE A TOKEN FOR THE SESSION";
                        res.status(302).json({ message, error: err.detail, valid:false })
                    }
                } )

                }
                                
            });
                    
            }
        });
    }
 });
   
   
})



export default router;