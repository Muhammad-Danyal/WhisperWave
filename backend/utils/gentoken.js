import jwt from 'jsonwebtoken';

const genToken =(userId, res)=>{
    const token = jwt.sign({userId}, process.env.SECRET , {expiresIn: '30d'});

    //setting as cookie
    res.cookie("jwt",token,{
        maxAge:30* 24 *60 *60 *1000, //MS
        httpOnly: true,
        samesite:"strict",
    })
}

export default genToken;