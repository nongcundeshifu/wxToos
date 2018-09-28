//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        
    },

    onLoad: function () {
        this.setData({
            tapFnName:'tapFn'
        })
    },
    tapFn() {
        console.log("我是绑定的点击事件")
    }

})
