import Conversation from "../model/conversation.modal.js";
import Message from "../model/message.modal.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage= async(req,res)=> {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            }) 
        }

        const newmessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(newmessage){
            conversation.messages.push(newmessage._id);
        }


        //this will run one by one       
        await newmessage.save()
        await conversation.save()


        //socket.io functionality....

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newmessage);
		}

        //this will run.parrell
        //await promise.all([conversation.save(), newmessage.save()])

        res.status(201).json(newmessage);       

    } catch (error) {
        console.log("Error in sending messages",error.message);
        res.status(500).json({error:"Internal server Error"});
    }
}

export const getMessage = async(req,res)=> {

    try {
        
        const {id:userChatId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, userChatId]},
        }).populate("messages"); //not a reference but actuall message

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessage",error.message);
        res.status(500).json({error:"Internal server Error"});
    }
}