// components/navigator/navigator.js
const app = getApp();  //可以获取到全局的app，那么可以获取到本页面的 page对象呢？？？
// console.log(app)

const system = wx.getSystemInfoSync();
//  如果system.screenHeight 和 system.windowHeight高不一致（自定义状态栏下），那么表明，这个系统无法设置状态栏。
let systemType = system.system.split(" ")[0];
let navHeight;
if(systemType == "iOS") {
    navHeight = 40;
    // navHeight = 44;  //44是工具版的高度
}
else {
    navHeight = 48;
}
console.log(systemType)




Component({
    /**
     * 组件的属性列表
     */
    properties: {
        // 自定义tap事件。
        customTap:{
            type: Boolean,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: false     // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        // 是否具有返回按钮
        isShowNavTap:{
            type:Boolean,
            value:true
        },
        navTapType:{
            type:String,
            value:"navigateBackTap"
        },
        enablePullDownRefresh:{
            type:Boolean,
            value:false
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 获取app.js中的初始化数据，全局定义。
        initData: app.globalData.navigatorInit,
        // 单位 px
        barHeight: system.statusBarHeight,
        navHeight:navHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindtap() {
            console.log(1)
            // return false和使用阻止事件冒泡都可以阻止橡皮筋
            // return false;
        },
        setInitData(options) {
            this.setData({
                initData:Object.assign(this.data.initData,options)
            })
        },
        navigateBackTap() {
            console.log(1)
            wx.navigateBack({
                delta:1
            })
        },
        switchTabTap() {
            console.log(2)
            wx.switchTab({
                url:"/pages/index/index"
            })
        },
        customTap() {
            console.log(3)
            this.triggerEvent("navTap");
        }
    },
    //   外部样式类
    externalClasses: ['my-class'],
    // 周期函数
    
    attached() {
        const pages = getCurrentPages() //获取加载的页面
        let currentPage = pages[pages.length-1] //获取当前页面的对象
        this.setData({
            initData: Object.assign({}, { navBgColor: "white", bgColor: "white", viceTitle: "", title: "小程序", icon_class: "icon-fanhui-copy", TitleColor: "#000", itemColor:"#000"},this.data.initData,currentPage.data.initData)
        })
    }
})
