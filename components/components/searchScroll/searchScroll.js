// components/searchScroll/searchScroll.js
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
        isSearchData:false,
        searchComponent:{
            hideMask:false,
            searchInputFocus:true
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hideMask() {  
            this.setData({ 
                "searchComponent.hideMask": true,
                "searchComponent.searchInputFocus": true,
            });
            
        },
        showMask() {  
            this.setData({ "searchComponent.hideMask": false });
            this.setData({
                isSearchData: false,
            }, () => {
                
            })

        },
        // input 失去焦点时的事件绑定 input的双向绑定。
        modelInput(event) {
            let value = event.detail.value;
            let model_name = event.currentTarget.dataset.wxModel;
            this.setData({
                [model_name]: value 
            });
        },
    }
})