import{request} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: [
      {
        id: 0,
        name: "综合",
        isActive: true
      },
      {
        id: 1,
        name: "销量",
        isActive: false
      },
      {
        id: 2,
        name: "价格",
        isActive: false
      }
    ],
    goodList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum:1,
    pagesize:10
  },
  totalPage: 1,

  //该参数还可以获取页面的url中携带的字符串
  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getQueryParams();
  },
  active(e) {
    console.log(e.detail.currentIndex)
    let index = e.detail.currentIndex
    let tabsList = this.data.tabsList
    tabsList.forEach((v,i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabsList
    })
  },
  getQueryParams() {

    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then( res => {
      let goodList = res.data.message.goods
      let total = res.data.message.total
      this.totalPage = Math.ceil(total/this.QueryParams.pagesize)
      this.setData({
        //字符串拼接，当前页数据+申请过来的数据
      goodList: [...this.data.goodList,...res.data.message.goods]
     })
      
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },

  
  onReachBottom() {
    if(this.QueryParams.pagenum>=this.totalPage){
      console.log("没有下一页数据")
    }else {
      this.QueryParams.pagenum++;
      this.getQueryParams()
    }
  },

  //监听下来刷新
  onPullDownRefresh() {
    //重置数据
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum=1
    //发送请求
    this.getQueryParams();
  }
})