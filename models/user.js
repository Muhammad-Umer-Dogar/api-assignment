const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'First name required'],
        maxLength: [15, 'First name cannot exceed 15 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Last name required'],
        maxLength: [15, 'Last name cannot exceed 15 characters']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        validate: [validator.isEmail, 'Email invalid']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        minlength: [6, 'password must be longer than 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', userSchema);