//app.js

const tools = require('utils/tools.js');

// const Event = require("/utils/event.js");
// const requestEvent = new Event();
const regeneratorRuntime = require('./utils/regenerator-runtime/runtime-module.js')
let isRequestRdSession = false;



App({
    data:{

    },
    globalData: {
        
    },
    onLaunch: function () {
        
        this.tools = tools;
        
        
    },
    // 登陆态登陆
    login(cb) {
        let self = this;
        wx.login({
            success: res => {
                self.getUserInfo((userInfo) => {
                    console.log(res)
                    let data = {
                        code: res.code,
                        submit: self.getSubmitKey(),
                        avatarUrl: userInfo.avatarUrl,
                        nickName: userInfo.nickName
                    }
                    // console.log(res.code)
                    //发送 res.code 到后台换取 rdSession
                    self.post_service('Base/getOpen', data, 'GET', function (res) {
                        // console.log('后台接口登录-----res', res)
                        if (res.data.status == 200) {
                            wx.setStorageSync("rdSession", res.data.rdSession)
                            cb(undefined, res.data.rdSession)
                        }
                        else {
                            cb({ err: data.message }, undefined);
                        }

                    }, function (err) {
                    })


                });

            }
        })
    },
    // openid网络请求
    post_service(url, data, Type, success, fail) {
        console.log('_网络请求_DATA', url, data)
        wx.request({
            url: this.data.service + url,
            data: data,
            header: {
                "content-type": "application/json"
            },
            method: Type,
            success: res => {
                console.log('_网络请求_RES', url, res);
                success(res)
            },
            fail: err => {
                console.log('_网络请求_ERR', url, err)
                fail(err)
            },
        })
    },
    
    //网络请求   登陆态
    post_service(url, data, Type, success, fail) {
        console.log('_网络请求_DATA', url, data)
        const self = this;
        wx.request({
            url: this.data.service + url,
            data: data,
            header: {
                "content-type": "application/json"
            },
            method: Type,
            success: res => {
                console.log('_网络请求_RES', url, res);
                // 每个接口的请求都需要判断登陆态，所以公共处理登陆态异常情况

                if (res.data.status == 300 || res.data.status == 400) {
                    // 登陆态异常

                    wx.removeStorageSync("rdSession");
                    // 进行登陆
                    self.login((err, rdSession) => {
                        if (err) {
                            wx.showToast({
                                title: '请求失败！',
                                icon: 'none',
                                duration: 1000
                            })
                        }
                        else {
                            // 登陆成功后，再次请求那个接口。注意此处可能会出现死循环的问题。也就是不停报300,400
                            let data1 = Object.assign({}, data, { rdSession });
                            self.post_service(url, data1, Type, success, fail);
                        }

                    });
                }
                else {
                    success(res)
                }

            },
            fail: err => {
                console.log('_网络请求_ERR', url, err)
                fail(err)
            },
        })
    },

    //网络请求 登陆态 使用事件解决雪崩问题的改进版本。即第一次许多请求都需要登陆态，但没有登陆态或者失效了。
    //则会请求许多次login来请求登陆态。使用事件就是解决这个问题。不过，好像没有事件。所以...自己写了一个垃圾的
    post_service(url, data, Type, success, fail) {
        
        const self = this;
        wx.request({
            url: this.data.service + url,
            data: data,
            header: {
                "content-type": "application/json"
            },
            method: Type,
            success: res => {
                console.log('_网络请求_RES', url, res);
                // 每个接口的请求都需要判断登陆态，所以公共处理登陆态异常情况
                if (res.data.status == 300 || res.data.status == 400) {
                    // 登陆态异常
                    requestEvent.once("getRdSession",(e,rdSession) => {
                        let data1 = Object.assign({}, data, { rdSession });
                        self.post_service(url, data1, Type, success, fail);
                    });
                    if(!isRequestRdSession) {
                        isRequestRdSession = true;
                        wx.removeStorageSync("rdSession");
                        self.login((err, rdSession) => {
                            isRequestRdSession = false;
                            if (err) {
                                wx.showToast({
                                    title: '请求失败！',
                                    icon: 'none',
                                    duration: 1000
                                })
                                requestEvent.reomveEvent(["getRdSession"]);
                            }
                            else {
                                wx.setStorageSync("rdSession",rdSession);
                                requestEvent.emit("getRdSession",rdSession);
                            }

                        }, false);
                    }
                    
                }
                else {
                    success(res)
                }

            },
            fail: err => {
                console.log('_网络请求_ERR', url, err)
                fail(err)
            },
        })
    },


    // 页面跳转:不过，应该推荐使用 navigator 代替
    // <view bindtap="pageJump" data-type="navigateTo" data-url="/pages/luckyDrawResult/luckyDrawResult?prize_id={{prizeInfo.id}}" data-delta = '1'>测试</view>
    pageJump(e) {
        let url = e.currentTarget.dataset.url;
        let type = e.currentTarget.dataset.type;


        if (type == "navigateTo") {
            wx.navigateTo({
                url
            })
        }
        else if (type == "redirectTo") {
            wx.redirectTo({
                url
            })
        }
        else if (type == "reLaunch") {
            wx.reLaunch({
                url
            })
        }
        else if (type == "switchTab") {
            wx.switchTab({
                url
            })
        }
        else if (type == "navigateBack") {
            let delta = e.currentTarget.dataset.delta;
            wx.navigateBack({
                delta
            })
        }
    }
})