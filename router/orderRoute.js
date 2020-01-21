import express from 'express';
import auth from '../config/auth/auth.js';
import  { client as db } from '../db/db3.js';


const router = express.Router();
let message;






// GET USER ORDERS
router.get('/order', auth, (req, res)=>{
    if( req.session._ctx ){
        console.log('here')
        const { email }= req.session._ctx.decoded;
        const id = email;
            db.query('SELECT * FROM orders WHERE user_email = $1',[id],(err, result)=>{
                if (err){
                    console.log(err)
                }
                else if(result){
                res.json(result.rows);
                }
            });
    }else{
        message ="NO CREDENTIALS";
        res.status(412).send({ message, sucess: false })
}

});





//UPDATE ORDER DESTINATION
router.put('/update_destination',auth,(req,res)=>{
    if( req.session._ctx ){
        const { email }= req.session._ctx.decoded;
        const id = email;
        const {ordId, upDestnAddress }=req.body;
        db.query('UPDATE orders SET destination_address= $1 WHERE user_email = $2  AND order_id = $3',
                        [upDestnAddress,id,parseInt(ordId)],(err ,result)=>{
                            if (err){
                                console.log(err);
                            }
                        else if (result){
                            message=`UPDATED DESTINATION ORDER  ${id}`
                            res.send({ message, sucess: true });
                        }
                        })
    }else{
        message ="NO CREDENTIALS";
        res.status(412).send({ message, sucess: false })
    }
});





//GET ORDER LOCATION
router.get('/map',(req,auth,res)=>{
    if(req.session._ctx ){
        const { email }= req.session._ctx.decoded;
        const id = email;
        const ord=req.query.ordCk;
       db.query('SELECT pickup_address, c_location FROM orders WHERE user_email=$1 AND order_id = $2',
                    [id,parseInt(ord)],(err, result)=>{
                        if(err){
                            console.log(err)
                        };
                        res.json(result.rows);
                    })

    }else{
            message ="NO CREDENTIALS";
        res.status(412).send({ message, sucess: false })
    }

});




//DELETE ORDER
router.delete('/delete_order/:del',auth,(req,res)=>{
    console.log(req.params.del)
    
    if(req.session._ctx ){
    const del = parseInt(req.params.del);
    const { email }= req.session._ctx.decoded;
    const id = email;
        db.query('DELETE FROM orders WHERE user_email = $1 AND order_id = $2',[id,del],(err, result)=>{
            if (err){
                console.log(err)
            }
            else if(result){

                    message= `ORDER ${del} DELETED`;
                res.send({ message, sucess: true });
            }
            else{

            }

        });
        
    }else{
        message ="NO CREDENTIALS";
        res.status(405).send({ message, sucess: false })
    }
});






// ADD NEW ORDER
router.post('/new_order',auth,(req,res)=>{
    if(req.session._ctx ){  
        const { receiverName,
                destinationAddress,
                pickupAddress, 
                receiverPhoneNumber,
       } = req.body;

        const { email }= req.session._ctx.decoded;
        const id = email;
db.query('SELECT MAX(order_id) FROM orders WHERE user_email=$1',[id],(err, result)=>{

        let order_id_Nt;
    if (err){
        console.log(err)
    }
else if (result.rows[0].max != null){
    let {max}= result.rows[0];
        order_id_Nt = max + 1;
     
    }
else if(result.rows[0].max == null){
        order_id_Nt = 1;
    }else{
        console.log('ERR CREATING ORDER ID')
    };

db.query('INSERT INTO orders(user_email, order_id, receiver_name,destination_address,pickup_address,receiver_phone_no) VALUES($1,$2,$3,$4,$5,$6)',
            [id,order_id_Nt,receiverName,destinationAddress,pickupAddress,receiverPhoneNumber],
            (err, results)=>{
                    if (err){
                        console.log(err);
            };
            
            db.query('SELECT order_counts FROM users WHERE email = $1',[id],(err, result)=>{
                if (err){
                    console.log(err);
                }
                else if(result){
                const  new_count = result.rows[0].order_counts + 1;

                    db.query('UPDATE users SET order_counts = $2 WHERE email = $1',[id,new_count],(err,result)=>{

                    if (err){
                        console.log('errrrrr'+ err);
                    };
                        message="ORDER ENTRY ADDED";
                    res.send({message, sucess: true})

                });
            }else{
                console.log('ERR UPDATING ORDERS SUM FOR USER')
            }
                
            });
                  
                
     }
);

    
});



    }else{
        res.status(406)
    }

});


export default router;