

var imgurl=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myValue:''
  },
  test:function(){
  
    console.log(this.data.myValue)
  },
 
  CUImage2() {
    const content=this.data.myValue
    console.log(content)
    // console.log(this.data.myValue)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res=> {
        var filePath = res.tempFilePaths[0]
            this.setData({
             
              imgurl:filePath 
            })
          
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
              fileID:fileID,
              imgurl:fileID
            })
            db.collection('tuwenxinxi').add({
              data: {
                name: name,
                content: content,
                imgurl: fileID,
              }
            })
            .then(result => {
              console.log("数据库写入成功", result)
              
            })
            .catch(err => {
              console.error("数据库写入失败", err)
            })}})
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