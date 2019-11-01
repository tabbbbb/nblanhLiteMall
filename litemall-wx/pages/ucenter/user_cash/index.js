// pages/cash-withdrawal/index.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [
      { 'name': '微信', 'icon': 'icon-weixin2' },
    ],
    currentMoney:'',
    currentTab: 0,
    index: 0,
    minPrice:10.00,//最低提现金额
    userInfo:[],
    isClone:false,
    wechatId:'',
    money:''
  },
  onLoadFun:function(){
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getUserExtractBank: function () {
    
  },
  /**
   * 获取个人用户信息
  */
  getUserInfo: function () {
    
  },
  swichNav: function (e) {

  },
  bindPickerChange: function (e) {

  },
  subCash: function (e) {
    
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
    this.getCurrentMoney();
  },

  getCurrentMoney() {
    wx.showLoading({
      title: '加载中...',
    });
    let that = this;
    util.request(api.CurrentMoney).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          currentMoney: res.data.currentMoney
        });
      }
      wx.hideLoading();
    });
  },

  /**
   *   用户提现
   */
  userWithDrawal: function (){
    let that = this;
    util.request(api.UserWithDrawal, {
      wechatId: that.data.wechatId,
      money: that.data.money
    }).then(function (res) {
      if (res.errno === 0) {
        wx.showModal({
          title: '',
          confirmColor: '#b4282d',
          content: '提现成功',
          success: function (res) {
            if (!res.confirm) {
              return;
            }
            wx.reLaunch({
              url: '/pages/ucenter/user_spread_user/index'
            });
          }
        })
      }
    })
  },
  wxInputChange: function (e) {
    this.setData({
      wechatId: e.detail.value
    });
  },
  moneyInputChange: function (e) {
    this.setData({
      money: e.detail.value
    });
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