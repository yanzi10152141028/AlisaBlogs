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
// 添加前端框架
router.post('/addNew', (req, res) => {
  var sql = $sql.new.insertNew
  var params = req.body
  conn.query(sql, [params.title, params.type, params.addDate, params.imgUrl, params.content], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询前端框架
router.get('/getNew', (req, res) => {
  var sql = $sql.new.selectNew
  conn.query(sql, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 更新前端框架
router.post('/updateNew', (req, res) => {
  var sql = $sql.new.updateNew
  var params = req.body
  conn.query(sql, [params.title, params.type, params.addDate, params.imgUrl, params.content, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除前端框架
router.post('/delNew', (req, res) => {
  var sql = $sql.new.deleteNew
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
  var sql = $sql.new.selectPage
  var params = req.body
  conn.query(sql, [params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 查询类型
router.post('/getTypeData', (req, res) => {
  var sql = $sql.new.selectType
  var params = req.body
  conn.query(sql, [params.type, params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) { jsonWrite(res, result) }
  })
})

module.exports = router
