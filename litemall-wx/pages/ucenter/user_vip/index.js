// pages/member-center/index.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipclass:"普通会员",
    discount:"1.0",
    vipindex:0,
    nextclass:0,
    upgrade:0,
    
    
  },
  /**
   * 授权回调
  */
  onLoadFun:function(){

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500);
    
  },
  onShow: function () {
    this.setLeveLComplete();

  },
  
  
  /**
   * 关闭说明
  */
  growthValue:function(){
    this.setData({growthValue: true})
  },
  /**
   * 打开说明
  */
  opHelp:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({ growthValue: false, illustrate: this.data.task[index].illustrate});
  },
  /**
   * 设置会员
  */
  setLeveLComplete:function(){
    let that = this;
    util.request(api.Selectvip).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          vipclass: res.data.viptype,
          nextclass: res.data.nextclass,
          viplist: res.data.viplist,
          vipindex: res.data.vipindex,
          discount: res.data.discount,
          upgrade: (res.data.vipindex / res.data.nextclass)*100
        });
      }
    });

  },
  /**
   * 获取会员等级
   * 
  */
  getVipList:function(){
    // app.baseGet(app.U({ c: 'public_api', a:'get_level_list'}),function(res){
    //   that.setData({ 
    //     VipList: res.data.list, 
    //     task: res.data.task.task, 
    //     reach_count: res.data.task.reach_count, 
    //     level_id:res.data.list[0] ? res.data.list[0].id : 0
    //   });
    // });
  },
  /**
   * 获取任务要求
  */
  getTask:function(){
    // app.baseGet(app.U({ c: 'public_api', a: 'get_task', q: { level_id: that.data.level_id}}),function(res){
    //   that.setData({ task: res.data.task, reach_count: res.data.reach_count});
    // });
  },







})