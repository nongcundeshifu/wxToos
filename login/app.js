//app.js
App({
    data:{

    },
    onLaunch: function () {
        
        // 是否应该在app中执行一次和判断一次是否登陆。
        // 是：需要解决第一次时，app中和其他页面都需要userinfo的情况。此时，可能重复跳转。
            // 使用字段来记录并只跳转一次。
        // 否：需要在index和可能的分享页面中手动调用userinfo(可能的页面入口)，强制授权。并且，所有需要userinfo的情况下，需要嵌套在userinfo的回调中。
        // 选择第二种。
        
    },

    // 在可能的app入口手动调用userinfo，以确保授权。
    getUserInfo: function (cb, opt) {
        console.log("登录用户信息");
        let self = this;
        //   0 表示为不需要使用switchTab，1 为使用
        let options = Object.assign({
            isSwitch:0
        }, opt);
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            cb && cb(res.userInfo);
                        },
                        fail: err => {
                            console.log("授权失败");
                        }
                    })
                } else {
                    // 此处只有在打开分享页面时，才会未授权用户信息。因为如果直接进入app那么未授权时，一定是跳转到授权页面的。
                    
                    // // 此处的问题： 直接跳转到授权页面，那如果时分享时进入的页面，需要获取用户信息，那么应该授权后再调回那个分享页面，而不是首页才对。
                   
                    //    self.data.isRedirectLogin 是否已经跳转过一次login页面。options.isRedirectLogin ： 强制跳转login页面。
                    
                    if (options.route) {
                        // route具体看login页面格式。
                        wx.redirectTo({
                            url: '/pages/login/login?route=' + options.route + "&isSwitch=" + options.isSwitch,
                        })
                    } else {
                        wx.redirectTo({
                            url: "/pages/login/login?isSwitch=" + options.isSwitch,
                        })
                    }



                };
            }
        })

    },

    // 需要在app中调用
    /*
    options : 
        isRedirectLogin:是否强制跳转login页面 默认：false
        route:登陆成功是的页面路由 默认：false
        isSwitchTab：是否是switchTab跳转。


    
    */
    getUserInfo2: function (cb, opt) {
        console.log("登录用户信息");
        let self = this;
        let options = Object.assign({
            route:false,
            isRedirectLogin:false,
            isSwitchTab:false
        }, opt);
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            cb && cb(res.userInfo);
                        },
                        fail: err => {
                            console.log("授权失败");
                        
                        }
                    })
                } else {
                    // 此处只有在打开分享页面时，才会未授权用户信息。因为如果直接进入app那么未授权时，一定是跳转到授权页面的。

                    // // 此处的问题： 直接跳转到授权页面，那如果时分享时进入的页面，需要获取用户信息，那么应该授权后再调回那个分享页面，而不是首页才对。

                    //    self.data.isRedirectLogin 表示是否已经跳转过一次login页面，一次app默认只会跳转一次。options.isRedirectLogin ： 强制跳转login页面。
                    if (self.data.isRedirectLogin && !options.isRedirectLogin) {
                        return;
                    }
                    self.data.isRedirectLogin = true;
                    if (options.route) {
                        // route具体看login页面格式。
                        wx.redirectTo({
                            url: '/pages/login/login?route=' + options.route,
                        })
                    }
                    else {
                        wx.redirectTo({
                            url: '/pages/login/login',
                        })
                    }



                };
            }
        })

    },
})