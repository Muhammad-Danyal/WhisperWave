import mongoose from "mongoose";

 const connectdb= async()=>{
    try {
        await mongoose.connect(process.env.MONGOCONNECT);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Error while Connecting to Database!");
        
    }
}

export default connectdb ;