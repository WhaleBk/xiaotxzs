const DB = wx.cloud.database().collection("tuwenxinxi")

var util = require('../../utils/util.js');

var pinglunid22

Page({
  data: {
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
    sortList: [{
      icon: "../../images/sort/news.png",
      sortid: 1,
      text: "重要通知"
    }, {
      icon: "../../images/sort/second-hand.png",
      sortid: 2,
      text: "闲置交易"
    }, {
      icon: "../../images/sort/love-mood.png",
      sortid: 3,
      text: "表白交友"
    }, {
      icon: "../../images/sort/question-ask.png",
      sortid: 4,
      text: "疑问互答"
    }, {
      icon: "../../images/sort/part-time-job.png",
      sortid: 5,
      text: "任务兼职"
    }, {
      icon: "../../images/sort/study.png",
      sortid: 6,
      text: "相约学习"
    }, {
      icon: "../../images/sort/found.png",
      sortid: 7,
      text: "失物招领"
    }, {
      icon: "../../images/sort/other.png",
      sortid: 8,
      text: "趣事分享"
    }, ],



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

    
    
    wx.switchTab({
      url: '../index/index',
      
    })




    setTimeout(() => {

      
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
      
    }, 1000);





























  },
  onReady:function(){
    this.onLoad()
  },
  
onShow: function(){
  this.onLoad();
}
,
  onLoad: function (options) {
  


    var that = this

    //创建获取对象
    const event = this.getOpenerEventChannel()

    //关键部分！！！通过获取到的对象.event.on('参数名称',function(data)来获取参数值，结果保存在data里

    event.on('dataname1', function (data) {

      pinglunid22=data.data
      


    })
    wx.cloud.database().collection("tuwenxinxi").where({
      _id:pinglunid22
    }).get({
      success(res) {
        that.setData({
          tuwenxinxi: res.data,

        })

      },
      fail(err) {

      }
    })
    wx.cloud.database().collection("pinglun").where({
      id2:pinglunid22
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


    // wx.cloud.callFunction({
    //   name: "getListpinglun",
    //   success(res) {
    //     console.log("请求云函数成功", res)
    //     that.setData({
    //       pinglundexinxi: res.result.data.reverse()
    //     })
    //     console.log('ppppp')
    //     console.log(that.data.yonghuxinxi)
    //     console.log(res.result.data)
    //   },
    //   fail(res) {
    //     console.log("请求云函数失败", res)
    //   }

    // })





    console.log(that.data.pinglunid)


    // 加载特定id的评论页面













    wx.cloud.callFunction({
      name: "getxxkey",
      success(res) {
        // console.log("请求云函数成功", res)
        that.setData({
          xianshi2: res.result.data[0].name,
        })
        // console.log(that.data.xianshi2)
      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })



   
    



  },




  

  
  lower() {
    console.log('hhh')
    wx.stopPullDownRefresh();
  }
})