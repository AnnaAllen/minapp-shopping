Component({
  
  properties: {
    
    tabsList: {
      type: Array,
      value: "没有"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: "this is the data in tabbs"
  },

  methods: {
    change(e){
      const currentIndex = e.currentTarget.dataset.index
      // console.log(currentIndex)
      //通过 this.triggerEvent() 把触发事件和值传给parent
      this.triggerEvent("select",{currentIndex})
    }
  }
})
