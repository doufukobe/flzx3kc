//index.js
Page({
  data: {
    logoSrc: '../../images/index/logo_img.png',
    isAttendanced: true,
    attendanceTitle: '【签到领金币】',
    attendanceTip: '已连续签到1天',
    attendanceDay: 1,
    attendanceDayList: [1,2,3,4,5,6,7],
    attendanceCoinList: ['+10', '+20', '+30', '+40', '+50', '+60', '+100'],
    takeAttendance: '立即签到',
    log:'log'
  },
  //事件处理函数
  goTo(e) {
    const type = e.target.dataset.type;
    const url = `../${type}/${type}`;
    wx.navigateTo({
      url: url
    });
  },
  onLoad: function (options) {
    wx.getUserInfo({
      success: function (res) {
        res.userInfo.userId = '666666'
        wx.setStorage({
          key: "userInfo",
          data: res.userInfo
        });

        wx.showModal({
          title: 'getUserInfo success',
          content: JSON.stringify(res),
        });
      },
      fail(e) {
        wx.showModal({
          title: 'getUserInfo error',
          content: JSON.stringify(e),
        });
      }
    });
   
  },
  // publish(e) {
  //   const self = this;
  //   wx.request({
  //     url: 'https://is.snssdk.com/ugc/publish/post/v4/commit/',
  //     data: {
  //       user_id: 6878426975,
  //       content: '测试发帖',
  //       concern_id: 6286225228934679042,
  //       image_uris: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg',
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       // self.setData({
  //       //   log: res.data
  //       // })
  //       console.log(res.data)
  //     },
  //     fail: function (res) {
  //       // self.setData({
  //       //   log: res.data
  //       // })
  //       console.log(res.data)
  //     }
  //   })
  // }
  getUserInfo(e) {
    const self = app;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country

        // log = userInfo.nickName
        self.setData({
          log: userInfo.userId
        })
      }
    })
  },
  onShareAppMessage(option) {
    // option.from === 'button'
    return {
      title: '猜猜成语 — 猜成语，好友PK，一起来玩!',
      desc: '这个游戏太好玩了，一起来玩吧',
      path: '/pages/index/index?from=sharebuttonabc&otherkey=othervalue', // ?后面的参数会在分享页面打开时传入onLoad方法
      imageUrl: 'http://p3.pstatp.com/origin/6ef00004cb45c8129641',
      success () {
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
