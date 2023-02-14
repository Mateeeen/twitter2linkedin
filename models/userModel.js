const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        google: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Please enter the name"]
        },
        password: {
            type: String,
        },
        subscribed: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User',userSchema);
module.exports = User;