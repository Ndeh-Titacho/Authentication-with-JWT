import asyncHandler from 'express-async-handler'
import Response from '../models/resModel.js'
import Users from '../models/users.js'


//@desc Get response
//@route GET  /api/
//@access 

export const getResponse = asyncHandler(async(req, res)=> {

    const response = await Response.find({user: req.user.id})
    res.json(response )
})

//@desc set response
//@route POST  /api/
//@access 

export const setResponse = asyncHandler(async(req, res) =>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const response = await Response.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(response)

  
})

//@desc update response
//@route PUT  /api/
//@access 

export const updateResponse = asyncHandler(async(req, res)=> {

    const response = await Response.findById(req.params.id)

    if(!response){
        res.status(400)
        throw new Error('Item not found')
    }

    const user = await Users.findById(req.user.id)

    //check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //check if goal user is same as the logged in user
    if( response.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not found')
    }

    const updatedResponse = await Response.findByIdAndUpdate(req.params.id, req.body, {new: true})


    res.status(200).json(updatedResponse )
})

//@desc delete response
//@route DELETE  /api/
//@access 

export const deleteResponse = asyncHandler(async( req, res) => {
    const response = await Response.findById(req.params.id)

    if(!response){
        res.status(400)
        throw new Error("Item not found")
    }

    const user = await Users.findById(req.user.id)

    //check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //check if goal user is same as the logged in user
    if( response.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not found')
    }

     await Response.deleteOne()

     res.status(200).json({id: req.params.id})
})



