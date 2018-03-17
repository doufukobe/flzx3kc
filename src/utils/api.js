const host = 'http://10.11.40.72:9909';
const standAlone = {
  currentLevel: '/stand_alone/current_level',
  levelDetail: '/stand_alone/level_detail',
  success: '/stand_alone/success',
};
const pathScore = {
  record: '/score/record',
}

// 获取当前闯关信息
const getCurrentLevelInfo = (userId) => {
  return new Promise((resolve) => {
    wx.request({
      // FIXME: 从 globalData 获取 API 配置，目前 getApp 存在 bug，返回 undefined
      url: `${host}${standAlone.currentLevel}`, //仅为示例，并非真实的接口地址
      data: {
        user_id: userId
      },
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: (res) => {
        console.log(res.data)
        const maxLevel = res.data.data.max_level;
        const idiomList = new Array(maxLevel);
        resolve([res.data.data, idiomList]);
      }
    });
  });
}

// 获取成语详情
const getIdiomDetailInfo = (userId, levelId) => {
  return new Promise((resolve) => {
    wx.request({
      // FIXME: 从 globalData 获取 API 配置，目前 getApp 存在 bug，返回 undefined
      url: `${host}${standAlone.levelDetail}`,
      data: {
        user_id: userId,
        level_id: levelId,
      },
      success: (res) => {
        console.log(res.data)
        resolve(res.data.data);
      }
    });
  });
}

// 通用积分接口
const universalScore = (userId, score, comment) => {
  return new Promise((resolve) => {
    wx.request({
      url: `${host}${pathScore.record}`,
      data: {
        user_id: userId,
        score,
        comment,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        resolve(res.data.data);
      }
    });
  });
}

// 闯关成功接口
const answerIdiomSuccess = (userId, levelId) => {
  return new Promise((resolve) => {
    wx.request({
      url: `${host}${standAlone.success}`,
      data: {
        user_id: userId,
        level_id: levelId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        resolve(res.data.data);
      }
    });
  });
}

export {
  getCurrentLevelInfo,
  getIdiomDetailInfo,
  universalScore,
  answerIdiomSuccess,
}