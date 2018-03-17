// pages/single-detail/single-detail.js
import { getIdiomDetailInfo, universalScore, answerIdiomSuccess } from '../../utils/api.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0, // 题目序号，默认从1开始
    idiomSrc: '../../images/single-detail/idiom-bg.png', // 成语背景图链接
    idiomBgSrc: '../../images/single-detail/idiom-bg-large.png', // 通用背景链接
    downloadBgSrc: '../../images/single-detail/idiom-bg-down.png', // 底部吸底图片
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
  },

  // 事件处理函数
  handleTap(e) {
    const index = e.target.dataset.index;
    this.handleAdd(index);
  },
  goToNext(levelId) {
    wx.redirectTo({
      url: '../single-detail/single-detail?index=' + (~~this.data.index + 1),
    });
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

    universalScore(1, -30, 'use_suggestions').then(data => {
      if (data) {
        console.log(this.data.idiomDetail.answer.split(''));
        console.log(this.data.inputIdiom.length);
        const nextCorrectChar = this.data.idiomDetail.answer.split('')[currentValidLength];
        console.log(nextCorrectChar);

        const index = this.data.idiomDetail.words.indexOf(nextCorrectChar);
        this.handleAdd(index);
      }
    });
  },
  // 跳过
  skip(e) {
    // todo: 扣分
    universalScore(1, -100, 'use_suggestions').then(data => {
      if (data) {
        this.answerSuccess();
      }
    });

    // 闯关成功
  },
  answerSuccess() {
    answerIdiomSuccess(1, this.data.index).then(data => {
      this.toastSuccess();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      index: options.index
    });

    getIdiomDetailInfo(1, this.data.index).then(data => {
      console.log(data);
      this.setData({
        idiomDetail: data
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
  
  }
})