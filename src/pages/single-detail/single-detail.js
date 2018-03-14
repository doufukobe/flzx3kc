// pages/single-detail/single-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, // 题目序号，默认从1开始
    idiomSrc: '../../images/single-detail/idiom-bg.png', // 成语背景图链接
    idiomBgSrc: '../../images/single-detail/idiom-bg-large.png', // 通用背景链接
    downloadBgSrc: '../../images/single-detail/idiom-bg-down.png', // 底部吸底图片
    inputIdiom: ['夸', '父', '追', ''], // 输入成语数据源
    selectChars: [
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
      '夸', '輕', '木', '精', '頭', '不', '騙', '蛇',
      '為', '追', '日', '這', '片', '哈', '中', '尾'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      index: options.index
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