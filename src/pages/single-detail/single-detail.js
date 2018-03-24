// pages/single-detail/single-detail.js
import { getIdiomDetailInfo, universalScore, answerIdiomSuccess } from '../../utils/api.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0, // 题目序号，默认从1开始
    maxLevel: 100,
    idiomSrc: '../../images/single-detail/idiom-bg.png', // 成语背景图链接
    idiomBgSrc: '../../images/single-detail/idiom-bg-large.png', // 通用背景链接
    downloadBgSrc: '../../images/single-detail/idiom-bg-down.png', // 底部吸底图片
    icon: '../../images/single-detail/money_icon.png',
    inputIdiom: ['', '', '', ''], // 输入成语数据源
    selectChars: [
      '連', '膽', '夸', '話', '費', '級', '抗', '為',
      '夸', '輕', '木', '精', '頭', '不', '騙', '蛇',
      '為', '追', '日', '這', '片', '哈', '中', '尾'
    ],
    hideIndex: [-1, -1, -1, -1], // 隐藏字符对应 selectChars 索引
    isSuccess: false, // 标注成语是否答对
    isError: false, // 标注是否展示错误 toast
    // errorMsg: '存在错误哦！',
    errorMsg: '先删除错误答案',
    idiomDetail: {}, // 接口返回成语详情数据
    coinCount: 300,
    userInfo: {}
  },

  // 事件处理函数
  handleTap(e) {
    const index = e.target.dataset.index;
    this.handleAdd(index);
  },
  goToNext(levelId) {
    const nextIndex = ~~this.data.index + 1;
    const maxLevel = ~~this.data.maxLevel;
    let jumpUrl = '../single-detail/single-detail?index=' + nextIndex + '&max_level=' + maxLevel;
    if (this.data.maxLevel === this.data.index) {
      jumpUrl = '../game-over/game-over'
    };
    console.log(jumpUrl)
    wx.redirectTo({
      url: jumpUrl,
    });
    this.answerSuccess();
  },
  toastSuccess() {
    this.setData({
      isSuccess: !this.data.isSuccess,
    });

    // 闯关成功接口
  },
  toastError(errorMsg) {
    this.setData({
      errorMsg,
    })
    this.setData({
      isError: true,
    });

    setTimeout(() => {
      this.setData({
        isError: false,
      });
    }, 1500);
  },
  handleAdd(index) {
    const hideIndex = this.data.hideIndex;
    const currentChar = this.data.idiomDetail.words[index];

    if (typeof index === 'undefined') {
      return;
    }

    // 如果已经插入，则返回
    if (hideIndex.indexOf(index) !== -1) {
      return;
    }

    // 获取插入前字数
    const beforeInsertNum = this.data.inputIdiom.filter(item => item !== '').length;

    if (beforeInsertNum === 4) {
      this.toastError('先删除错误答案');
      return;
    }

    const inputIdiom = this.data.inputIdiom;

    // 将当前词插入到填入框中
    for (let i = 0; i < inputIdiom.length; i++) {
      if (inputIdiom[i] === '') {
        inputIdiom[i] = currentChar;
        break;
      }
    }
    this.setData({
      inputIdiom,
    });

    // 获取当前填入字数
    const afterInsertNum = this.data.inputIdiom.filter(item => item !== '').length;

    // 遍历完成没有插入的话，判断答案是否正确。
    if (afterInsertNum === 4 && this.data.inputIdiom.join('') === this.data.idiomDetail.answer) {
      this.toastSuccess();
    } else if (afterInsertNum === 4 && this.data.inputIdiom.join('') !== this.data.idiomDetail.answer) {
      this.toastError('存在错误哦');
    }

    // hideIndex.push(index);
    hideIndex[afterInsertNum - 1] = index;
    this.setData({
      hideIndex
    });
    console.log(this.data.hideIndex);
  },
  handleDelete(e) {
    const index = e.target.dataset.index;
    const inputIdiom = this.data.inputIdiom;
    const hideIndex = this.data.hideIndex;
    // hideIndex.splice(index, 1);
    hideIndex[index] = -1;
    inputIdiom[index] = '';

    this.setData({
      inputIdiom,
      hideIndex,
    });
  },
  // 提示一个字
  prompt(e) {
    const currentValidLength = this.data.inputIdiom.filter(item => item !== '').length;
    if (currentValidLength === 4) {
      this.toastError('先删除错误答案');
      return;
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

    universalScore(userId, -30, 'use_suggestions').then(data => {
      if (data.status === 'success') {
        console.log(data);
        console.log(this.data.idiomDetail.answer.split(''));
        console.log(this.data.inputIdiom.length);
        const nextCorrectChar = this.data.idiomDetail.answer.split('')[currentValidLength];
        console.log(nextCorrectChar);

        const index = this.data.idiomDetail.words.indexOf(nextCorrectChar);
        this.handleAdd(index);
      } else {
        this.toastError(data.message);
      }
    });
  },
  // 跳过
  skip(e) {
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
    universalScore(userId, -100, 'use_suggestions').then(data => {
      if (data.status === 'success') {
        this.answerSuccess();
      } else {
        this.toastError(data.message);
      }
    });
  },
  answerSuccess() {
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
    answerIdiomSuccess(userId, this.data.index).then(data => {
      this.toastSuccess();

      universalScore(userId, 10, 'answer_correctly').then(data => {

      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      index: options.index,
      maxLevel: options.max_level
    });

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

    getIdiomDetailInfo(userId, this.data.index).then(data => {
      console.log(data);
      this.setData({
        idiomDetail: data,
        coinCount: data.score
      });
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