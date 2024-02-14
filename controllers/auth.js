const User = require("../database/models/User");
const asyncHandler = require("../middleware/aysnc");


// description: Register User
// GET: api/v1/auth/register
// access: Public

exports.register = asyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body

    const user = await User.create({
        name,
        email,
        password,
        role
    })
    
    const token = user.getSignedJwtToken()

    res.status(200).json({success: true, token});
  }); 


// description: Login User
// GET: api/v1/auth/login/
// access: Public

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    const user =  await User.findOne({email}).select("+password")
    const isMatch = await user.validatePassword(password)

    if((!user )||(!isMatch) ) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        return next(error)
    }
    
    const token = user.getSignedJwtToken()
 
    res.status(200).json({success: true, token});
  }); 