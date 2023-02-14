const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter the name"]
        },
        name: {
            type: String,
            required: [true, "Please enter the name"]
        },
        description: {
            type: String,
            required: [true, "Please enter the decription"]
        },
        like: {
            type: Number,
            required: [true, "Please enter the likes"]
        },
        retweets: {
            type: Number,
            required: [true, "Please enter the retweets"]
        },
        comment: {
            type: Number,
            required: [true, "Please enter the comments"]
        },
        view: {
            type: Number,
            required: [true, "Please enter the views"]
        },
    },
    {
        timestamps: true
    }
)

const Image = mongoose.model('Image',imageSchema);
module.exports = Image;