// import User from "../model/user.model.js";
// import bcrypt from "bcryptjs"
// import genToken from "../utils/gentoken.js";

// export const signup = async(req,res)=> {
//    try {
//      const {fullname, username, password, confirmPassword} = req.body;

//      if(password!== confirmPassword){
//         return res.status(400).json({error:"Password did not match!"})
//      }

//      const user = await User.findOne({username});
//      if(user){
//         return res.status(400).json({error:"Username already exist, try another one"})
//      }

//      //hash password         
//      const salt = await bcrypt.genSalt(10);
//      const hashpassword = await bcrypt.hash(password,salt);

//      //https://avatar-placeholder.iran.liara.run/
//      const profilepic = `https://avatar.iran.liara.run/username?username=${username}`;

//      const newuser = new User({
//         fullname: fullname,
//         username: username,
//         password: hashpassword,
//         profilePic:profilepic,
//      })

//      if(newuser)
//         {  
//             console.log(newuser);
//           //generating JWT
//             genToken(newuser._id, res)

//           await newuser.save(); 
//           res.status(201).json({
//              _id: newuser._id,
//              fullname: newuser.fullname,
//              username: newuser.username,
//              profilepic: newuser.profilepic
//            })
        
//         }
//     else{
//         res.status(500).json({error:"Invalid credentials"})
//     }
//    } catch (error) {
//     console.log("eror in signup controller", error.message);    
//     res.status(500).json({error:"internal server error" })
//    }
// }

// export const login = async(req,res)=>{
//     try {
//         const {username, password} = req.body;
//         const user = await User.findOne({username})
//         if(!user){
//             return res.status(400).json({error:"Username not found"})
//         }
//         const isPasswordCorrect = await bcrypt.compare(password,user.password)

//         if(!isPasswordCorrect){
//             return res.status(400).json({error:"Password not correct"})
//         }

//         genToken(user._id,res);
//         res.status(200).json({
//             _id: user._id,
//             fullname: user.fullname,
//             username: user.username,
//             profilepic: user.profilepic,
//         });

//     } catch (error) {
//         console.log("eror in login controller", error.message);    
//         res.status(500).json({error:"internal server error",error })
//     }    
// }

// export const logout = (req,res)=>{
//     try {
//         res.cookie("jwt","",{maxAge:0 });
//         res.status(200).json({message:"Logged out Successfully"})
//     } catch (error) {
//         console.log("eror in logout controller", error.message);    
//         res.status(500).json({error:"internal server error" })
//     }
    
// }



// // module.exports = {
// //     signup,
// //     login,
// //     logout,
// // }

import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import genToken from "../utils/gentoken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		const user = await User.findOne({ username });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// https://avatar-placeholder.iran.liara.run/

		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		const newUser = new User({
			fullName: fullName,
			username: username,
			password: hashedPassword,
			gender: gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		if (newUser) {
			// Generate JWT token here
            genToken(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		genToken(user._id,res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};