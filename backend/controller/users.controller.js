import User from "../model/user.model.js";

export const getUsersForSidebar = async(req,res)=>{

    try {
        
        const loggedUser = req.user_id

        const filterUsers = await User.find({_id: {$ne: loggedUser}}).select("-password");
        res.status(200).json(filterUsers);
        
    } catch (error) {
         console.log("Error in getUsersForSidebar",error.message);
        res.status(500).json({error:"Internal server Error"});
    }
}