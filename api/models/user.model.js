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
    },
    avatar:{
        type:String,
        default:"https://imgs.search.brave.com/7NsHUOzvkyoQx1qVUUkde1oiDgJhv_GssUtWTlBAvzs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8zMC0z/MDc0MTZfcHJvZmls/ZS1pY29uLXBuZy1p/bWFnZS1mcmVlLWRv/d25sb2FkLXNlYXJj/aHBuZy1lbXBsb3ll/ZS5wbmc"
    },
},{
    timestamps:true
});
const User=mongoose.model('User', userSchema);

export default User;