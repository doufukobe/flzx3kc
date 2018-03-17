//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logoSrc: '../../images/index/logo_img.png',
    isAttendanced: false,
    attendanceTitle: '【签到领金币】',
    attendanceTip: '已连续签到1天',
    attendanceDay: 1,
    attendanceDayList: [1,2,3,4,5,6,7],
    attendanceCoinList: ['+10', '+20', '+30', '+40', '+50', '+60', '+100'],
    takeAttendance: '立即签到',
  },
  //事件处理函数
  goTo(e) {
    const type = e.target.dataset.type;
    const url = `../${type}/${type}`;
    wx.navigateTo({
      url: url
    });
  },
})
