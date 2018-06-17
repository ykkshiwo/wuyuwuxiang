// pages/xuanzhe/xuanzhe.js
const m = require('../../dataofmap/city.js')
const o = require('../../utils/only.js')
const p = require('../../dataofmap/provice_citys.js')
const city_zuobiao = m.city_zuobiao
const p_c = p.provice_city

Page({

  /** 
   * 页面的初始数据
   */
  data: {
    provices: ["河北省", "山西省", "吉林省", "辽宁省", "黑龙江省", "陕西省", "甘肃省", "青海省", "山东省", "福建省", "浙江省", "台湾省", "河南省", "湖北省", "湖南省", "江西省", "江苏省", "安徽省", "广东省", "海南省", "四川省", "贵州省", "云南省", "北京市", "天津市", "上海市", "重庆市", "内蒙古自治区", "新疆维吾尔族自治区", "宁夏回族自治区", "广西壮族自治区", "西藏藏族自治区", "香港特别行政区", "澳门特别行政区"],
    now_citys: '',
    school_lat: '',
    school_long: '',
    home_lat: '',
    home_long: '',
    is_x_yj: false,
    customItem: '全部',
    allCity: '吾乡->',
    allCity_unique: '',
    display_pc: false,
    disallCitys: '',
    now_provice: '',
    allProvice: ''
  },

  // radioChange: function (e) {
  //   console.log('radio发生change事件，携带value值为：', e.detail.value)
  //   var v = e.detail.value
  //   if (v === "想到达的远方" || v === "已经到达的远方" || v === "我的彩色旅途") {
  //     this.setData({
  //       is_x_yj: true,
  //       display_pc: true,
  //     })
  //   }
  //   else {
  //     this.setData({
  //       is_x_yj: false,
  //       display_pc: false,
  //     })
  //   }
  //   this.setData({
  //     To: v
  //   })
  // },

  xuanYuanFang: function(e){
    console.log("选择的按钮为",e.currentTarget.id)
    switch (e.currentTarget.id){
      case "我的大学":
        console.log("执行我的大学")
        this.dangCity(e.currentTarget.id)
        break;
      case "工作的地方":
        console.log("执行工作的地方")
        this.dangCity(e.currentTarget.id)
        break;
      case "梦想的远方":
        console.log("执行梦想的远方")
        this.dangCity(e.currentTarget.id)
        break;
      case "想去的地方":
        console.log("执行想去的地方")
        this.duoCity(e.currentTarget.id)
        break;
      case "去过的地方":
        console.log("执行去过的地方")
        this.duoCity(e.currentTarget.id)
        break;
      case "彩色的旅途":
        console.log("执行彩色的旅途")
        this.duoCity(e.currentTarget.id)
        break;
    }
  },

  dangCity: function(to){
    this.setData({
      is_x_yj: false,
      display_pc: false,
      To: to,
    })
    this.xuanLocationSchool();
  },

  duoCity: function(to){
    this.setData({
      is_x_yj: true,
      display_pc: true,
      To: to,
    })
  },

  xuanLocationHome: function () {
    console.log("开始家选择地点")
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var long_ = res.longitude
        var lat_ = res.latitude
        that.setData({
          home_lat: lat_,
          home_long: long_,
        })
      },
      fail: function () {
        wx.openSetting({
          success: function (res) {
            console.log(res.authSetting)
          }
        })
      }
    })
  },

  xuanLocationSchool: function () {
    console.log("开始学校选择地点")
    this.setData({
      have_choose: ''
    })
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var long_ = res.longitude
        var lat_ = res.latitude
        that.setData({
          school_lat: lat_,
          school_long: long_,
          have_choose: '已选择'
        })
      },
      fail: function () {
        that.setData({
          have_choose: '(未选择)'
        })
        wx.openSetting({
          success: function (res) {
            console.log(res.authSetting)
          }
        })
      }
    })
  },

  // xuanzheDidian: function (lat, long, address) {
  //   var that = this
  //   wx.chooseLocation({
  //     success: function (res) {
  //       console.log(res)
  //       var long_ = res.longitude
  //       var lat_ = res.latitude
  //       var address_ = res.address
  //       that.setData({
  //         lat: lat_,
  //         long: long_,
  //         address: address_
  //       })
  //     },
  //   })
  // },

  produce: function () {
    if (this.data.is_x_yj) {
      if (this.data.home_lat) {
        this.tiJiao()
        wx.navigateTo({
          url: "/pages/canvas/canvas?is_x_yj=" + 1 +
          "&home_long=" + this.data.home_long +
          "&home_lat=" + this.data.home_lat +
          "&To=" + this.data.To,
          success: function () {
          }
        })
      }

      else {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您未选择家的地理数据，将导致绘图出现错误，继续点击确定，重选点击取消',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.tiJiao()
              wx.navigateTo({
                url: "/pages/canvas/canvas?is_x_yj=" + 1 +
                "&home_long=" + that.data.home_long +
                "&home_lat=" + that.data.home_lat +
                "&To=" + that.data.To,
                success: function () {
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
    else {
      if (this.data.home_lat && this.data.school_lat) {
        console.log("go")
        this.tiaoZhuan(this)
      }
      else {
        var that = this
        wx.showModal({
          title: '提示',
          content: '您未选择完整地理数据，将导致绘图出现错误，继续点击确定，重选点击取消',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              that.tiaoZhuan(that)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },


  tiaoZhuan: function (t) {
    wx.navigateTo({
      url: "/pages/canvas/canvas?home_long=" + t.data.home_long +
      "&home_lat=" + t.data.home_lat +
      "&is_x_yj=" + 0 +
      "&school_lat=" + t.data.school_lat +
      "&school_long=" + t.data.school_long +
      "&To=" + t.data.To,
      success: function () {
      }
    })
  },

  // bindRegionChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     region: e.detail.value
  //   })
  // },

  chooseC: function (event) {
    var aCity = event.currentTarget.id;
    console.log(aCity)
    var allCity = this.data.allCity + ';' + aCity
    var disallCitys = allCity.slice(5)
    var allProvice = this.data.allProvice + ';' + this.data.now_provice
    var allProvice_sz = this.bouncer(allProvice.split(";"))
    var allCity_unique = o.unique(allProvice_sz)
    console.log(allCity_unique)
    this.setData({
      allCity: allCity,
      disallCitys: disallCitys,
      disallProvice: allCity_unique,
      allProvice: allProvice
    })
  },

  tiJiao: function () {
    wx.showLoading({
      title: '正在处理数据······',
    })
    var allCity_sz = this.bouncer(this.data.allCity.split(";"))
    var allCity_unique = o.unique(allCity_sz)
    console.log(allCity_unique)
    var zuobiao = allCity_unique.map(function (v) { var c_z = city_zuobiao[v]; return c_z })
    var zuobiao = this.bouncer(zuobiao)
    console.log(zuobiao)
    try {
      wx.setStorageSync('zuobiao', zuobiao)
      wx.setStorageSync('citys', allCity_unique)
      wx.setStorageSync('provices', this.data.disallProvice)
    } catch (e) {
    }
    wx.hideLoading()
  },

  bouncer: function (arr) {
    // Don't show a false ID to this bouncer.
    return arr.filter(function (val) {
      return !(!val || val === "");
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#E6E6FA',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
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

  chooseP: function (event) {
    console.log(event)
    console.log(event.currentTarget.id)
    var provice_choosed = event.currentTarget.id;
    var now_citys = p_c[provice_choosed]
    console.log(now_citys)
    this.setData({
      now_citys: now_citys,
      now_provice: provice_choosed
    })
  },

  confirm: function () {
    this.setData({
      display_pc: false,
    })
  },

  clear: function () {
    this.setData({
      allCity: '吾乡->',
      disallCitys: '',
      disallProvice: '',
      allProvice: '',
    })
  }
})