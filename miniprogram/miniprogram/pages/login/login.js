import url from '../../config';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.handleLogin();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 监听输入事件
   * @param {Object} e 
   */
  changeValue(e) {
    console.log(e);
    switch (e.currentTarget.dataset.name) {
      case 'username': {
        this.setData({
          username: e.detail.value
        });
        break;
      }
      case 'password': {
        this.setData({
          password: e.detail.value
        });
        break;
      }
    }
  },

  /**
   * 处理登录事件
   * @param {Object} e 
   */
  async handleLogin(e) {
    console.log(e, this.data.username, this.data.password);
    const userInfo = await wx.cloud.callFunction({
      name: 'login',
      data: {
        username: this.data.username,
        password: this.data.password
      }
    }).then((res) => {
      return res;
    });
    console.log(userInfo);
    this.handleRequest(userInfo.result.data[0].username,userInfo.result.data[0].password);
  },

  async handleRequest(username, password) {
    if(username!==''&&password!==''){

      wx.request({
        url: url + '/login',
        method: "POST",
        data: {
          username:username,
          password:password
        },
        success: (res) => {
          console.log(res);
          if (res.data.success) {
            wx.navigateTo({
              url: `../index/index?isActive=${res.data.data.userInfo.activeTag}`,
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon:'none'
            });
          }
        },
        fail: (res) => {
          console.log(res);
          wx.showModal({
            title: '失败',
            content: res.data.message
          });
        }
      });
    }
  }
})