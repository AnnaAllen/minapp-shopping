import{request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail: {},
    
  },
  goodInfo: {},
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {good_id} = options
    
    this.getGoodDetail(good_id)
    

  },

  getGoodDetail(good_id) {
    
    request({
      url: "/goods/detail?goods_id="+good_id,
    }).then( res => {
      let goodDetail = res.data.message
      this.goodInfo = goodDetail
      

      this.setData({
        goodDetail: {
          pics: goodDetail.pics,
          goods_name: goodDetail.goods_name,
          goods_price: goodDetail.goods_price,
          goods_introduce: goodDetail.goods_introduce.replace(/\.webp/g,'.jpg')
        }
      })
      
    })

  },

//放大预览图片
  watchPicture(e) {
    console.log(e)
    const urls = this.goodInfo.pics.map(v => v.pics_mid);
    const currentUrl = e.currentTarget.dataset.url;
   wx.previewImage({
     current: currentUrl, // 当前显示图片的http链接
     urls: urls, // 需要预览的图片http链接列表
     
   })
  },

//点击加入购物车
  addGwc() {
    console.log("gwc")
    //获取缓存中购物车的数据
    let cart = wx.getStorageSync("cart")||[];
    //判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v=>v.goods_id === this.goodInfo.goods_id)
    if(index === -1){
      //不存在则第一次添加
      this.goodInfo.num = 1;
      this.goodInfo.checked = true;
      cart.push(this.goodInfo);
    }else{
      //存在则num+1
      cart[index].num++;
    }
    //把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart)
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success', // "success", "loading", "none"
      mask: true,
    })
  }
})