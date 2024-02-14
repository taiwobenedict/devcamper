const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please input your name!"]
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
        required: [true, "Please input your email"],
        unique: [true, "User with this email already exist"]
    },
    role: {
        type: String,
        enum: ["user", "publisher"],
        default: "user"
    },
    password: {
        type: String,
        required: [true, "Please input your password"],
        select: false,
        minlength: 6,
    },
    resetPassword: String,
    resetPasswordExpire: Date,
    createAt: {
        type: Date,
        default: Date.now(),
    }
})

UserSchema.pre('save', async function(next) {
    const user = this

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next()
})

UserSchema.methods.getSignedJwtToken = function () {
    user = this
    const accessToken = jwt.sign({id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    } )
    return accessToken
}

UserSchema.methods.validatePassword = async function (enterdPassword) {
    user = this
    const isValid = await bcrypt.compare(enterdPassword, user.password)
    return isValid
}


module.exports = mongoose.model("User", UserSchema)