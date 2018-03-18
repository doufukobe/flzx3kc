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
      name: '葱头豆瓣酱',
      record: 10,
      score: 0,
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/game-files/16393a4b709356457ad45282f6d1e873.jpeg~110x110.jpeg'
    },
    opponent: {
      name: '',
      record: 10,
      score: 0,
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
    leftSecondSrc: '../../images/pk/3.png',
    isBegin: false, // 标识比赛是否开始
    isEnd: false, // 标识比赛是否结束
    leftTimePercentage: '100%',
    userId: 1,
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
    const self = this;
    const idiomCharList = this.data.idiomCharList;
    try {
      var value = wx.getStorageSync('userInfo')
      if (value) {
        console.log(value)
        self.setData({
          userInfo: value,
          currentUser: {
            name: value.nickName,
            score: 0,
            avatar: value.avatarUrl,
          },
        });
      }
    } catch (e) {
      //  userInfo
    }
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          screenWidth: res.windowWidth
        });
      }
    })

    getPKInfo(this.data.userId).then(data => {
      // console.log(data.meta.list);
      this.setData({
        selectChars: data.meta.list,
        answerPath: data.meta.path,
        opponent: {
          name: data.other.name,
          avatar: data.other.avatar_url,
          score: 0,
        }     
      });
      setTimeout(() => {
        console.log(this.data.selectChars);
        
        this.data.selectChars.map((item) => {
          idiomCharList.push({
            char: item,
            isFadeOut: false,
          });
        });

        this.setData({
          idiomCharList: idiomCharList,
        })
      }, 0);
      
    });

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let left = 2; // 2s 倒计时
    let leftTimer;

    // 倒计时的定时器逻辑...
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

        leftTimer = setInterval(() => {
          const number = parseInt(this.data.leftTimePercentage.slice(0, -1), 10);
          const d = number - 16.7;
          if (d <= 0) {
            clearInterval(leftTimer);
            this.setData({
              isEnd: true
            });
            // 上报游戏结束
            updatePKEnding(this.data.userId);

            // 跳转pk结果
            wx.redirectTo({
              url: `../pk-result/pk-result?currentName=${this.data.currentUser.name}&currentScore=${this.data.currentUser.score}&opponentName=${this.data.opponent.name}&opponentScore=${this.data.opponent.score}`,
            });
          } else {
            this.setData({
              leftTimePercentage: d + '%'
            });
          }
        }, 1000);
      }
      left -= 1;
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取对手进度的定时器逻辑
    let opponentTimer = setInterval(() => {
      if (this.data.isEnd) {
        clearInterval(opponentTimer);
      } else if (this.data.isBegin) {
        getOpponentPKInfo(this.data.userId).then((data) => {
          this.deleteIdiom(data);
        });
      }
    }, 1000);
  },
  // 删除成语，在获取对手进度后使用，主要是增加 fadeOut 类
  deleteIdiom(idiomList) {
    const opponentSelect = [];
    
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
    // 更新本地分数
    const currentUser = this.data.currentUser;
    currentUser.score += 10;
    this.setData({
      currentUser,
    });
    updatePKInfo(this.data.userId, cy).then(data => {

    });
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