import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true

    },
    age : {
        type : Number
    },

    email : {
        type : String,
        require : true,
        unique : true 
    },

    password : {
        type : String,
        require : true,

    },

    usage : {
        tokenUsed : {
            type : Number,
            default : 0,
        },
        tokenLimit : {
            type : Number,
            default : process.env.TOKEN_LIMIT,
        },

        resetAt : {
            type : Date,
            default : new Date(Date.now() + 5 * 60 * 60 * 1000)
        },

        totalTokenUsed : {
            type : Number,
            default : 0
        }
    }
} , {timestamps : true} );

const User = mongoose.model("User" , userSchema);

export default User;

