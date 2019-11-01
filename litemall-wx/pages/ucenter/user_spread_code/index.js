var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
// miniprogram/pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePath: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad");
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.downloadFile({
      url: api.QrCode, 
      success(res) {
        if (res.statusCode === 200) {
          that.setData({
            filePath: res.tempFilePath
          });
        }
        setTimeout(function () {
          wx.hideLoading()
        }, 500)

      },
      fail(err) {
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    });
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

  },

  saveQR(e) {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: this.data.filePath,
      success(res) {
        wx.showToast({
          title: '保存成功',
        });
        that.setData({
          ldata:true
        })
      },
      fail(err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success: modalSuccess => {
              wx.openSetting({
                success(settingdata) {
                  console.log("settingdata", settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击按钮即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData", failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }
          })
        }
      }
    })
  }
})