// require mongoose
const mongoose = require('mongoose');
// requere chat.js
const Chat = require('./models/chat')

// mongoose connection qurey
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// check mongoose connection
main().then(() => {
    console.log('Connection successful')
})
    .catch(err => console.log(err));

// Araay of chats
let allChat = ([
    {
        from: 'Ashu',
        to: 'Pankaj',
        msg: 'Hii Pankaj how are you?',
        create_at: new Date(),
    },
    {
        from: 'Aditya',
        to: 'Rishav',
        msg: 'Hii Rishav whare are you',
        create_at: new Date(),
    },
])

Chat.insertMany(allChat)