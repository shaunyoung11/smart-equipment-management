import url from '../../config';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const userInfo = await wx.cloud.callFunction({
      name: 'getUserInfo'
    });
    this.setData({
      userId: userInfo.result.data[0].username
    })
  },

  /**
   * 选择照片事件
   * @param {Object} e 
   */
  async handleChoosePhoto(e) {
    console.log(e);
    this.setData({
      filePath: e.detail.tempFilePaths[0]
    });
  },

  handleUploadImage() {
    wx.uploadFile({
      filePath: this.data.filePath,
      name: 'photo',
      url: url + '/user/active',
      formData: {
        userId: userId
      },
      success: (res) => {
        console.log('成功', res);
      },
      fail: (res) => {
        console.log('失败', res);
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