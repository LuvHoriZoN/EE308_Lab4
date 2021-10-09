// pages/game/game.js
import regeneratorRuntime from '../../utils/regenerator-runtime/runtime-module.js'
import api from '../../utils/api.js'
const {
  $Toast
} = require('../../iview/base/index')

let his = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game: 'game',
    leaderboard: {},
    integral: 0,
    name: '',
    score: 0,
    image_1: '/img/shaizi_1.png',
    image_2: '/img/shaizi_2.png',
    image_3: '/img/shaizi_3.png',
    image_4: '/img/shaizi_4.png',
    image_5: '/img/shaizi_5.png',
    image_6: '/img/shaizi_6.png',
    move_1: '',
    move_2: '',
    move_3: '',
    move_4: '',
    move_5: '',
    move_6: '',
    visable_1: false,
    actions_1: [{
      name: '确定'
    }],
    maskShow: true,
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: async function (options) {
     his = []
    this.setData({
      history: []
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
    setTimeout(() => {
      this.setData({
        maskShow: false
      })
      wx.hideLoading()
    }, 1000)
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



  onComponentsShow() {
    this.bottomNavigation = this.selectComponent("#game")
    // this.bottomNavigation._displayShow()
  },

  async gameStart() {
    let arr = []
    for (var i = 0; i < 6; i++) {
      arr.push(Math.floor(Math.random() * 6) + 1)
    }

    let answer = 0
    let tips = '未中奖'
    this.setData({
      move_1: 'image-1',
      move_2: 'image-2',
      move_3: 'image-3',
      move_4: 'image-4',
      move_5: 'image-5',
      move_6: 'image-6'
    })
    for (let key of arr) {
      if (key === 4) {
        answer = answer + 1
      }
    }
    this.setData({
      name: 'ssss',
      score: 666,
      image_1: `/img/shaizi_${arr[0]}.png`,
      image_2: "/img/shaizi_" + arr[1] + ".png",
      image_3: "/img/shaizi_" + arr[2] + ".png",
      image_4: "/img/shaizi_" + arr[3] + ".png",
      image_5: "/img/shaizi_" + arr[4] + ".png",
      image_6: "/img/shaizi_" + arr[5] + ".png",
    })
    setTimeout(() => {
      this.setData({
        move_1: '',
        move_2: '',
        move_3: '',
        move_4: '',
        move_5: '',
        move_6: '',
        leaderboard: 'sss'
      })
      switch (answer) {
        case 0:
          tips = '未中奖'
          break;
        case 1:
          tips = '一秀'
          break;
        case 2:
          tips = '二举'
          break;
        case 3:
          tips = '三红'
          break;
        case 4:
          tips = '四红'
          break;
        case 5:
          tips = '五红'
          break;
        case 6:
          tips = '红六勃'
          break;
        default:
          break;
      }

      his.push({
        his: arr.toString(),
        tips:tips
      })


      this.setData({
        history: his
      })
      console.log(this.data.history)
      setTimeout(() => {
        wx.showToast({
          title: tips,
          icon: 'success',
          duration: 2000,
          mask: true
        })
      }, 100)
    }, 1000)
  },

  focusClick_1({
    detail
  }) {
    this.setData({
      visable_1: false
    })
  }
})