import express from 'express';
import auth,{ generateToken } from '../config/auth/auth.js';
import  { client as db } from '../db/db3.js';


const router = express.Router();
let message;
const superuser = true;





//UPDATE STATUS *****ADMIN
router.put('/update_status',auth,(req,res)=>{
    const {toUpdateId, userUpdateId, toUpdateStatus}= req.body;
    if ( req.session._ctx && req.session._ctx.decoded.superuser == true ){
        db.query('UPDATE orders SET status = $1 WHERE user_email =$2 AND order_id = $3',
                            [toUpdateStatus,userUpdateId,toUpdateId],(err, result)=>{
                                if(err){
                                    console.log(err)
                                };
                                res.send('updated order status')
                            });
        
    }else{
        res.sendStatus(405);
    }
    
});




//UPDATE LOCATION**** ADMIN
router.put('/update_location',auth,(req,res)=>{
    if ( req.session._ctx && req.session._ctx.decoded.superuser == true ){
        const {userUpdateId,toUpdateLotn,toUpdateId }= req.body;

        db.query('UPDATE orders SET c_location = $1 WHERE user_email =$2 AND order_id= $3',
                    [toUpdateLotn,userUpdateId,parseInt(toUpdateId) ],(err, result)=>{
                        if (err){
                            console.log(err);
                        }  
                        res.send('updated location');
                    })

    }else{
        res.sendStatus(412)
    }
    
});




//GET ALL ORDERS ***** ADMIN

router.get('/admin_orders',auth,(req, res)=>{

    if(req.session._ctx && req.session._ctx.decoded.superuser == true ){
    
               db.query('SELECT * FROM orders',(err, result)=>{
                   if(err){
                       console.log(err);
                   }
                   res.json(result.rows);
               });
    }else{
   
               res.status(403).json({message: "RESTRICTED", valid: false}) 
    }
       
   
   });





// VERIFY ADMIN ***** ADMIN

router.post('/admin',(req, res)=>{
    const {password, email} = req.body;
    db.query('SELECT * FROM admins WHERE email = $1 AND password = $2',
                [email, password],(err, result)=>{
                    if (err){
                        console.log(err);
                    }
                    else if(result){
                    if (result.rows.length == 0){

                        res.status(302).json({ message: 'ADMIN CREDENIALS IS INVALID',valid:false });
                        
                    }else if (result.rows.length != 0){

                        generateToken(req,superuser, (err,token)=>{
                            if(err){
                                    message= 'AN ERROR OCCUR WHILE GENERATING A TOKEN FOR THE SESSION';
                                res.status(302).json({ message, error: err.detail, valid:false })
        
        
                            }else if(token){
                                message=" ADMIN SESSION VALID'";
                                res.status(200).json({ message, token, expire: "1 HOUR", valid: true })
                            }else{
                                message = "COULD NOT GENERATE A TOKEN FOR THE SESSION";
                                res.status(302).json({ message, error: err.detail, valid:false })
                            }
                        } )

                    }
                } else{

                    res.send({ message: 'AN ERROR OCCURED WHILE CHECKING YOUR CREDENTIALS', valid: false })
                }
                })

            }
            );

export default router;


