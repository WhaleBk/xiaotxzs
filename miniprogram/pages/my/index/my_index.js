const PassportBiz = require('../../../biz/passport_biz.js');
const UserBiz = require('../../../biz/user_biz.js');
const cacheHelper = require('../../../helper/cache_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const comm = require('../../../helper/comm.js');
const pageHelper = require('../../../helper/page_helper.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		user: null,


		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		isHide: false
	},
gerenziliao(){
	wx.navigateTo({
		url: '../base/my_base',
	})
},
gywm(){
	wx.navigateTo({
		url: '../../about/about',
	})
},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) { 
		// wx.request({
    //   url: 'http://demo.wenhorm.top' + '/article/',
    //   method: 'get',
    //   data: {},//请求参数格式为json
    //   success(res) {
        
        
    //       console.log(res)
         
    //   },
    //   fail(err) {
    //     console.error(err)

       
    //   }
    // })
		// PassportBiz.initApp();
		// PassportBiz.initPage(this); 

		// await this._login();
		
		var that = this;
		// 查看是否授权
		wx.getSetting({
		 success: function(res) {
			if (res.authSetting['scope.userInfo']) {
			 wx.getUserInfo({
				success: function(res) {
					console.log(res.rawData);
				 // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
				 // 根据自己的需求有其他操作再补充
				 // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
				 wx.login({
					success: res => {
					 // 获取到用户的 code 之后：res.code
					 console.log("用户的code:" + res.code);
					 console.log("用户的信息如下：");
					
					 // 可以传给后台，再经过解析获取用户的 openid
					 // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
					 // wx.request({
					 //  // 自行补上自己的 APPID 和 SECRET
					 //  url: 'https://api.weixin.qq.com/sns/jscode2session?appid=	wx506aa5d597d91863&secret=e8242b93267652169ac5c33c356fbb7f&js_code=' + res.code + '&grant_type=authorization_code',
					 //  success: res => {
					 //   // 获取到用户的 openid
					 //   console.log("用户的openid:" + res.data.openid);
					 //  }
					 // });
					}
				 });
				}
			 });
			} else {
			 // 用户没有授权
			 // 改变 isHide 的值，显示授权页面
			 that.setData({
				isHide: true
			 });
			 wx.navigateTo({
				 url: '../../logs/logs',
			 })
			}
		 }
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},
	//下拉刷新

onPullDownRefresh:function()

{
wx.showNavigationBarLoading() //在标题栏中显示加载

//模拟加载

setTimeout(function()

{
// complete

wx.hideNavigationBarLoading() //完成停止加载

wx.stopPullDownRefresh() //停止下拉刷新

},1500);

},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		PassportBiz.setSetup(this);

		// 小圆点
		//PassportBiz.isChatReadRedDot();
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
	onPullDownRefresh: async function () {
		await this._login();
		wx.stopPullDownRefresh();
	},

	//登录
	_login:async function(){
		await PassportBiz.loginSilence(this);

		// 取得token里的信息
		let token = PassportBiz.getToken();
		if (!token) { 
			return;
		}

		// 先用token里信息渲染
		let user = {};
		user.USER_PIC = token.pic;
		user.USER_NAME = token.name;
		user.USER_ITEM = token.item;
		user.USER_SEX = token.sex;
		user.USER_STATUS = token.status;

		this.setData({
			user
		});

		// 再调用服务器信息渲染
		this._getUserInfo();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	_getUserInfo: async function () {
		if (!PassportBiz.isLogin()) return;

		// 取得用户信息
		let opt = {
			title: 'bar'
		};
		let user = await cloudHelper.callCloudData('user/my_detail', {}, opt);
		if (!user || user.USER_STATUS == 0 || user.USER_STATUS == 9) { 
			pageHelper.reload();
		}
		this.setData({
			user
		});
	},

	url: function (e) {
		pageHelper.url(e);
	},

	bindAvatarTap: async function () {
		UserBiz.chooseAvatar(PassportBiz.getUserKey(), 'my_index');
	},
 
	bindSetTap: async function (e) {
		wx.showActionSheet({
			itemList: ['清除缓存', '重新登录', '退出登录'],
			success: async res => {
				let idx = res.tapIndex;
				if (idx == 0) {
					let token = PassportBiz.getToken(); 
					cacheHelper.clear();
					cacheHelper.set(comm.CACHE_TOKEN, token); 
				}
				if (idx == 1) {
					await this._login();
				}
				if (idx == 2) {
					cacheHelper.clear();
					this.setData({
						user: null
					});
				}

			},
			fail: function (res) {}
		})
	}
})