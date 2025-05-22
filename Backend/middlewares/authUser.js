// In the userController.js that API which was sent to the frontend to update the userprofile.
// In that API we access the userId from the body so we set that UserId in the body by this code.
// We will not get the userId from the user, user will send the token and by that token we will get the UserId and add that userId in the req.body.


import jwt from 'jsonwebtoken'

//user authentication middleware

const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        
        if (!token) {
            return res.json({
                success: false,
                message: " You are not Authorized User again"
            })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        
        // After decoding the token we take user id from the data and set in the header
        req.body = req.body || {}
        req.body.userId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        res.json({
            sucess: false,
            message: error.message
        })
    }
}
export default authUser