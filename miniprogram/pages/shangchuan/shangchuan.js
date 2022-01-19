// pages/shangchuan/shangchuan.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    myValue: 0,
    value:10
  },
  test:function(){
    console.log(this.data.myValue);
  },
  CUImage2() {
    var that = this //创建一个名为that的变量来保存this当前的值  
    wx.request({  
       url: '',  
       method: 'post',  
       data: {  
         openid: 'openid'  ,//这里是发送给服务器的参数（参数名：参数值）  
         Text:'hahahaahahaha'
       },  
       header: {  
         'content-type': 'application/x-www-form-urlencoded'  //这里注意POST请求content-type是小写，大写会报错  
       },  
       success: function (res) {  
         that.setData({ //这里是修改data的值  
           test: res.data //test等于服务器返回来的数据  
         });  
         console.log(res.data)  
       }  
   });  
    
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res=> {
        const filePath = res.tempFilePaths[0]
        const cloudPath = `index/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log("云存储上传成功", res)
            const db = wx.cloud.database()
            const name = `index-${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
            const fileID = res.fileID
            this.setData({
              fileID:fileID
            })
            db.collection('index').add({
              data: {
                name: name,
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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