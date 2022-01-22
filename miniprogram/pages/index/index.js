const DB = wx.cloud.database().collection("tuwenxinxi")





Page({
  data: {
    swiperCurrent: 0,
    currentTab: 0,
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
  //轮播图改变事件
  swiperChange: function (e) {
    if (e.detail.source === 'touch') {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
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
  onLoad: function (options) {

    // var that=this
    // DB.get({

    //   success(res){

    //     console.log(res)
    //     console.log(that.data.tuwenxinxi)
    //     that.data.tuwenxinxi=res.data
    //     console.log(res)
    //     console.log(that.data.tuwenxinxi)


    //     that.setData(
    //       {
    //         tuwenxinxi:res.data.reverse(),


    //       },

    //     );

    //   }



    // })

    let that = this
    wx.cloud.callFunction({
      name: "getList",
      success(res) {
        console.log("请求云函数成功", res)
        that.setData({
          tuwenxinxi: res.result.data.reverse(),
        })
      },
      fail(res) {
        console.log("请求云函数失败", res)
      }

    })

  },
  shuaxin: function (options) {

    var that = this
    DB.get({

      success(res) {

        console.log(res)
        console.log(that.data.tuwenxinxi)
        that.data.tuwenxinxi = res.data
        console.log(res)
        console.log(that.data.tuwenxinxi)

      }


    })

  },
  fabu: function () {
    console.log('gggg');
    // wx.navigateTo({
    //   url: '../shangchuan/shangchuan',
    // })
    wx.redirectTo({
      url: '../shangchuan/shangchuan',
      success: function (res) {
        console.log(res)
      }
    })
  },
  switchNav: function (e) {
    console.log(e);
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    } else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  onShareAppMessage: function () {
    return {
      title: '糗事百科',
      desc: '这里有搞笑的娱乐段子',
      path: '/index/index'
    }
  },
  lower() {
    console.log('hhh')
    wx.stopPullDownRefresh();
  }
})