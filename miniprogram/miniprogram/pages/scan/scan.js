// miniprogram/pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    deviceId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log('扫码成功', res);
        this.setData({
          deviceId: res.result
        })
        wx.checkIsSupportSoterAuthentication({
          success: (auth) => {
            console.log('获取支持的生物认证技术成功', auth);
            wx.startSoterAuthentication({
              challenge: res.result,
              requestAuthModes: [...auth.supportMode],
              authContent: '请进行身份认证',
              success: (auths) => {
                console.log(auths);
                this.handleRequest();
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
            wx.showModal({
              title:'提示',
              content: '当前设备不支持生物认证，请输入密码！',
              showCancel: false
            })
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

  async handleClickBtn(){
    if(this.data.password !== ''){
      if(await this.handleCheckPassword(this.data.password)){
        this.handleRequest();
      }else{
        wx.showToast({
          title: '密码错误',
          icon: 'none'
        });
      }
    }else{
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
    }
  },

  async handleCheckPassword(password){
    const getPassword = await wx.cloud.callFunction({
      name: 'getUserInfo',
    }).then(res=>{
      return res.result.data[0].password;
    });
    return password === getPassword;
  },

  handleRequest(){
    console.log('这里将发起请求')
    wx.request({
      url: 'url',
      method:'POST',
      data:{},
      success:(res)=>{
        if(res.data.success){
          wx.showModal({
            title: '成功',
            content: '借用设备成功',
            showCancel: false
          });
        }else{
          wx.showModal({
            title: '失败',
            content: res.data.message,
            showCancel: false
          });
        }
      },
      fail: (res)=>{
        wx.showModal({
          title: '失败',
          content: res.data.message,
          showCancel: false
        });
      }
    })
  },

  handleInputChange(e){
    console.log(e);
    this.setData({
      password: e.detail.value
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})