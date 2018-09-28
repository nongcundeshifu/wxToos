//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad(){
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
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.address']) {
                    // 已经授权时，不用弹openSetting，而且，表明已经授权字段。
                    self.setData({
                        openSetting: false,
                        isAddressScope: true
                    })
                }
                else {
                    // 未授权，如果还未运行本此方法，则设置openSetting，表明未授权。这里判断才执行是因为
                    // 如果未运行，
                    if (!runGetAddress) {
                        self.setData({
                            openSetting: false,
                            isAddressScope: false
                        })
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
            fail() {
                self.setData({
                    openSetting: true
                })
                // 那么如果用户点击了取消了，那么也会提示再试一次。
                wx.showToast({
                    title: '请再试一次',
                    icon: "none",
                    duration: 1000,
                })
            }
        })

    },
})