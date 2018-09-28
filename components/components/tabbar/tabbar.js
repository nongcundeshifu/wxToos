// components/tabbar/tabbar.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        pr_tabBar:{
            type:Object,
            value:{},
            observer: function (newVal, oldVal, changedPath) {

            }  //可以是methods中的方法名
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached() {
        
        this.setData({
            tabBar: this.properties.pr_tabBar,
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        switchTab(e) {
            const symbol = ["A","B","C","D","E"];
            const index = e.currentTarget.dataset.index;  //0开始
            const changeEvent = e.currentTarget.dataset.changeEvent;
            if (this.data.tabBar.list[index].navigationBarTitleText) {
                wx.setNavigationBarTitle({
                    title: this.data.tabBar.list[index].navigationBarTitleText
                })
            }

            this.setData({
                ["tabBar.selectIndex"]: index
            })

            // 此处可以不需要使用自定义事件，可以直接使用页面栈，获取当前页面然后运行页面里面的方法，那么直接可以在tabbar中配置参数。
            this.triggerEvent("tabbar" + symbol[index]);
        },
        switchDisExistTab(e) {
            const symbol = ["A", "B", "C", "D", "E"];
            const index = e.currentTarget.dataset.index;  //0开始
            this.triggerEvent("tabbar" + symbol[index]);
        }
    }
})
