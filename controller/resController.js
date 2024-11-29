import asyncHandler from 'express-async-handler'

//@desc Get response
//@route GET  /api/
//@access 

export const getResponse = asyncHandler(async(req, res)=> {
    res.send("Hello World!")
})

export const setResponse = asyncHandler(async(req, res) =>{
    if(!req.body){
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({Message: 'Set Response'})
})


