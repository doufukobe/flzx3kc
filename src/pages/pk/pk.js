// pages/pk/pk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: -1,
    currentUser: {
      name: '葱头豆瓣酱',
      record: 10,
      score: -9,
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg'
    },
    opponent: {
      name: '葱头豆瓣酱',
      record: 10,
      score: -5,
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg'
    },
    selectChars: [
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
      '夸', '輕', '木', '精', '頭', '不', '騙', '蛇',
      '為', '追', '日', '這', '片', '哈', '中', '尾',
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
      '夸', '輕', '木', '精', '頭', '不', '騙', '蛇',
      '為', '追', '日', '這', '片', '哈', '中', '尾',
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
      '夸', '輕', '木', '精', '頭', '不', '騙', '蛇',
      '為', '追', '日', '這', '片', '哈', '中', '尾',
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
    ],
    idiomCharList: [],
    currentSelect: [],
    startPoint: {

    }, // 起始相对于屏幕位置
    currentSelectPoints: [],
    screenWidth: 375,
    fadeOutChars: [0, 10, 11],
  },

  // 事件处理函数
  handleTouchStart(e) {
    // 记录起始坐标
    console.log(e);
    const startPoint = {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY,
      index: e.target.dataset.index,
    };

    const currentSelectPoints = [];
    currentSelectPoints.push(startPoint);

    this.setData({
      startPoint: startPoint,
      currentSelectPoints: currentSelectPoints,
      currentSelect: [],      
    });
  },
  handleTouchMove(e) {
    // (375 - 25) / 4
    const basicWidth = (375 - 25) / 8; // iphone 6 单元格宽度
    const width = this.data.screenWidth / 375 * basicWidth;
    const height = width;

    // console.log(width, height);

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    // 获得当前点对应的索引。
    const row = parseInt((currentY - this.data.startPoint.clientY) / height, 10);
    const column = parseInt((currentX - this.data.startPoint.clientX) / width, 10);

    const nextIndex = row * 8 + column + this.data.startPoint.index;
    const currentSelect = this.data.currentSelect;
    const currentIndex = e.target.dataset.index;

    if (typeof currentIndex === 'undefined') {
      return;
    }

    if (currentSelect.length === 4) {
      // console.log(currentSelect);
      const idiomCharList = this.data.idiomCharList;
      currentSelect.map((item) => {
        console.log(item);
        idiomCharList[item].isFadeOut = true;
      });
      this.setData({
        idiomCharList: idiomCharList
      });
      return;
    } else if (currentSelect.indexOf(nextIndex) === -1) {
      currentSelect.push(nextIndex);
    }
    this.setData({
      currentSelect: currentSelect
    });
    console.log(currentSelect);
    return;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    const idiomCharList = this.data.idiomCharList;

    this.data.selectChars.map((item) => {
      idiomCharList.push({
        char: item,
        isFadeOut: false,
      });
    });

    this.setData({
      idiomCharList: idiomCharList,
    })
    
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)

        self.setData({
          screenWidth: res.windowWidth
        });
      }
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