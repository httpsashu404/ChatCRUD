// require express
const express = require('express')
// require path for EJS file
const path = require('path')
// require method-override
const methodOverride = require('method-override')

// store express
const app = express()
// port defind
const PORT = 8080

// access EJS file
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')))
// use methodOverride
app.use(methodOverride('_method'))

// read data from hidden url
app.use(express.urlencoded({ extended: true }))
// require mongoose
const mongoose = require('mongoose');

// mongoose connection qurey
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// check mongoose connection
main().then(() => {
    console.log('Connection successful')
})
    .catch(err => console.log(err));

// requere chat.js
const Chat = require('./models/chat')

// see all chats
app.get('/chats', async (req, res) => {
    let chats = await Chat.find()
    res.render('index', { chats })
})

// get new chat data
app.get('/chats/new', (req, res) => {
    res.render('new')
})

// insert a new chat
app.post('/chats', (req, res) => {
    let { from, to, msg } = req.body
    let newChat = new Chat(
        {
            from: from,
            to: to,
            msg: msg,
            create_at: new Date()
        }
    )
    newChat.save()
        .then((res) => {
            console.log('Chat was saved')
        })
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/chats')
})

// edit chat
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params
    let chat = await Chat.findById(id)
    res.render('edit', { chat })
})

// update chat
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params
    let { msg: newMsg } = req.body
    let updateChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    )
    res.redirect('/chats')
})

// delete chat
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params
    let delChat = await Chat.findByIdAndDelete(id)
    res.redirect('/chats')
})

// server get requiest
app.get('/', (req, res) => {
    res.send('Listen properly')
})

// server listen port qurey
app.listen(PORT, () => {
    console.log(`Server has started on : ${PORT}`)
})