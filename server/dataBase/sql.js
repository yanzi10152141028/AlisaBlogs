// sql语句
module.exports = {
  user: {
    login: 'select password from user where username= ? ',
    selectUser: 'select * from user order by id desc',
    insertUser: 'insert into user (nickName,username,password,phone,addDate,state) values (?,?,?,?,?,?)',
    selectName: 'select   password from user where username= ?',
    deleteUser: 'delete from user WHERE id=?',
    selectPage: 'select * from user order by addDate desc limit ?,?',
    updateUser: 'update user SET nickName=?,username=?,password=?,phone=?,addDate=? where id=?'
  },
  menu: {
    insertMenu: 'insert into menu (text,path,name,url,addDate,num,type,menuType) values(?,?,?,?,?,?,?,?)',
    selectMenu: 'select * from menu  where type=? order by num asc ',
    updateMenu: 'update menu SET text=?,path=?,addDate=?,url=? where id=?',
    deleteMenu: 'delete from menu WHERE id=?',
    selectPage: 'select * from menu  order by addDate desc limit ?,?'
  },
  comment: {
    insertComment: 'insert into comments (username,content,url,addDate) values(?,?,?,?)',
    selectComment: 'select * from comments order by addDate desc',
    selectNewDate: 'select * from comments as b where not exists(select * from comments where  b.addDate<?) order by addDate desc ',
    selectPage: 'select* from comments order by addDate desc limit ?,?',
    deletComment: 'delete from comments WHERE id=?'
  },
  aboutus: {
    insertAboutus: 'insert into aboutus (title,url,type,addDate) values(?,?,?,?)',
    selectAboutus: 'select * from aboutus order by addDate desc',
    selectPage: 'select * from aboutus order by addDate desc limit ?,?',
    deleteAboutus: 'delete from aboutus WHERE id=?',
    updateAboutus: 'update aboutus SET title=?,type=?,addDate=?,url=? where id=?',
    selectType: 'select * from aboutus where type=? order by addDate desc  limit ?,?'
  },
  question: {
    insertQuestion: 'insert into question (question,answer,addDate) values(?,?,?)',
    deleteQuestion: 'delete from question WHERE id=?',
    updateQuestion: 'update question SET question=?,answer=?,addDate=? where id=?',
    selectQuestion: 'select * from question order by addDate desc',
    selectPage: 'select * from question order by addDate desc limit ?,?'
  },
  new: {
    insertNew: 'insert into new (title,type,addDate,imgUrl,content) values(?,?,?,?,?)',
    selectNew: 'select * from new order by addDate desc',
    selectPage: 'select * from new order by addDate desc limit ?,?',
    deleteNew: 'delete from new WHERE id=?',
    updateNew: 'update new SET title=?,type=?,addDate=?,imgUrl=?,content=? where id=?',
    selectType: 'select * from new where type=? order by addDate desc  limit ?,?'
  }
}
