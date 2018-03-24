// pages/pk-result/pk-result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isWin: true,
    currentUser: {
      name: '葱头豆瓣酱',
      score: 270,
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg'
    },
    opponent: {
      name: '葱头豆瓣豆瓣酱',
      score: 170,
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg'
    },
    winTip: '金币+10',
    pkTip: 'VS',
    share: '炫耀一下',
    nextGame: '再来一局',
    userInfo: {
      userId: 1
    }
  },

  goToPkLoading() {
    wx.redirectTo({
      url: '../pk-loading/pk-loading',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const self = this;
    // try {
    //   var value = wx.getStorageSync('userInfo')
    //   if (value) {
    //     console.log(value)
    //     self.setData({
    //       userInfo: value,
    //       currentUser: {
    //         name: value.nickName,
    //         score: 0,
    //         record: 5,
    //         avatar: value.avatar,
    //       },
    //     });
    //   }
    // } catch (e) {
    //   //  userInfo
    // }
    const currentUser = this.data.currentUser;
    const opponent = this.data.opponent;
    let isWin = true;

    currentUser.name = options.currentName;
    currentUser.score = options.currentScore;
    currentUser.avatar = options.currentAvatar;
    opponent.name = options.opponentName;
    opponent.score = options.opponentScore;
    opponent.avatar = options.opponentAvatar;

    if (options.currentScore < options.opponentScore) {
      isWin = false;
    }

    this.setData({
      currentUser,
      opponent,
      isWin,
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
  onShareAppMessage(option) {
    // option.from === 'button'
    return {
      title: '猜猜成语 — 猜成语，好友PK，一起来玩!',
      desc: '我在猜猜成语中获得胜利',
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