// pages/canvas/canvas.js
const m = require('../../dataofmap/suojian_china_map_ok3.js')
const map = m.map

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_width: 0,
    s_height: 0,
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
        var s_width = res.screenWidth
        var s_height = res.screenHeight
        var yuliu_w = res.screenWidth * 0.05
        var yuliu_h = res.screenHeight * 0.08
        that.setData({
          yuliu_w: yuliu_w,
          yuliu_h: yuliu_h,
          s_width: s_width,
          s_height: s_height
        })
      },
    })

    console.log(options.home_address, options.school_address)
    this.setData({
      home_long: options.home_long,
      home_lat: options.home_lat,
      home_address: options.home_address,
      school_long: options.school_long,
      school_lat: options.school_lat,
      school_address: options.school_address,
    })

    var x_1 = this.longToZB(this.data.home_long, this.data.s_width)
    var y_1 = this.latToZB(this.data.home_lat, this.data.s_height)
    var x_2 = this.longToZB(this.data.school_long, this.data.s_width)
    var y_2 = this.latToZB(this.data.school_lat, this.data.s_height)

    var y_middle = ( y_1 - y_2 )/2 + y_2
    var x_middle = ( x_2 - x_1 )/2 + x_1

    var x_pian_ = Math.sqrt( (x_1 - x_2) * (x_1 - x_2) + (y_1 - y_2) * (y_1 - y_2) ) * 0.5
    // console.log("look: ", x_pian_)

    var x_pian = x_pian_ * 0.85
    var y_pian = ( Math.abs(x_2) - Math.abs(x_1) ) * x_pian / ( Math.abs(y_1) - Math.abs(y_2) )

    if ( (y_2 > y_1 && x_2 > x_1) || (y_2 < y_1 && x_2 < x_1) ){
      var x_anchor = x_middle + x_pian
      var y_anchor = y_middle + y_pian
    }
    else{
      var x_anchor = x_middle - x_pian
      var y_anchor = y_middle - y_pian
    }

    this.setData({
      x_anchor: x_anchor,
      y_anchor: y_anchor
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.home_long, this.data.home_lat, this.data._school_long, this.data.school_lat)
    var context = wx.createCanvasContext('firstCanvas')
    context.setStrokeStyle("#00ff00")
    context.setLineWidth(1)
    for (var key in map) {
      var p = map[key]
      const longs = p['0']
      const lats = p['1']
      context.moveTo(this.longToZB(longs[0], this.data.s_width), this.latToZB(lats[0], this.data.s_height))
      for (var i = 1; i < longs.length; i++) {
        context.lineTo(this.longToZB(longs[i], this.data.s_width), this.latToZB(lats[i], this.data.s_height))
      }
    }

    context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height) )
    context.quadraticCurveTo(this.data.x_anchor, this.data.y_anchor, this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))

    context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
    context.lineTo(this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))

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
  
  },

  daochuCanvas: function(){
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this.data.s_width,
      height: this.data.s_height,
      canvasId: 'firstCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        var tempFilePath = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
        })
      }
    })
  }

})