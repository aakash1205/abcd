const jwt=require("jsonwebtoken");
const auth = (req,res,next)=>{
     //grab token from cookie
     console.log(req.cookies);
     const {token} = req.cookies
     // if no token stop
     if(!token){
         res.status(403).send("unauthorised token");
     }
 
     // decode token and get id
    try {
        const decode= jwt.verify(token,"shhhhh");
        console.log(decode);
        req.user=decode;
    } catch (error) {
        console.log("Error",error);
        res.status(401).send("unauthorised token");
        
    }
 
     // query to db for the user id
     return next();
     
}
module.exports=auth;

