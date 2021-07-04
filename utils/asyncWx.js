
//promise形式 showModel
export const showModel = ({content}) =>{
  return new Promise((resolve, reject) =>{
    wx.showModal({
      title: "提示",
      content: content,
      success: (res) =>{
        resolve(res);
      },
      fail: (err) =>{
        reject(err);
      }
    })
  })
}

export const showToast = ({content}) =>{
  return new Promise((resolve, reject) =>{
    wx.showToast({
      title: content,
      icon: "none",
      success: (res) =>{
        resolve(res);
      },
      fail: (err) =>{
        reject(err);
      }
    })
  })
}