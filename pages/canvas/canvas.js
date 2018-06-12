// pages/canvas/canvas.js
const app = getApp()
const m = require('../../dataofmap/suojian_china_map_ok3.js')
const d = require('../../utils/distance.js')
const map = m.map

Page({

  /**
   * 页面的初始数据
   */
  data: {
    s_width: 0,
    s_height: 0,
    yuliu_w: 0,
    yuliu_h: 0,
    is_x_yj: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#0A0A0A',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
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

    this.setData({
      is_x_yj: options.is_x_yj
    })
    console.log(typeof(this.data.is_x_yj))

    wx.showLoading({
      title: '读取数据···',
    })
    if(this.data.is_x_yj === '1'){
      this.setData({
        home_long: options.home_long,
        home_lat: options.home_lat,
        citys: wx.getStorageSync('citys'),
        zuobiao: wx.getStorageSync('zuobiao'),
      })
      console.log("citys: ", this.data.citys)
      console.log("zuobiao: ", this.data.zuobiao)
    }
    else{
      this.setData({
        home_long: options.home_long,
        home_lat: options.home_lat,
        home_address: options.home_address,
        school_long: options.school_long,
        school_lat: options.school_lat,
        school_address: options.school_address,
        To: options.To,
      })

      var xy_anchor = this.anchor(this.data.home_long, this.data.home_lat, this.data.school_long, this.data.school_lat)
      console.log("xy_anchor: ", xy_anchor)
      this.setData({
        x_anchor: xy_anchor[0],
        y_anchor: xy_anchor[1]
      })

      var dis = d.getDistance(this.data.home_lat, this.data.home_long, this.data.school_lat, this.data.school_long)
      // console.log( "distance: ", dis)
      this.setData({
        dis: dis
      })
    }
    wx.hideLoading()
  },

  anchor: function (long_1, lat_1, long_2, lat_2) {
    // console.log(long_1, lat_1, long_2, lat_2)
    var x_1 = this.longToZB(long_1, this.data.s_width)
    var y_1 = this.latToZB(lat_1, this.data.s_height)
    var x_2 = this.longToZB(long_2, this.data.s_width)
    var y_2 = this.latToZB(lat_2, this.data.s_height)
    // console.log(x_1,y_1)
    var y_middle = (y_1 - y_2) / 2 + y_2
    var x_middle = (x_2 - x_1) / 2 + x_1

    var x_pian_ = Math.sqrt((x_1 - x_2) * (x_1 - x_2) + (y_1 - y_2) * (y_1 - y_2)) * 0.5
    // console.log("look: ", x_pian_)
    // console.log("x_pain: ",x_pian)
    var x_pian = x_pian_ * 0.75
    var y_pian = (Math.abs(x_2) - Math.abs(x_1)) * x_pian / (Math.abs(y_1) - Math.abs(y_2))
    // console.log("y_pain: ", y_pian)
    if ((y_2 > y_1 && x_2 > x_1) || (y_2 < y_1 && x_2 < x_1)) {
      var x_anchor = x_middle + x_pian
      var y_anchor = y_middle + y_pian
      // console.log(x_anchor)
      return [x_anchor,y_anchor]
    }
    else {
      var x_anchor = x_middle - x_pian
      var y_anchor = y_middle - y_pian
      // console.log(x_anchor)
      return [x_anchor, y_anchor]
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data.home_long, this.data.home_lat, this.data.school_long, this.data.school_lat, this.data.To)
    wx.showLoading({
      title: '绘制中······',
    })
    var context = wx.createCanvasContext('firstCanvas')

    context.setFillStyle('#0A0A0A')
    context.fillRect(0, 0, this.data.s_width, this.data.s_height)

    context.setFillStyle('#00EE00')
    context.fillRect(0.05 * this.data.s_width - 2, 0.57 * this.data.s_height - 2, 136, 136)

    context.beginPath()
    context.setStrokeStyle("#00EE00")
    context.setLineWidth(1.5)
    for (var key in map) {
      var p = map[key]
      const longs = p['0']
      const lats = p['1']
      context.moveTo(this.longToZB(longs[0], this.data.s_width), this.latToZB(lats[0], this.data.s_height))
      for (var i = 1; i < longs.length; i++) {
        context.lineTo(this.longToZB(longs[i], this.data.s_width), this.latToZB(lats[i], this.data.s_height))
      }
    }
    context.stroke()

    // context.beginPath()
    // context.setStrokeStyle("red")
    // context.setLineWidth(1)
    // // context.arc(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height), 12, 0, 2 * Math.PI)
    // context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height) )
    // context.quadraticCurveTo(this.data.x_anchor, this.data.y_anchor, this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))
    // context.stroke()

    // context.beginPath()
    // context.setStrokeStyle("yellow")
    // context.setLineWidth(1)
    // context.setLineDash([2, 2], 10)
    // context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
    // context.lineTo(this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))
    // context.stroke()
    if(this.data.is_x_yj === '1'){
      // var anchor  = this.anchor(this.data.home_long, this.data.home_lat, this.data.school_long, this.data.school_lat)
      console.log("多曲线作图")
      context.beginPath()
      context.setStrokeStyle("red")
      context.setLineWidth(1)
      var zuobiao = this.data.zuobiao
      for (var i = 0; i < zuobiao.length; i++) {
        console.log("选择城市坐标： ", zuobiao[i])
        var anchor = this.anchor(this.data.home_long, this.data.home_lat, zuobiao[i][0], zuobiao[i][1])
        context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
        // context.quadraticCurveTo(anchor[0], anchor[1], this.longToZB(zuobiao[i][0], this.data.s_width), this.latToZB(zuobiao[i][1], this.data.s_height))
        context.lineTo(this.longToZB(zuobiao[i][0], this.data.s_width), this.latToZB(zuobiao[i][1], this.data.s_height))
        context.arc(this.longToZB(zuobiao[i][0], this.data.s_width), this.latToZB(zuobiao[i][1], this.data.s_height), 2, 0, 2 * Math.PI)
      }
      // for (var v of citys){
      //   console.log("第n根曲线")
      //   var anchor = this.anchor(this.data.home_long, this.data.home_lat, v[0], v[1])
      //   context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
      //   context.quadraticCurveTo(anchor[0], anchor[1], this.longToZB(v[0], this.data.s_width), this.latToZB(v[1], this.data.s_height))
      // }
      context.stroke()
    }
    else{
      context.beginPath()
      context.setStrokeStyle("red")
      context.setLineWidth(1)
      // context.arc(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height), 12, 0, 2 * Math.PI)
      context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
      context.quadraticCurveTo(this.data.x_anchor, this.data.y_anchor, this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))
      context.stroke()

      context.beginPath()
      context.setStrokeStyle("yellow")
      context.setLineWidth(1)
      context.setLineDash([2, 2], 10)
      context.moveTo(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height))
      context.lineTo(this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height))
      context.stroke()

      context.beginPath()
      context.arc(this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height), 2, 0, 2 * Math.PI)
      context.setFillStyle('blue')
      context.fill()

      context.beginPath()
      context.arc(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height), 2, 0, 2 * Math.PI)
      context.setFillStyle('red')
      context.fill()

      context.setFontSize(16)
      context.setFillStyle('green')
      context.fillText("从我家到我" + this.data.To, 0.05 * this.data.s_width, 0.52 * this.data.s_height)
      context.fillText("直线距离为：" + this.data.dis + "公里", 0.05 * this.data.s_width, 0.55 * this.data.s_height)
      context.stroke()
    }


    // context.beginPath()
    // context.arc(this.longToZB(this.data.home_long, this.data.s_width), this.latToZB(this.data.home_lat, this.data.s_height), 2, 0, 2 * Math.PI)
    // context.setFillStyle('red')
    // context.fill()

    // context.beginPath()
    // context.arc(this.longToZB(this.data.school_long, this.data.s_width), this.latToZB(this.data.school_lat, this.data.s_height), 2, 0, 2 * Math.PI)
    // context.setFillStyle('blue')
    // context.fill()

    context.beginPath()
    context.setFontSize(20)
    context.setFillStyle('#00FFFF')
    context.font = "normal small-caps 50 22px Arial"
    context.fillText("吾与吾乡", 0.38 * this.data.s_width, this.data.s_height*0.035)
    context.stroke()

    try{
      context.setFontSize(22)
      context.setFillStyle('green')
      context.fillText(app.globalData.userInfo.nickName, 0.05 * this.data.s_width, 0.49 * this.data.s_height)
    }
    catch(err){
      console.log(err)
    }

    // context.setFontSize(16)
    // context.setFillStyle('green')
    // context.fillText("从我家到我" + this.data.To, 0.05 * this.data.s_width, 0.52 * this.data.s_height)
    // context.fillText("直线距离为：" + this.data.dis + "公里", 0.05 * this.data.s_width, 0.55 * this.data.s_height)
    // context.stroke()

    context.drawImage('../../images/erweima.png',0.05 * this.data.s_width, 0.57 * this.data.s_height, 132, 132)

    context.draw()

    wx.hideLoading()
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
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },

  toIndex: function(){
    wx.redirectTo({
      url: '../xuanzhe/xuanzhe'
    })
  }
})