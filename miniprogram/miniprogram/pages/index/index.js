// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isActive: true,
    inactive:[
      {
        logo: '/images/active.png',
        name: '账号激活',
        operation: 'active',
      }
    ],
    actived: [
      {
        logo: '/images/scan_code.png',
        name: '扫码借用设备',
        operation: 'scan',
      },
      {
        logo: '/images/swipe.png',
        name: '扫 NFC 借用设备',
        operation: 'swipe',
      }
    ]
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
   * 处理选择菜单
   * @param {Object} e 
   */
  handleSelectOperation(e){
    let data = e.currentTarget.dataset.operation;
    switch (data) {
      case 'active':
        wx.navigateTo({
          url: '/pages/active/active',
        })
        break;
      
      case 'scan':
        wx.navigateTo({
          url: '/pages/scan/scan',
        })
        break;

      case 'swipe':
        wx.navigateTo({
          url: '/pages/swipe/swipe',
        })
        break;
    }
  }
})