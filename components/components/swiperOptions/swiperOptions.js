// components/swiperOptions/swiperOptions.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTab:0,
        page:1,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickTab: function(e) {

            this.setData({
                currentTab: e.currentTarget.dataset.current
            })
        },
        changItem: function(e) {
            
            // 防止点击切换太快导致一致在切换。
            if (e.detail.source == 'touch') {
                this.setData({
                    currentTab: e.detail.current,
                });
            }
            
            // 其他操作

        },
        // 滚动条下拉刷新
        scrollTolower() {

        },
        // 重新刷新为第一页
        // 初始化加载订单数据
        oderData: function(data_type, page) {

            let data = {
                page: page || this.data.page,
                activity_type
            }
            var that = this;
            app.post_service("Product/get_orders", data, "GET", function(res) {
                var orderList = that.data.orderList;
                if (res.data.status == 200) {
                    that.setData({
                        
                        page: page ? page + 1 : that.data.page + 1
                    })
                }



            })
        },
    }
})