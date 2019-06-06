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
// 增加问题
router.post('/addQuestion', (req, res) => {
  var sql = $sql.question.insertQuestion
  var params = req.body
  conn.query(sql, [params.question, params.answer, params.addDate], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询问题
router.get('/getQuestion', (req, res) => {
  var sql = $sql.question.selectQuestion
  conn.query(sql, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 更新问题
router.post('/updateQuestion', (req, res) => {
  var sql = $sql.question.updateQuestion
  var params = req.body
  conn.query(sql, [params.question, params.answer, params.addDate, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除菜单
router.post('/delQuestion', (req, res) => {
  var sql = $sql.question.deleteQuestion
  var params = req.body
  conn.query(sql, [params.id], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 分页数据
router.post('/getPageData', (req, res) => {
  var sql = $sql.question.selectPage
  var params = req.body
  conn.query(sql, [params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router
