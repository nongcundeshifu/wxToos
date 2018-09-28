//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad() {
        
    },
    onShow() {
        this.getAddress();
    },

    // 这个并没有使用 缓存之类的，所以可能会出现点击两次才可以弹出设置权限页面。
    getAddress() {
        const self = this;
        let runGetAddress = self.data.runGetAddress;
        // 是否运行过了本次函数。
        if (!runGetAddress) {
            self.setData({
                runGetAddress: true
            })
        }
        // 判断是否授权


        // authAddress缓存标识是否请求了一次地址授权了。
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.address']) {
                    // 已经授权时，不用弹openSetting，而且，表明已经授权字段。
                    self.setData({
                        openSetting: false,
                        isAddressScope: true
                    })
                    wx.removeStorageSync("authAddress")  //已经授权，那么最好直接删除这个
                }
                else {
                    // 未授权，如果还未运行本此方法，则设置openSetting，表明未授权。这里判断才执行是因为
                    // 如果未运行，
                    if (!runGetAddress) {
                        if (wx.getStorageSync("authAddress")) {
                            self.setData({
                                openSetting: true,
                                isAddressScope: false
                            })
                        }
                        else {
                            self.setData({
                                openSetting: false,
                                isAddressScope: false
                            })
                        }

                    }




                }


            }
        })




    },
    chooseAddress() {
        wx.chooseAddress({
            success: function (res) {
                console.log("成功")
            },

        })
    },
    authorizeAddress() {
        const self = this;
        wx.authorize({
            scope: 'scope.address',
            success() {
                self.chooseAddress();
            },
            fail(err) {
                console.log(err)
                self.setData({
                    openSetting: true
                })
                wx.setStorageSync("authAddress", true)

            }

        })

    },
})