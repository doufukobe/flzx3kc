// pages/single/single.js
import { getCurrentLevelInfo } from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    idiomList: [],
    // currentProgress: 34, // 当前进度,
    idiomInfo: {},
  },
  // 事件处理函数
  goTo(e) {
    const index = parseInt(e.target.dataset.index, 10);
    if (index === this.data.idiomInfo.next_level) {
      wx.navigateTo({
        url: `../single-detail/single-detail?index=${index}`,
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

    // 不支持 async
    getCurrentLevelInfo(1).then((data) => {
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
  onShareAppMessage: function () {
  
  }
})