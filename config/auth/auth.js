import jwt from 'jsonwebtoken';




export default function Authentication(req, res, next){
    const userStr = req.headers["authorization"];

    if(typeof userStr !== "undefined"){

    const userVar = userStr.split(" ");
    const token = userVar[0];
    console.log(token);
     jwt.verify(token,process.env.SECRET,(err, decoded)=>{
        if(err){
            res.status(403).send({ message:"YOU DO NOT HAVE CLARIFICATION TO VIEW THIS DATA", err, valid:false })
        }else if(decoded){
            req.decoded = decoded;
                next();
        }else{
            res.status(403).send({ message:"AUTHORIZATION FAILED", valid: false })
        }

     })

    }else{

        res.status(403).send({ message:"YOU DO NOT HAVE CLARIFICATION TO VIEW THIS DATA", valid: false })

    }


};




export function generateToken(req, superuser, func) {

    const { email, password} = req.body;

    jwt.sign({email, password, superuser},process.env.SECRET , { expiresIn: 60 * 60 },(err, token)=>{
       
                func(err, token);
                })

};


