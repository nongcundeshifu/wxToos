// pages/testNavigator/testNavigator.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        initData: {
            title: "覆盖标题",
            bgColor: "white",
            navBgColor: "white",
            itemColor: "red"
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        app.selectComponent(this);  //获取 navigate 组件对象
        
        setTimeout(() => {
            this.nav.setInitData({
                viceTitle:"返回"
            })
        },3000)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    bindNavTap() {
        console.log(4)
        wx.switchTab({
            url:"../logs/logs",
            fail(err) {
                console.log(err)
            }
        })
    }
})