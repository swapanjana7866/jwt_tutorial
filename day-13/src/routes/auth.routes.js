const express = require('express')
const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken")
const authRouter= express.Router()

authRouter.post("/register", async (req,res) =>{
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if (isUserAlreadyExists){
        return res.status(409).json({
            message:"userall ready exits ith this email adress"
        })
        
    }



    const user = await userModel.create({
        name,email,password
    })


    const token = jwt.sign(
        {
        id:user.id,
        email:user.email
    },
    process.env.JWT_SECRET
)
    res.cookie("jwt_token",token)


    res.status(201).json({
        message:"user register",
        user,
        token
    })

})
authRouter.post("/protected",(req,res) => {
    console.log(req.cookies);
    res.status(200).json({
        message:"protected route"
    })
})
module.exports = authRouter