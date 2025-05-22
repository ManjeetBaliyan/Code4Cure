// here when we will add to a doctor then we will check for the jwt genrated token for the Admin if we have that token then we add doctors otherwise not 
import jwt from 'jsonwebtoken'

//admin authentication middleware

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({
                success: false,
                message: "hello You are not Authorized Login again"
            })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "You are not a person Authorized Login again"
            })
        }

        next()

    } catch (error) {
        console.log(error)
        res.json({
            sucess: false,
            message: error.message
        })
    }
}
export default authAdmin