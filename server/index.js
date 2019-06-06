const userApi = require('./api/userApi')
const menu = require('./api/menu')
const comment = require('./api/comment')
const aboutus = require('./api/aboutus')
const question = require('./api/question')
const newFrame = require('./api/new')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/user', userApi)
app.use('/api/menu', menu)
app.use('/api/comment', comment)
app.use('/api/aboutus', aboutus)
app.use('/api/question', question)
app.use('/api/new', newFrame)
// 监听端口
app.listen(8088)
console.log('success listen at port:8088......')
