import{request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧内容数据
    rightContent: [],
    //点击选中
    isselect: 0
  },
//接口返回数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取本地存储的数据
    const Cates = wx.getStorageSync("cates");
    //如果本地无该数据则申请一个数据
    if(!Cates){
      this.getCateList();
    }else {
      //时间过期则发送一个数据请求,否则就使用旧数据
      console.log("本地有数据")
      if(Date.now() - Cates.time>1000*20){
        this.getCateList();
        console.log("时间过期")
      }
      else{
        console.log("时间未过期")
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
//获取数据
  getCateList() {
    request({
      url: "/categories"
    }).then(res => {
      this.Cates = res.data.message;

      //把接口数据存入本地存储中:wx.setStorageSync("key",value)
      //把时间和值存入本地
      wx.setStorageSync("cates",{time:Date.now(),data:this.Cates})

      //左侧大菜单
      let leftMenuList = this.Cates.map(v => v.cat_name);
      //右侧大菜单
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
//左侧菜单的点击事件
  selectItem(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children;
    this.setData({
      isselect:index,
      rightContent
    })
  }
})