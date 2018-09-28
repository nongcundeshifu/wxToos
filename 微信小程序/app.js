// app.js
import tools from './lib/utils/tools';
import Service from './lib/Service/Service';
import MTA from './lib/MTA/mta_analysis';
// 将微信的回调函数方法封装成Promise形式
import WxService from './lib/wx-service/WxService';
import regeneratorRuntime from './lib/utils/regenerator-runtime/runtime-module';

App({
    globalData: {
        service: 'https://game.flyh5.cn/small/pingan/api/',
    },
    data: {
        service: 'https://game.flyh5.cn/small/pingan/api/',
    },
    onLaunch() {
        this.MTAInit();

        this.serviceInit();

        this.wxServiceInit();


    },
    /**
     * 接口请求模块的初始化
    */
    serviceInit() {
        this.service = new Service({
            serverUrl: this.data.service,
        });
    },
    /**
     * 腾讯移动分析的初始化
    */
    MTAInit() {
        MTA.App.init({
            appID: '500639352',
            eventID: '500639370',
            statPullDownFresh: true,
            statShareApp: true,
            statReachBottom: true,
        });
    },
    /**
     * 给app对象添加一个wxp对象，这个对象中的方法是wx方法中对应的paromise化方法。
    */
    wxServiceInit() {
        this.wxp = WxService;
        console.log(WxService);
    },

    failureToast(title = '失败', duration = 2000) {
        wx.showToast({
            title,
            duration,
            icon: 'none',
        });
    },
    successToast(title = '成功', duration = 2000) {
        wx.showToast({
            title,
            duration,
            icon: 'success',
        });
    },



    // 获取用户信息
    async getUserInfo() {

        const res = await this.wxp.getSetting();
        let userInfo;

        if (res.authSetting['scope.userInfo']) {
            try {
                userInfo = await this.wxp.getUserInfo();
            }
            catch (error) {
                this.failureToast('获取用户信息失败！');
                return false;
            }


            return userInfo;
        }

        this.failureToast('获取用户信息失败！');
        return false;

    },





});
