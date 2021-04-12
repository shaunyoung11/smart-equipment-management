// miniprogram/pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log('扫码成功', res);
        wx.checkIsSupportSoterAuthentication({
          success: (auth) => {
            console.log('获取支持的生物认证技术成功', auth);
            wx.startSoterAuthentication({
              challenge: res.result,
              requestAuthModes: [...auth.supportMode],
              authContent: '请进行身份认证',
              success: (auths) => {
                console.log(auths);
                //
              },
              fail: (authf) => {
                console.log(authf);
                wx.showToast({
                  title: '失败！',
                })
              }
            })
          },
          fail: (res) => {
            console.log('获取支持的生物认证技术失败', res);
          }
        })
      },
      fail: (res) => {
        console.log('扫码失败', res);
        wx.navigateBack({
          delta: 1,
        })
      }
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