// pages/home/imgshow2/imgshow2.js
var DB = wx.cloud.database().collection("xiangce")
var db = wx.cloud.database().collection("xiangce")
var app = getApp()  
Page({
  // async checkUser() {
  //   //获取clouddisk是否有当前用户的数据，注意这里默认带了一个where({_openid:"当前用户的openid"})的条件
  //   const userData = await db.collection('image1').get()
  //   console.log("当前用户的数据对象",userData)

  //   //如果当前用户的数据data数组的长度为0，说明数据库里没有当前用户的数据
  //   if(userData.data.length === 0){
  //     //没有当前用户的数据，那就新建一个数据框架，其中_id和_openid会自动生成
  //     return await db.collection('xiangce').add({
  //       data:{
  //         //nickName和avatarUrl可以通过getUserInfo来获取，这里不多介绍
  //         "nickName": "",
  //         "avatarUrl": "",
  //         "albums": [ ],
  //         "folders": [ ]
  //       }
  //     })
  //   }else{
  //     this.setData({
  //       userData
  //     })
  //     console.log('用户数据',userData)
  //   }
  // },
/*返回到上一页*/
  navigateBack() {
    wx.navigateBack({
        delta: 1
    })
},
/*返回到页面顶部*/
scrollToTop() {
  wx.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
},
CUImage5() {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: res=> {
      const filePath = res.tempFilePaths[0]
      const cloudPath = `image2/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log("云存储上传成功", res)
          const db = wx.cloud.database()
          const name = `image2-${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
          const fileID = res.fileID
          this.setData({
            fileID:fileID
          })
          db.collection('xiangce').add({
            data: {
              name: 'inshow5',
              fileID: fileID,
            }
          })
          .then(result => {
            console.log("数据库写入成功", result)
          })
          .catch(err => {
            console.error("数据库写入失败", err)
          })
        },
      })
    },
  })
},
// getFiles() {
//   const db = wx.cloud.database()  //获取数据库的引用
//   db.collection("image2")
//   .get()
//   .then(res => {
//     console.log('用户数据',res.data)
//   })
//   .catch(err => {
//     console.error(err)
//   })
// },
  /**
   * 页面的初始数据
   */
  data: { xianshi2:'false',
    xiangce5:[],
    // image:[
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-1.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-2.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-3.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-4.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-5.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-6.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-7.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-8.jpg"},
    //   {imgurl:"https://image-1302635214.cos.ap-chengdu.myqcloud.com/image2-9.jpg"},
     
    // ],
    fileID:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.cloud.callFunction({
      name: "getxxkey",
      success(res) {
        
        that.setData({
          xianshi2: res.result.data[0].name,
        })
     
      },
      fail(res) {
       
      }

    })





    wx.cloud.database().collection("xiangce").where({
      name: 'inshow5',
    }).get({
      success(res) {
        console.log("请求云函数成功噜啦噜啦嘞绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿绿", res)
        that.setData({
          xiangce5: res.data.reverse(),
        })
      },
      fail(err) {
        return err
      }
    })
    // this.checkUser()
    // this.getFiles()
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})