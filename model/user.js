const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        default:null,
    },
    lastname:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null,
        unique:true,
    },
    password:{
        type:String,
        default:null,
    },
    token:{
        type:String,
        default:null,
    }

})

module.exports = mongoose.model("user", userSchema);
// module.exports = mongoose.export("user",userSchema)