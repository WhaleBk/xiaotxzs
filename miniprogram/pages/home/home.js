// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xianshi2: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name: "getxxkey",
      success(res) {
        console.log("请求云函数成功", res)
        that.setData({
          xianshi2: res.result.data[0].name,
        })
        console.log(that.data.xianshi2)
      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })

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