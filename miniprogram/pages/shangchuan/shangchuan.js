var filePath = ''
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    navH: 0,
    theme: {
      color: '#1890FF',
      tabColor: '#333' || '#20ACAB',
    },
    leixing:'',
    xianshi2: false,
    navH: 0,
    theme: {
      color: '#1890FF',
      tabColor: '#333' || '#20ACAB',
    },
    topic: {
      sorts: ["重要通知","闲置交易", "表白交友", "疑问互答", "任务兼职",
        "相约学习", "实物招领", "趣事分享"
      ], selected:0
      
    },
    content: "",

    imageList: [],

    anonymous: false,



    myValue: '',
    imgurl: '',
    openid: '0000000',
    yonghuxinxi: []
  },
  test: function () {

    console.log(this.data.myValue)

    console.log(this.data.imgurl)
  },

  // 清空照片或者图片
  clearInput: function (name) {
    if (name != 'imageList') {
      this.setData({
        imageList: []
      })
    }
    if (name != 'video') {
      this.setData({
        video: {}
      })
    }
  },

  // 选择照片
  chooseImage: function (e) {
    var that = this;
    let surplus = 9 - this.data.imageList.length
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.clearInput("imageList");
        that.addNewImage(res.tempFilePaths);
        wx.showToast({
          title: '上传成功！',
        })

        console.log(that.data.imageList)
      }
    })
  },

  addNewImage(imagePath) {
    var list = this.data.imageList
    list = list.concat(imagePath)
    this.setData({
      imageList: list
    })
  },

  thisImage: function (e) {
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    wx.previewImage({
      urls: list,
      current: list[index]
    })
  },

  deleteImage: function (e) {
    let index = e.currentTarget.dataset.imageid;
    let list = this.data.imageList;
    list.splice(index, 1)
    this.setData({
      imageList: list
    })
  },

  // 发布的类型
  clickTag: function (e) {

    console.log(e) 
    let topicId = e.target.dataset.topicid;
    let topic = this.data.topic;
    topic.selected = topicId;
    this.setData({
      topic
    })



    
    this.setData({
      leixing:this.data.topic.sorts[e.target.dataset.topicid]
    })
  
  },

  CUImage2() {
    const content = this.data.myValue
    console.log(content)
    // console.log(this.data.myValue)
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        filePath = res.tempFilePaths[0]
        this.setData({

          imgurl: filePath
        })


        // const cloudPath = `index/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
        // wx.cloud.uploadFile({
        //   cloudPath,
        //   filePath,
        //   success: res => {
        //     console.log("云存储上传成功", res)
        //     const db = wx.cloud.database()
        //     const name = `index-${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
        //     const fileID = res.fileID
        //     this.setData({
        //       fileID:fileID,
        //       imgurl:fileID
        //     })
        //     db.collection('tuwenxinxi').add({
        //       data: {
        //         name: name,
        //         content: content,
        //         imgurl: fileID,
        //       }
        //     })
        //     .then(result => {
        //       console.log("数据库写入成功", result)

        //     })
        //     .catch(err => {
        //       console.error("数据库写入失败", err)
        //     })}})
      },
    })
  },



  CUImage1() {
    for (let i = 0; i < this.data.imageList.length; i++) {

      const content = this.data.myValue
      console.log(content)
      // const filePath = this.data.imgurl
      const filePath = this.data.imageList[i]
      console.log(filePath)
      const cloudPath = `index/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}` + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log("云存储上传成功", res)
          const db = wx.cloud.database()
          const name = `index-${Date.now()}-${Math.floor(Math.random(0,1)*1000)}` + filePath.match(/\.[^.]+?$/)[0]
          const fileID = res.fileID
          this.setData({
            fileID: fileID,
            // imgurl: fileID

          })
          this.data.imageList[i] = fileID

          console.log(this.data.imageList)


        }
      })


    }
    setTimeout(() => {
      if (true) {
        const content = this.data.myValue
        const db = wx.cloud.database()
        console.log('开始传向数据库');
        console.log(this.data.imageList)
        db.collection('tuwenxinxi').add({
            data: {
              name: this.data.yonghuxinxi[0].name,
              touxiang: this.data.yonghuxinxi[0].imgurl,
              content: content,
              imgurl: this.data.imageList,
              sort:this.data.leixing
            }
          })
          .then(result => {
            console.log("数据库写入成功", result)

          })
          .catch(err => {
            console.error("数据库写入失败", err)
          })

      } else {

      }

    }, 5000);

    // setTimeout(function ()
    // {




    //   const content = this.data.myValue
    //   const db = wx.cloud.database()
    //   console.log('开始传向数据库');
    //   console.log(this.data.imageList)
    //   db.collection('tuwenxinxi').add({
    //       data: {
    //         name: this.data.yonghuxinxi[0].name,
    //         touxiang: this.data.yonghuxinxi[0].imgurl,
    //         content: content,
    //         imgurl: this.data.imageList,
    //       }
    //     })
    //     .then(result => {
    //       console.log("数据库写入成功", result)

    //     })
    //     .catch(err => {
    //       console.error("数据库写入失败", err)
    //     })


    // }, 3000);




    wx.switchTab({
      url: '../index/index',
    })


    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    
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









    let that = this
    wx.cloud.callFunction({
      name: "getList",
      success(res) {
        console.log("请求云函数成功hhhhhhhhh", res)
        that.setData({
          tuwenxinxi: res.result.data.reverse(),
        })
      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })
    this.setData({
      navH: app.globalData.navHeight
    });
    //云函数调用
    wx.cloud.callFunction({
      name: 'helloCloud',
      data: {
        message: 'helloCloud',
      }
    }).then(res => {
      console.log(this.data.openid)
      console.log('hhhhhh')
      console.log(res.result.openid)
      this.setData({
        openid: res.result.openid
      })

      console.log(this.data.openid)
      //res就将appid和openid返回了
      //做一些后续操作，不用考虑代码的异步执行问题。
      let that = this
      wx.cloud.callFunction({
        name: "getList2",
        success(res) {
          console.log("请求云函数成功", res)
          that.setData({
            yonghuxinxi: res.result.data
          })
          console.log('ppppp')
          console.log(that.data.yonghuxinxi)
          console.log(res.result.data)
        },
        fail(res) {
          console.log("请求云函数失败", res)
        }

      })
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