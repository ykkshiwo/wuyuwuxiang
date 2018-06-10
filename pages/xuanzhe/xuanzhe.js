// pages/xuanzhe/xuanzhe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '我的大学', value: '我的大学' },
      { name: '工作的地方', value: '工作的地方'},
      { name: '即将去的远方', value: '即将到达的远方' },
    ],
    home: { name: '家', value: '家', checked: true},
    school_lat: '',
    school_long: '点击选择地点',
    school_address: '',
    home_lat: '',
    home_long: '点击选择地点',
    home_address: '',
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var v = e.detail.value
    this.setData({
      To: v
    })
  },

  xuanLocationHome: function(){
    console.log("开始家选择地点")
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var long_ = res.longitude
        var lat_ = res.latitude
        var address_ = res.address
        that.setData({
          home_lat: lat_,
          home_long: long_,
          home_address: address_
        })
      },
    })
  },

  xuanLocationSchool: function () {
    console.log("开始学校选择地点")
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var long_ = res.longitude
        var lat_ = res.latitude
        var address_ = res.address
        that.setData({
          school_lat: lat_,
          school_long: long_,
          school_address: address_
        })
      },
    })
  },

  xuanzheDidian: function(lat, long, address ){
    var that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        var long_ = res.longitude
        var lat_ = res.latitude
        var address_ = res.address
        that.setData({
          lat: lat_,
          long: long_,
          address: address_
        })
      },
    })
  },

  produce: function(){
    wx.navigateTo({
      url: "/pages/canvas/canvas?home_long=" + this.data.home_long + 
      "&home_lat=" + this.data.home_lat + 
      "&home_address=" + this.data.home_address + 
      "&school_lat=" + this.data.school_lat +
      "&school_long=" + this.data.school_long +
      "&school_address=" + this.data.school_address +
      "&To=" + this.data.To,
      success: function () {
      }
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