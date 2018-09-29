// pages/login/login.js
import login from '../../utils/login/login.js';
// const base64 = require('../utils/base64.js');
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


        

        let route = options.route;
        if(route) {
            route = login.deCodeWxUrl(route);
        }
        this.setData({
            options,
            route:route || false,
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

    getUserInfo(e) {
        console.log(e.detail)
        const self = this;
        if (e.detail.userInfo) {
            console.log("已授权")
            let route = self.data.route;
            if (route) {
                wx.redirectTo({
                    url: route,
                    success: function (res) { }
                })
            }
            else {
                // 默认首页
                wx.redirectTo({
                    url: '../index/index',
                    success: function (res) { }
                })
            }
        }
        else {
            console.log("未授权")
            wx.showToast({
                title: '授权失败',
                icon: "none",
                duration: 1000,
            })
        }
    }
})
