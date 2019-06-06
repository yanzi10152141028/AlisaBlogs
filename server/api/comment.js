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
// 添加评论
router.post('/addComment', (req, res) => {
  var sql = $sql.comment.insertComment
  var params = req.body
  conn.query(sql, [params.username, params.content, params.url, params.addDate], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 查询评论
router.get('/getComment', (req, res) => {
  var sql = $sql.comment.selectComment
  conn.query(sql, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 查询最新评论
router.post('/getNewComment', (req, res) => {
  var sql = $sql.comment.selectNewDate
  var parames = req.body
  conn.query(sql, [parames.addDate], function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 查询分页
router.post('/getPageData', (req, res) => {
  var sql = $sql.comment.selectPage
  var params = req.body
  conn.query(sql, [params.currentPage, params.pageSize], function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除评论
router.post('/delData', (req, res) => {
  var sql = $sql.comment.deletComment
  var params = req.body
  conn.query(sql, [params.id], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router
