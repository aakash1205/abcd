const mongoose= require("mongoose");
const {MONGODB_URL}= process.env;
exports.connect=()=>{

    mongoose.connect(MONGODB_URL,{useNewURLParser:true,UseUnifiedTopology:true}).then(()=>{
        console.log(`DB connected successfully!!!!`);

    }).catch((error)=>{
        console.log(`DB connection failed!!!!!`,error);
        process.exit(0);
    })

}