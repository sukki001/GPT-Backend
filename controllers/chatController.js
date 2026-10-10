import Chat from "../model/chatSchema.js"
import Message from "../model/messageSchema.js"

//getRecentChats, getSingleChat, deleteChat , createChat

//req.user : user ki saari info from authentication

import messageRouter from "../routes/messageRouter.js";

export const getRecentChat = async (req , res)=>{
    try{

        const chats = await Chat.find({userId : req.user._id})
                                .select(" topic updatedAt ")
                                .sort({updatedAt : -1})
                                .limit(20);

        res.status(200).json({
            message : "your All recent chats ",
            chats
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
}

export const getSingleChat = async (req , res)=>{
    try{

        const {chatId} = req.params;

        const chat = await Chat.findOne({ _id : chatId , userId : req.user._id});

        if(!chat)
        {
            return res.status(404).json({
                message: "Sorry Not found"
            })
        };


        res.status(200).json({
            chatId : chat._id,
            userId : chat.userId,
            topic : chat.topic ,
            usage : chat.usage
        })
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
}

export const createChat = async (req , res)=>{
    try{
        
        const {model} = req.body;

        if(!model)
        {
            return res.status(400).json({
                message: "Model Name is missing"
            })
        }

        const chats = await Chat.create({
            userId : req.user._id,
            model
        })


        res.status(201).json({
            chatId : chats._id,
            userId : req.user._id,
            model,
            topic : chats.topic,
            createdAt : chats.createdAt
        })
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
    
}

export const deleteChat = async (req , res)=>{
    try{

        const {chatId} = req.params;

        const chat = await Chat.find({_id : chatId , userId : req.user._id});

        if(!chat)
        {
            return res.status(403).json({
                message: "You're not allowed to do this"
            })
        };

        await Chat.deleteOne({
            _id : chatId
        })
        
        await Message.deleteMany({ 
            chatId : chat._id
          })


          res.status(200).json({
            message:"Your Chats deleted successfully"
          })
    
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }

}