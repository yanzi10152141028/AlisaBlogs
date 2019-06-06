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
// 增加菜单
router.post('/addMenu', (req, res) => {
  var sql = $sql.menu.insertMenu
  var params = req.body
  conn.query(sql, [params.text, params.path, params.name, params.url, params.addDate, params.num,params.type,params.menuType], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 查询菜单
router.post('/getMenu', (req, res) => {
  var sql = $sql.menu.selectMenu;
  var params = req.body;
  conn.query(sql,[params.type], function (err, result) {
    if (err) { console.log(err) }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 更新菜单接口
router.post('/updateMenu', (req, res) => {
  var sql = $sql.menu.updateMenu
  var params = req.body
  conn.query(sql, [params.text, params.path, params.addDate, params.url, params.id], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})
// 删除菜单
router.post('/delMenu', (req, res) => {
  var sql = $sql.menu.deleteMenu
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
  var sql = $sql.menu.selectPage
  var params = req.body
  conn.query(sql, [params.currentPage, params.pageSize], function (err, result) {
    if (err) throw err
    if (result) {
      jsonWrite(res, result)
    }
  })
})
module.exports = router
