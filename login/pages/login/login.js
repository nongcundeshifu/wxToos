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


        // 解析参数地址地址
        //  - 代表是 &
        // ： 代表 =
        //  #  代表是 ？
        // 或者 , 用来代码&也可以
        // 注意：后面改版：使用base64来进行编码即可。
        // 比如 /pages/index/index#id:1-name:zhou   等价于
        // /pages/index/index?id=1&name=zhou

        console.log(login.enCodeWxUrl("/pages/index/index?id=1&name=zhou"));
        // console.log(this.deCodeWxUrl("/pages/index/index#id:1-name:zhou"));
        console.log(login.deCodeWxUrl(login.enCodeWxUrl("/pages/index/index?id=1&name=zhou")));

        console.log(login.getUrlWithArgs("/pages/index/index",{
            id:1,
            name:"zhou"
        }));
        console.log(login.getUrlWithArgs("/pages/index/index"));

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
