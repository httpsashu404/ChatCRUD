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

// mongoose connection check
try {
    mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log('Database connected')
} catch {
    console.log('Connection failed')
}

// requere chat.js
const Chat = require('./models/chat')
const { clearScreenDown } = require('readline')

// see all chats
app.get('/chats', async (req, res) => {
    let data = await Chat.find()
    res.render('index', { data })
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
            console.log('Chat saved')
        })
        .catch((err) => {
            console.log(err)
        })
    res.redirect('/chats')
})

// det data for edit chat
app.get('/chats/:id/edit', async (req, res) => {
    let { id } = req.params
    let data = await Chat.findById(id)
    res.render('edit', { data })
})

// update chat
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params
    let data = { msg } = req.body
    let updateChat = await Chat.findByIdAndUpdate(
        id, data,
        { runValidators: true, new: true }
    )
    console.log('Chat updated')
    res.redirect('/chats')
})

// delete chat
app.delete('/chats/:id', async (req, res) => {
    let { id } = req.params
    let delChat = await Chat.findByIdAndDelete(id)
    console.log('Chat deleted')
    res.redirect('/chats')
})

// server get requiest
app.get('/', (req, res) => {
    res.send('Working well : <a href="/chats"> localhost:8080/chats</a>')
})

// server listen port qurey
app.listen(PORT, () => {
    console.log(`Server has started on : ${PORT}`)
})