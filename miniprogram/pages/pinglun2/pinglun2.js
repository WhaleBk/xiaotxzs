const DB = wx.cloud.database().collection("shipinxinxi")

var util = require('../../utils/util.js');
var lunbo=[];


var pinglunid22
var myopenid22


Page({
  data: {
    zanleshu: 0,
    myopenid: '',
    dianzanshu: 0,
    dianzan: false,
    yonghuxinxi: [],
    pingyuValue: '',
    pinglundexinxi: '',
    pinglunid: '000000',
    xianshi: false,
    xianshi2: false,
    swiperCurrent: 0,
    currentTab: 0,
    currentdata: '',
    flag: 0,


    tuwenxinxi: [],
    shipinxinxi: [{
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, {
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, {
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, {
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, {
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, {
      vidieourl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    }, ]







  },
 


  shangchuan() {
    var myDate = new Date();


    setTimeout(() => {
      if (true) {
        const content = this.data.pingyuValue
        const db = wx.cloud.database()
        console.log('开始传向数据库');

        db.collection('pinglun').add({
            data: {
              name: this.data.yonghuxinxi[0].name,
              touxiang: this.data.yonghuxinxi[0].imgurl,
              id2: pinglunid22,
              content: this.data.pingyuValue,
              shijian: myDate.toLocaleTimeString()
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

    }, 1000);

    setTimeout(() => {

      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
    

    }, 1000);
   
    wx.navigateBack({
      delta: 1
    })

  },
  //下拉刷新




  onPullDownRefresh: function ()

  {
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载

    setTimeout(function ()

      {
        // complete

        wx.hideNavigationBarLoading() //完成停止加载

        wx.stopPullDownRefresh() //停止下拉刷新

      }, 1500);

  },
  dianzan() {

    this.setData({
      dianzan: !this.data.dianzan

    });
    if (this.data.dianzan == true) {

      let that = this
      wx.cloud.database().collection('dianzan').add({
        data: {
          tiezideid: pinglunid22,
          zanle: this.data.dianzan
        },
        success(result) {
          that.data.dianzanshu.push('hhh')
          that.setData({
            dianzanshu:that.data.dianzanshu


          });
          wx.showToast({
            title: '成功点赞',
          })
        }

      })





    }
    if (this.data.dianzan != true) {

      wx.cloud.database().collection('dianzan').where({
          tiezideid: pinglunid22,
          _openid: this.data.myopenid
        }).remove()
        .then(res => {
          this.setData({
            dianzanshu:this.data.dianzanshu.slice(0,this.data.dianzanshu.length-1)

          });
          wx.showToast({
            title: '取消点赞',
          })
        })
    }





  },
  onReady: function () {
    this.onLoad()
  },

  onShow: function () {
    this.onLoad();
  },
  onLoad: function (options) {




    var that = this
    that.data.shipinxinxi = []

    //创建获取对象
    const event = this.getOpenerEventChannel()

    //关键部分！！！通过获取到的对象.event.on('参数名称',function(data)来获取参数值，结果保存在data里

    event.on('dataname1', function (data) {

      pinglunid22 = data.data



    })
    wx.cloud.database().collection("shipinxinxi").where({
      _id: pinglunid22
    }).get({
      success(res) {
        that.setData({
          shipinxinxi: res.data,
        })

      },
      fail(err) {

      }
    })
    //获取myopenid
    wx.cloud.database().collection("tuwenxinxi").where({
      _id: pinglunid22
    }).get({
      success(res) {
        that.setData({
          myopenid: res.data[0]._openid,
        })
        myopenid22 = that.data.myopenid



      },
      fail(err) {

      }
    })




    //获取点赞状态
    wx.cloud.database().collection("dianzan").where({
      tiezideid: pinglunid22,
      _openid: myopenid22
    }).get({
      success(res) {
        console.log('红红火火恍恍惚惚或或或或或或或或或或或或或或或或或或或')
        console.log(that.data.myopenid)
        console.log(res)
        that.setData({
          dianzan: res.data[0].zanle,
        })

        console.log(that.data.myopenid)

      },
      fail(err) {

      }
    })









    wx.cloud.database().collection("pinglun").where({
      id2: pinglunid22
    }).get({
      success(res) {
        that.setData({
          pinglundexinxi: res.data.reverse(),

        })

      },
      fail(err) {

      }
    })


















    wx.cloud.callFunction({
      name: "getList2",
      success(res) {

        that.setData({
          yonghuxinxi: res.result.data
        })


      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })




    // 加载特定id的评论页面













    wx.cloud.callFunction({
      name: "getxxkey",
      success(res) {

        that.setData({
          xianshi2: res.result.data[0].name,
        })

      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })






    wx.cloud.database().collection("dianzan").where({
      tiezideid: pinglunid22
    }).get({
      success(res) {

        that.setData({
          dianzanshu: res.data,

        })

      },
      fail(err) {

      }
    })



  },





 
  lower() {
    console.log('hhh')
    wx.stopPullDownRefresh();
  }
})