// pages/index/shuangchuan.js

var pinglunid22

var filePath = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myopenid22: '',
    myopenid: '',
    zhucexinxi: '',
    xianshi2: false,
    imgurl: ''

  },
  //用户信息上传   
  formSubmit(e) {
    console.log(this.data.zhucexinxi)
    console.log(this.data.myopenid22)
    if (this.data.zhucexinxi != this.data.myopenid22) {
      console.log(e.detail.value)
      console.log(e.detail.value.sex)
      console.log(e.detail.value.birth)


      const filePath = this.data.imgurl
      console.log(filePath)
      const cloudPath = `index/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}` + filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success: res => {
          console.log("云存储上传成功", res)
          console.log(e.detail.value, )
          console.log(e.detail.value.sex, )
          console.log(e.detail.value.birth)
          const db = wx.cloud.database()
          const name = `index-${Date.now()}-${Math.floor(Math.random(0,1)*1000)}` + filePath.match(/\.[^.]+?$/)[0]
          const fileID = res.fileID
          this.setData({
            fileID: fileID,
            imgurl: fileID
          })
          db.collection('yonghu').add({
              data: {
                birth: e.detail.value.birth,
                city: e.detail.value.city,
                dianhua: e.detail.value.dianhua,
                name: e.detail.value.name,
                qq: e.detail.value.qq,
                sex: e.detail.value.sex,
                rxnf: e.detail.value.rxnf,
                zwjs: e.detail.value.zwjs,
                imgurl: fileID,
              }
            })
            .then(result => {
              console.log("数据库写入成功", result)

            })
            .catch(err => {
              console.error("数据库写入失败", err)
            })
        }
      })
      console.log('hh')
      wx.switchTab({
        url: '../../my/index/my_index',
      })


      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000
      })

    } else {
      wx.showToast({
        title: '憨皮，注册过啦',
        icon: 'false',
        duration: 2000
      })
    }




  },
  touxiang() {
    console.log('qqqq')
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




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this



    //获取myopenid

    wx.cloud.callFunction({
      name: "helloCloud",
      success(res) {

        that.setData({
          myopenid: res.result.openid,
          myopenid22: res.result.openid,
        })

        //阻止二次注册
        // wx.cloud.database().collection('yonghu').where({
        //   _openid:
        // }).get()
        // .then(res=>{
        //   console.log('谢谢谢谢谢寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻寻')
        //   console.log(res)
        //   that.setData({
        //     zhucexinxi:res.data[0]._openid
        //   })
        // })


        wx.cloud.database().collection("yonghu").where({
          _openid: that.data.myopenid22
        }).get({
          success(res) {
            console.log('成功啦啦啦阿拉拉拉')
            console.log(res)
            that.setData({
              zhucexinxi: res.data[0]._openid

            })

          },
          fail(err) {

          }
        })


      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })











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

    var that = this

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