// components/loading/loading.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:{
            type:String,
            value:"标题"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hideLoad:false
    },
    // 生命周期函数
    attached() {
        this.loadStart();
        console.log(this.properties.title)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        loadEnd() {
            console.log("取消")
            this.setData({
                hideLoad: true
            })
            wx.hideLoading()
        
        },
        loadStart() {
            
            setTimeout(() => {
                wx.showLoading({
                    title: '加载中...',
                })
            }, 300)
        },
    }
})
