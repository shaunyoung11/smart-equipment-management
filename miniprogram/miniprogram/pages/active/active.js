import url from '../../config';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    filePath: ""
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
      filePath: e.detail.tempFilePaths[0],
      files: [{
        url: e.detail.tempFilePaths[0]
      }]
    });
  },

  handleUploadImage() {
    wx.uploadFile({
      filePath: this.data.filePath,
      name: 'image',
      url: url + '/user/active',
      header: {
        "content-type": "multipart/form-data"
      },
      formData: {
        userId: this.data.userId,
      },
      success: (res) => {
        console.log('成功', res);
        const data = JSON.parse(res.data);
        if (data.success) {
          wx.showToast({
            title: '激活成功',
          });
          wx.redirectTo({
            url: '../login/login',
          })
        } else {
          wx.showModal({
            title: '激活失败，请重新选择证件照上传',
            showCancel: false
          });
        }
      },
      fail: (res) => {
        console.log('失败', res);
        wx.showToast({
          title: '上传失败',
          icon: 'none'
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