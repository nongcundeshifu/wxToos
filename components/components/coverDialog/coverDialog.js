// components/coverDialog/coverDialog.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        confirmOpenType:{
            type:String,
            value:""
        },
        title:{
            type:String,
            value:"提示"
        },
        text: {
            type: String,
            value: "这是内容"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hideDialog:true
    },

    /**
     * 组件的方法列表
     */
    methods: {
        preventTap() {
            return false;
        },
        switchDialog() {
            this.setData({
                hideDialog: !this.data.hideDialog
            })
        },
        confirmCallback() {
            this.switchDialog();
            this.triggerEvent("confirm")
        },
        cancelCallback() {
            this.switchDialog();
            this.triggerEvent("cancel")
        }
    }
})
