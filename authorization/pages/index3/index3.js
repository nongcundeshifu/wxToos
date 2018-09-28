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
    // 使用了缓存，那么，根据缓存来判断是否已经请求过授权了，那么直接下次就根据这个直接打开授权设置页面。
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


        // authAddress缓存标识是否请求了一次地址授权了。使用其他来表明其他的授权请求。
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.address']) {
                    // 已经授权时，不用弹openSetting，而且，表明已经授权字段。
                    self.setData({
                        openSetting: false,
                        isAddressScope: true
                    })
                    wx.removeStorageSync("authAddress")  //已经授权，那么最好直接删除这个
                    // 防止他取消授权，而这个缓存又存在的情况，那么直接跳授权设置页面，而有没有那个授权
                    // 请求，导致设置里面没有这个授权请求，就无法设置授权了。
                }
                else {
                    // 未授权，如果还未运行本此方法，则设置openSetting，表明未授权。这里判断才执行是因为
                    // 如果未运行，
                    if (!runGetAddress) {
                        if(wx.getStorageSync("authAddress")) {
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