var models = require('../dataBase/db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../dataBase/sql')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 登录
router.post('/toLogin', (req, res) => {
  debugger
  var sql = $sql.user.login
  var params = req.body
  conn.query(sql, [params.username], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 用户账号是否存在
router.post('/getUserName', (req, res) => {
  var sql = $sql.user.selectName
  var params = req.body
  conn.query(sql, [params.username, params.password], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 获取用户信息
router.get('/getUser', (req, res) => {
  var sql = $sql.user.selectUser
  conn.query(sql, function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 分页数据
router.post('/getPageData', (req, res) => {
  var sql = $sql.user.selectPage
  var params = req.body
  conn.query(sql, [params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.insertUser
  var params = req.body
  conn.query(sql, [params.nickName, params.username, params.password, params.phone, params.addDate, params.state], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 更新用户接口
router.post('/updateUser', (req, res) => {
  var sql = $sql.user.updateUser
  var params = req.body
  conn.query(sql, [params.nickName, params.username, params.password, params.phone, params.addDate, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      console.log(result)
      jsonWrite(res, result)
    }
  })
})
// 删除用户
router.post('/deleteUser', (req, res) => {
  var sql = $sql.user.deleteUser
  var params = req.body
  conn.query(sql, [params.id], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router
