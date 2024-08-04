import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        requirred: true,
        unique:true,
        
    },
    email:{
        type:String,
        requirred: true,
        unique:true,

    },

    password:{
        type:String,
        requirred: true,
    }
},{
    timestamps:true
});
const User=mongoose.model('User', userSchema);

export default User;