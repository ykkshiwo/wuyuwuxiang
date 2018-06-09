// pages/canvas/canvas.js
const m = require('../../dataofmap/suojian_china_map_ok3.js')
const map = m.map

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yuliu_w: 0,
    yuliu_h: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.screenHeight, res.screenWidth)
        var yuliu_w = res.screenWidth * 0.05
        var yuliu_h = res.screenHeight * 0.08
        that.setData({
          yuliu_w: yuliu_w,
          yuliu_h: yuliu_h
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    for (var key in map) {
      var p = map[key]
      const longs = p['0']
      const lats = p['1']
      context.moveTo(this.longToZB(longs[0], 412), this.latToZB(lats[0], 732))
      for (var i = 1; i < longs.length; i++) {
        context.lineTo(this.longToZB(longs[i], 412), this.latToZB(lats[i], 732))
      }
    }
    context.stroke()
    context.draw()
  },

  longToZB: function(long, sw){
    var r = 0.9 * (long - 73.38) * sw / 61.62 + 73.38 - (73.38 - this.data.yuliu_w)
    return r
  },

  latToZB: function(lat, sh){
    var r = sh * 0.7 * ( 53.6 - lat ) * 0.018 + this.data.yuliu_h
    return r
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