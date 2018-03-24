// pages/rank/rank.js
import { getRankList } from '../../utils/api.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerSrc: '../../images/rank/rank_banner.png',
    championSrc: '../../images/rank/champion_cup.png',
    topThreeSrc: '../../images/rank/top_three_bg.png',
    fisrtAvatarUrl: '../../images/rank/first.jpg',
    secondAvatarUrl: '../../images/rank/first.jpg',
    thirdAvatarUrl: '../../images/rank/first.jpg',
    fisrtName: '雷子',
    secondName: 'Jabaiak',
    thirdName: '于童',
    fisrtScore: '4320',
    mineRank: '460',
    mineName: '葱头豆瓣酱',
    mineScore: '480',
    myUserInfo: {},
    userInfo: {score: '300', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
    userList: [{rank: '1', score: '300', user_name: '葱头豆瓣酱', avatar:'../../images/rank/first.jpg'},
               {rank: '2', score: '250', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '3', score: '250', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '4', score: '200', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '5', score: '150', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '6', score: '100', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '7', score: '100', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '8', score: '90', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'},
               {rank: '9', score: '80', user_name: '葱头豆瓣酱', avatar: '../../images/rank/first.jpg'}],
    share: '炫耀一下',
    unfollowIcon: '../../images/rank/unfollow.png',
    followedIcon: '../../images/rank/followed.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    let userId = 1;
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log(value)
        self.setData({
          myUserInfo: value,
        });
        userId = value.userId;
      }
    } catch (e) {
      //  userInfo
    }

    getRankList(userId).then((data) => {
      console.log(data);
      this.setData({
        userList: data.rank,
        userInfo: data.top.user_info,
        mineRank: data.top.rand_num,
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
  onShareAppMessage(option) {
    const self = this;
    // option.from === 'button'
    return {
      title: '猜猜成语 — 猜成语，好友PK，一起来玩！',
      desc: '我在小程序“猜猜成语”富豪榜排名第' + self.data.mineRank +'位，看看你的排名吧',
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
  },
  onFollowUser(e) {
    wx.dealUserRelation({
      action: 'follow', 
      userId: '6878426975',
      success(res) {
        console.log(res)
      }
    })
  }
})