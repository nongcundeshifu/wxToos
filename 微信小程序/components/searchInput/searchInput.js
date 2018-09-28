// components/searchInput/searchInput.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        openHistory: {
            type: Boolean,
            value: false,
        },
        keywords: {
            type: String,
            value: '',
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        hideHistory: true,
        hideCloseBtn: true,
        hideClearIcon: true,
        historyTop: 0,
        historyHeight: 0,
        keywords: '',
        inputFocus: false,
    },
    attached() {

        this.setData({
            keywords: this.properties.keywords,
        });



    },
    ready() {
        // 获取节点需要在节点渲染完成后才可以。
        this.initHistoryView();

    },
    /**
     * 组件的方法列表
     */
    methods: {
        initHistoryView() {
            // 使用in，以便与在组件中查找节点
            const searchNode = wx.createSelectorQuery().in(this);
            searchNode.select('.searchInput').boundingClientRect((rect) => {
                const systemInfo = wx.getSystemInfoSync();
                const { windowHeight } = systemInfo;
                this.setData({
                    historyTop: rect.height + rect.top,
                    historyHeight: windowHeight - rect.height - rect.top,
                });
            }).exec();




        },
        onFocus() {
            this.setData({
                hideHistory: false,
                hideCloseBtn: false,
                hideClearIcon: false,
                inputFocus: true,
            });
        },
        onBlur() {
            this.setData({
                hideClearIcon: true,
                inputFocus: false,
            });
        },
        /**
         * @desc input 双向绑定  app.js中或者直接放在工具函数中。textarea有问题
         * @param {event} event 事件对象
         */
        modelInputApp(event) {
            // 实时更新
            const { value } = event.detail;
            // data-wx-modex='value'
            const modelName = event.currentTarget.dataset.wxModel;
            this.setData({ [modelName]: value });
        },
        onClearText() {
            this.setData({
                keywords: '',
                inputFocus: true,
            });
        },
        onClose() {
            this.setData({
                hideHistory: true,
                hideCloseBtn: true,
                hideClearIcon: true,
            });
        },
        onSearch() {
            // wx.showModal({
            //     title: '搜索中',
            //     icon: 'none',
            // });
            this.onClose();
            // 触发搜索事件
            this.triggerEvent('search', { keywords: this.data.keywords });
        },
        onHistorySearch(event) {
            const { keywords } = event.currentTarget.dataset;
            this.setData({
                keywords,
            });
            this.onClose();
            // 用户可以绑定一些非异步事件。最好是非异步的。
            this.triggerEvent('historySearch', { keywords });
            this.triggerEvent('search', { keywords });
        },
    },

});
