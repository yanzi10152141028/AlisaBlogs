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
// 增加我的故事
router.post('/addAboutus', (req, res) => {
  var sql = $sql.aboutus.insertAboutus
  var params = req.body
  conn.query(sql, [params.title, params.url, params.type, params.addDate], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询我的故事
router.get('/getAboutus', (req, res) => {
  var sql = $sql.aboutus.selectAboutus
  conn.query(sql, function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 更新菜单接口
router.post('/updateAboutus', (req, res) => {
  var sql = $sql.aboutus.updateAboutus
  var params = req.body
  conn.query(sql, [params.title, params.type, params.addDate, params.url, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除菜单
router.post('/delAboutus', (req, res) => {
  var sql = $sql.aboutus.deleteAboutus
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
  var sql = $sql.aboutus.selectPage
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
  var sql = $sql.aboutus.selectType
  var params = req.body
  conn.query(sql, [params.type,params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) { jsonWrite(res, result) }
  })
})

module.exports = router
