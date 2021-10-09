// logs.js

Page({
  data: {
    logs: []
  },
  onLoad() {
  },
  startGame(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  rule(){
    wx.navigateTo({
      url: '/pages/rule/rule'
    })
  }
})
