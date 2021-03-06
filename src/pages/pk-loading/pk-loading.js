// pages/pk-loading/pk-loading.js
import { getPKInfo } from '../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isMatched: false, // 是否匹配成功
    passedTime: 0, // 已等待时间
    currentUser: {
      name: '',
      record: 10,
      avatar: ''
    },
    opponent: {
      name: '',
      record: 0,
      avatar: ''
    },
    timer: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const self = this;
   try {
     var value = wx.getStorageSync('userInfo')
     if (value) {
       self.setData({
         userInfo: value,
         currentUser: {
           name: value.nickName,
           score: 0,
           record: 5,
           avatar: value.avatarUrl,
         },
       });
     }
   } catch (e) {
     //  userInfo
   }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let seekOpponentTimer = setInterval(() => {
      let passedTime = this.data.passedTime;
      passedTime += 1;
      this.setData({
        passedTime,
      });
      const userInfo = this.data.userInfo;
      getPKInfo(userInfo.userId).then((data) => {
        if (data.game_status === 1) {
          clearInterval(seekOpponentTimer);
          this.setData({
            isMatched: true,
            opponent: {
              name: data.other.name,
              avatar: data.other.avatar_url
            }
          });

          let timer = setTimeout(() => {
            wx.redirectTo({
              url: '../pk/pk',
            });
          }, 3000);

          this.setData({
            timer,
          });
        }
      });
    }, 1000);

    this.setData({
      seekOpponentTimer,
    });
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
    clearTimeout(this.data.timer);
    clearInterval(this.data.seekOpponentTimer);    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(this.data.timer);  
    clearInterval(this.data.seekOpponentTimer);
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