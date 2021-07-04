
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodsInfo: [],
    totalPrice: 0,
    totalNum: 0

  },

  onShow(){
    //获取缓存中的地址
    const address = wx.getStorageSync("address")
    //获取缓存中商品信息
    const goodsInfo = wx.getStorageSync("cart") || []
    //过滤后的购物车数组
    let filGoodsInfo = goodsInfo.filter(v=>v.checked)

    //计算价格和数量
    let totalPrice = 0
    let totalNum = 0
    filGoodsInfo.forEach(v=>{
      totalPrice += v.num * v.goods_price
      totalNum += v.num
      
    })
    this.setData({
      goodsInfo: filGoodsInfo,
      address,
      totalPrice,totalNum
    })
  },



  
})