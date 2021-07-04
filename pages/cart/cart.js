import {showModel, showToast} from "../../utils/asyncWx.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goodsInfo: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0

  },

  onShow(){
    //获取缓存中的地址
    const address = wx.getStorageSync("address")
    //获取缓存中商品信息
    const goodsInfo = wx.getStorageSync("cart") || []
    this.setCart(goodsInfo)
    this.setData({
      address,
      goodsInfo,
    })
  },

//点击获收货地址 并存入到缓存中
  getUserAddress() {
   wx.chooseAddress({
      success: (res1) => {
        wx.setStorageSync("address",res1)
      }
    })
  },

  changeSelect(e) {
    let goodsId = e.currentTarget.dataset.id
    //获取商品信息数组
    let {goodsInfo} = this.data;
    //找到被修改的商品对象
    let index = goodsInfo.findIndex(v=>v.goods_id === goodsId);
    //选中状态取反
    goodsInfo[index].checked = !goodsInfo[index].checked;
    //把修改后的数组设置回data和缓存中
    this.setCart(goodsInfo)

  },

  //全选，全不选
  changeALlSelect(){
    let {goodsInfo, allChecked} = this.data
    allChecked = !allChecked
    goodsInfo.forEach(v=>v.checked = allChecked)
    this.setCart(goodsInfo)
  },

  //加减改变物品数量
  async changeNum(e){
    const id = e.currentTarget.dataset.id
    const para = e.currentTarget.dataset.para
    //获取修改的商品数组
    let {goodsInfo} = this.data;
    //找到被修改的商品对象
    let index = goodsInfo.findIndex(v=>v.goods_id === id)

    //当商品余1且用户点减少时，弹窗询问是否删除商品
    if(goodsInfo[index].num === 1 && para === -1){
      const res = await showModel({ content: "您是否要删除商品"})
      
          if  (res.confirm) {
            goodsInfo.splice(index, 1)
            this.setCart(goodsInfo)
          }else if (res.cancel) {
            console.log("用户取消")
          }

    }else {
      goodsInfo[index].num+=para
      this.setCart(goodsInfo)
    }


  },

  setCart(goodsInfo){
    let allChecked = true
    //计算价格和数量
    let totalPrice = 0
    let totalNum = 0
    goodsInfo.forEach(v=>{
      if(v.checked){
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      }else {
        allChecked = false
      }
    })
    allChecked = goodsInfo.length != 0? allChecked:false

    this.setData({
      goodsInfo,
      allChecked,totalPrice,totalNum
    })
    wx.setStorageSync("cart",goodsInfo)
  },

//点击结算
  async closeAccount(){
    //1.判断收获地址
    const {address,totalNum} = this.data
    if(!address.userName){
      await showToast({title:"您还未添加收货地址"})
      return
    }
    //2.判断有无商品
    if(totalNum === 0){
      await showToast({content:"您还没有添加选购商品"})
      return
    }
    //3. 跳转支付页面
    wx.navigateTo({
      url: "/pages/pay/pay"
    })
  }
  
})