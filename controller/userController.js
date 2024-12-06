import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import Users from '../models/users.js'

//@desc Register new user
//@route POST  /api/users
//@access public

export const registerUser = asyncHandler( async(req, res) => {

    const { name, email, password} = req.body

    //form validation
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Enter all fields")
    }

    //check if user already exist
    const userExists = await Users.findOne({email:email})
    if(userExists){
        res.status(400)
        throw new Error("User already exist")
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await Users.create({
        name: name,
        email: email,
        password: hashedPassword,
        
    })

    //check if user was successfully created
    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

//@desc Authenticate user
//@route POST  /api/users/login
//@access public

export const loginUser = asyncHandler( async(req, res) => {

    const { email,password} =  req.body

//check if user exist by email and compare hashed passwords
const user = await Users.findOne({email:email})
if(user && (await bcrypt.compare(password, user.password))){
res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
})
} else {
    res.status(400)
    throw new Error("Invalid credentials")
}

})


//@desc Show user data 
//@route DELETE  /api/users/me
//@access private

export const showUser = asyncHandler( async(req, res, next) => {
const {id, name, email} = await Users.findById(req.user.id)
res.status(200).json({
    _id: id,
    name,
    email,
})
    res.json({message:'Show user'})
})

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

