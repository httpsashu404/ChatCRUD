// requre mongoose 
const mongoose = require('mongoose')

// write schema 
const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        require: true,
    },
    to: {
        type: String,
        require: true,
    },
    msg: {
        type: String,
        maxLength: 100,
    },
    create_at: {
        type: Date,
        require: true,
    },
})

// create model
const chat = mongoose.model('chat', chatSchema)

// export module
module.exports = chat