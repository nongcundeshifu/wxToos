//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // tabBar对象
        "tabBar": {
            "color": "#AAAAAA",
            "selectedColor": "#FD5454",
            "backgroundColor": "#fff",
            "borderStyle": "#fff",
            "selectIndex": 0,
            "list": [
                {
                    "disExistPage": false,  //默认false，即存在page
                    "text": "首页",
                    "iconPath": "/static/img/index.png",
                    "selectedIconPath": "/static/img/index-active.png",
                    "bindtap": "bindtap",
                    "navigationBarTitleText": "抽奖小程序",
                    "changeEvent": "indexChange"
                },
                {
                    "text": "",
                    "iconPath": "/static/img/add-active.png",
                    "selectedIconPath": "/static/img/add.png",
                    "type": "singleIcon",
                    "navigationBarTitleText": "第二个单个icon的页面",
                },
                {
                    "disExistPage": true,
                    "text": "",
                    "navigationBarTitleText": "测试单例图标页面",
                    "iconPath": "/static/img/add.png",
                    "selectedIconPath": "/static/img/add.png",
                    "type": "singleIcon"
                },
                {
                    "text": "我的",
                    "iconPath": "/static/img/my.png",
                    "selectedIconPath": "/static/img/my-active.png",
                    "bindtap": "bindtap",
                    "navigationBarTitleText": "我的"
                }
            ]
        },
        
    },

    // 因为组件是唯一性，而且，不会改变，所以直接放在this对象上即可。
    onLoad: function () {
        this.loading = this.selectComponent("#loading");
        this.dialog = this.selectComponent("#dialog");
        setTimeout(() => {
            this.loading.loadEnd();
        },1000)
    },
    confirmCallback(e) {
        console.log("点击了确定",e)
    },
    cancelCallback(e) {
        console.log("点击了取消",e)
    },
    showDialog() {
        this.dialog.switchDialog()
    },


    // tabbar
    tabbarFn1(e) {
        console.log("这是page1")
    },
    tabbarFn4(e) {
        console.log("这是page2")
    },
    singleIconBar() {
        console.log("我是可以切换page的单个icon")
    },
    singleIconBarHasPage() {
        console.log("我是单个icon")
    }

})
