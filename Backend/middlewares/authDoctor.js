// In the userController.js that API which was sent to the frontend to update the Doctor login pannel.
// In that API we access the DocId from the body so we set that DocId in the body by this code.
// We will not get the DocId from the Doctor, Doctor will send the token and by that token we will get the DocId and add that DocId in the req.body.


import jwt from 'jsonwebtoken'

//doctor authentication middleware

const authDoctor = async (req, res, next) => {
    try {
        const { dtoken } = req.headers
        if (!dtoken) {
            return res.json({
                success: false,
                message: " You are not Authorized Login again"
            })
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        
        // After decoding the token we take user id from the data and set in the header
        req.body = req.body || {}
        req.body.docId = token_decode.id

        next()

    } catch (error) {
        console.log(error)
        res.json({
            sucess: false,
            message: error.message
        })
    }
}
export default authDoctor