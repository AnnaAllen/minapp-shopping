import {request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data:{
    swiperList: [],
    cateList: [],
    floorList: []
  },

  //发送异步请求
  onLoad: function(){
    // wx.request({
    //   // 必需
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     this.setData({
    //       swiperList: res.data.message
    //     })
    //   },
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },

  //获取轮播图数据
  getSwiperList(){
    request({ url: "/home/swiperdata"})
    .then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },

  //获取分类数据
  getCateList(){
    request({ url: "/home/catitems"})
    .then(result => {
      this.setData({
        cateList: result.data.message
      })
    })
  },

  //获取 楼层数据
  getFloorList(){
    request({ url: "/home/floordata"})
    .then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
})