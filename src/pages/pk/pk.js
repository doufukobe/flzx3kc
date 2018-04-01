// pages/pk/pk.js
import { getPKInfo, updatePKInfo, getOpponentPKInfo, updatePKEnding } from '../../utils/api.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    currentIndex: -1,
    currentUser: {
      name: '',
      record: 10,
      score: 0,
      avatar: ''
    },
    opponent: {
      name: '',
      record: 10,
      score: 0,
      avatar: ''
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
    leftSecondSrc: '../../images/pk/3.png',
    isBegin: false, // 标识比赛是否开始
    isEnd: false, // 标识比赛是否结束
    leftTimePercentage: '100%',
    userId: '',

    timer: null, // 比赛开始倒计时
    leftTimer: null, // 比赛剩余时间倒计时
    opponentTimer: null, // 获取对手进度倒计时
  },

  // 事件处理函数
  handleTap(e) {
    // console.log(e.target.dataset.index);
    let currentSelect = this.data.currentSelect;
    const newIndex = e.target.dataset.index;

    // 当前没有选择元素
    if (currentSelect.length === 0) {
      currentSelect.push(newIndex);      
    } else {
      // 判断是否可以选择
      const lastIndex = currentSelect[currentSelect.length - 1];
      const validIndexList = [lastIndex + 1, lastIndex - 1, lastIndex + 8, lastIndex - 8];
      if (currentSelect.indexOf(newIndex) === -1 && validIndexList.indexOf(newIndex) !== -1) {
        currentSelect.push(newIndex);
      }
    }

    if (currentSelect.length === 4) {
      // 判断是否正确
      const answer = [];
      
      for (let i = 0; i < 4; i++) {
        answer.push(this.data.idiomCharList[currentSelect[i]].char);
      }
      console.log(answer);
      let isRight = false;
      if (this.data.answerPath[answer.join('')]) {
        isRight = true;
      }

      // const isRight = false;

      if (isRight) {
        const idiomCharList = this.data.idiomCharList;
        currentSelect.map((item) => {
          console.log(item);
          idiomCharList[item].isFadeOut = true;
        });

        // 正确
        currentSelect = [];
        this.setData({
          idiomCharList: idiomCharList,
          currentSelect: [],
        });
        this.postIdiom(answer.join(''));
      } else {
        setTimeout(() => {
          currentSelect = [];
          this.setData({
            currentSelect: []
          });
        }, 500);
        this.setData({
          currentSelect: currentSelect
        });
      }

      return;
    } else if (currentSelect.indexOf(newIndex) === -1) {
      // currentSelect.push(newIndex);
    }
    this.setData({
      currentSelect: currentSelect
    });

  },
  handleTouchStart(e) {
    // 记录起始坐标
    // 滑动代码
    // const startPoint = {
    //   clientX: e.touches[0].clientX,
    //   clientY: e.touches[0].clientY,
    //   index: e.target.dataset.index,
    // };

    // const currentSelectPoints = [];
    // currentSelectPoints.push(startPoint);

    // this.setData({
    //   startPoint: startPoint,
    //   currentSelectPoints: currentSelectPoints,
    //   currentSelect: [],      
    // });
  },
  handleTouchMove(e) {
    // 滑动代码
    // // (375 - 25) / 4
    // const basicWidth = (375 - 25) / 8; // iphone 6 单元格宽度
    // const width = this.data.screenWidth / 375 * basicWidth;
    // const height = width;

    // const currentX = e.touches[0].clientX;
    // const currentY = e.touches[0].clientY;

    // // 获得当前点对应的索引。
    // const row = parseInt((currentY - this.data.startPoint.clientY) / height, 10);
    // const column = parseInt((currentX - this.data.startPoint.clientX) / width, 10);

    // const nextIndex = row * 8 + column + this.data.startPoint.index;
    // const currentSelect = this.data.currentSelect;
    // const currentIndex = e.target.dataset.index;

    // if (typeof currentIndex === 'undefined') {
    //   return;
    // }

    // if (currentSelect.length === 4) {
    //   // console.log(currentSelect);
    //   const idiomCharList = this.data.idiomCharList;
    //   currentSelect.map((item) => {
    //     console.log(item);
    //     idiomCharList[item].isFadeOut = true;
    //   });
    //   this.setData({
    //     idiomCharList: idiomCharList
    //   });
    //   return;
    // } else if (currentSelect.indexOf(nextIndex) === -1) {
    //   currentSelect.push(nextIndex);
    // }
    // this.setData({
    //   currentSelect: currentSelect
    // });
    // return;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const self = this;
    let userId = 1;
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log(value)
        userId = value.userId;
        console.log(value.userId)
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
      console.log(e)
      //  userInfo
    }

    // 获取屏幕宽度，原本交互是滑动消除，所以需要获取屏幕宽度，并计算当前所在点。
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          screenWidth: res.windowWidth
        });
      }
    });

    getPKInfo(userId).then(data => {
      console.log(data);
      this.setData({
        selectChars: data.meta.list,
        answerPath: data.meta.path,
        opponent: {
          name: data.other.name,
          avatar: data.other.avatar_url,
          score: 0,
        }
      });

      const idiomCharList = [];
     
      this.data.selectChars.map((item) => {
        idiomCharList.push({
          char: item,
          isFadeOut: false,
        });
      });

      this.setData({
        idiomCharList: idiomCharList,
      });
    });

    // 定时器相关
    let left = 2; // 2s 倒计时
    let leftTimer;

    // 比赛开始倒计时的定时器逻辑...
    let timer = setInterval(() => {
      if (left > 0) {
        this.setData({
          leftSecondSrc: `../../images/pk/${left}.png`,
        });
      }

      if (left === 0) {
        this.setData({
          isBegin: true,
        });
        clearInterval(timer);

        // 比赛倒计时的定时器逻辑...
        leftTimer = setInterval(() => {
          const number = parseInt(this.data.leftTimePercentage.slice(0, -1), 10);
          const d = number - 1.67;
          if (d <= 0) {
            clearInterval(leftTimer);
            this.setData({
              isEnd: true
            });
            // 上报游戏结束

            const self = this;
            let userId = 1;
            try {
              var value = wx.getStorageSync('userInfo')
              if (value) {
                console.log(value)
                userId = value.userId || 1;
                console.log(value.userId)
                self.setData({
                  userInfo: value
                });
              }
            } catch (e) {
              console.log(e)
              //  userInfo
            }
            updatePKEnding(userId);

            // 跳转pk结果
            wx.redirectTo({
              url: `../pk-result/pk-result?currentName=${this.data.currentUser.name}&currentScore=${this.data.currentUser.score}&opponentName=${this.data.opponent.name}&opponentScore=${this.data.opponent.score}&currentAvatar=${this.data.currentUser.avatar}&opponentAvatar=${this.data.opponent.avatar}`,
            });
          } else {
            this.setData({
              leftTimePercentage: d + '%'
            });
          }
        }, 1000);

        this.setData({
          leftTimer: leftTimer
        });
      }
      left -= 1;
    }, 1000);

    this.setData({
      timer: timer
    });

    // 获取对手进度的定时器逻辑
    let opponentTimer;

    opponentTimer = setInterval(() => {
      if (this.data.isEnd) {
        clearInterval(opponentTimer);
      } else if (this.data.isBegin) {
        getOpponentPKInfo(userId).then((data) => {
          this.deleteIdiom(data);
        });
      }
    }, 1000);

    this.setData({
      opponentTimer: opponentTimer
    });
  },
  // 删除成语，在获取对手进度后使用，主要是增加 fadeOut 类
  deleteIdiom(idiomList) {
    const opponentSelect = [];
    console.info('!!!!');
    console.info(idiomList);
    idiomList.forEach((idiom) => {
      if (this.data.answerPath[idiom]) {
        const charPathList = this.data.answerPath[idiom];
        const opponent = this.data.opponent;
        opponent.score += 10;

        this.setData({
          opponent,
        });

        charPathList.forEach(charPath => {
          opponentSelect.push(charPath[0] + charPath[1] * 8);
        });
      }
    });

    const idiomCharList = this.data.idiomCharList;
    opponentSelect.map((item) => {
      console.log(item);
      idiomCharList[item].isFadeOut = true;
    });

    this.setData({
      idiomCharList: idiomCharList,
    });
  },

  // 更新自己成语信息
  postIdiom(cy) {
    const self = this;
    let userId = 1;
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log(value)
        userId = value.userId || 1;
        console.log(value.userId)
        self.setData({
          userInfo: value
        });
      }
    } catch (e) {
      console.log(e)
      //  userInfo
    }
    // 更新本地分数
    const currentUser = this.data.currentUser;
    currentUser.score += 10;
    this.setData({
      currentUser,
    });
    updatePKInfo(userId, cy).then(data => {

    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 清除定时器
    console.log('on hide');
    clearInterval(this.data.timer);
    clearInterval(this.data.leftTimer);
    clearInterval(this.data.opponentTimer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('on unload');
    clearInterval(this.data.timer);
    clearInterval(this.data.leftTimer);
    clearInterval(this.data.opponentTimer);
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