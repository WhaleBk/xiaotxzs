// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


  var openid = wxContext.OPENID




  return cloud.database().collection("tuwenxinxi").where({
    _openid: openid,
  }).get({
    success(res) {
      return res
    },
    fail(err) {
      return err
    }
  })

}