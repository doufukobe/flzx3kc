// pages/single/single.js
import { getCurrentLevelInfo } from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    idiomList: [],
    // currentProgress: 34, // 当前进度,
    idiomInfo: {},
  },
  // 事件处理函数
  goTo(e) {
    const index = parseInt(e.target.dataset.index, 10);
    if (index === this.data.idiomInfo.next_level) {
      wx.navigateTo({
        url: `../single-detail/single-detail?index=${index}&max_level=${this.data.idiomInfo.max_level}`,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Promise) {
      console.log('support');
    }

    const self = this;
    let userId = 1;
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log(value)
        userId = value.userId;
        console.log(value.userId)
        self.setData({
          userInfo: value
        });
      }
    } catch (e) {
      //  userInfo
    }

    // 不支持 async
    getCurrentLevelInfo(userId).then((data) => {
      console.log(data);
      this.setData({
        idiomInfo: data[0],
        idiomList: data[1],
      })
    });
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
    // 不支持 async
    getCurrentLevelInfo(1).then((data) => {
      console.log(data);
      this.setData({
        idiomInfo: data[0],
        idiomList: data[1],
      });
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(option) {
    // option.from === 'button'
    return {
      title: '猜猜成语 — 猜成语，好友PK，一起来玩!',
      desc: '这个游戏太好玩了，一起来玩吧',
      path: '/pages/index/index?from=sharebuttonabc&otherkey=othervalue', // ?后面的参数会在分享页面打开时传入onLoad方法
      imageUrl: 'http://p3.pstatp.com/origin/6ef00004cb45c8129641',
      success() {
        self.setData({
          log: '分享发布器已吊起，并不意味着用户分享成功，微头条不提供这个时机的回调'
        })
      },
      fail() {
        self.setData({
          log: '分享发布器吊起失败'
        })
      }
    }
  }
})