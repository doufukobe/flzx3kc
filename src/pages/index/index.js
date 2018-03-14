//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    logoSrc: '../../images/index/logo_img.png',
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
