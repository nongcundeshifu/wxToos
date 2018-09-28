// components/spinner/spinner.js
Component({
    // 外部样式类
    externalClasses: ['my-class'],
    /**
     * 组件的属性列表
     */
    // 属性是动态的，他可以在页面中进行修改。导致传入的属性也变化。
    properties: {
        defaultValue:{
            type:Number,
            value:0,
        },
        // 加减的间隔
        step:{
            type:Number,
            value:1,
        },
        max:{
            type:Number,
            value:Number.POSITIVE_INFINITY,
        },
        min:{
            type:Number,
            value:Number.NEGATIVE_INFINITY,
        },
        disabledInput:{
            type:Boolean,
            value:true
        }
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        spinnerValue:0,
    },
    // 组件初始化周期函数
    attached() {
        this.setData({
            spinnerValue:this.properties.defaultValue
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 增加，减少数量
        changeNum(e) {
            let dataset = e.currentTarget.dataset;
            let type = dataset.type;
            let num = this.data.spinnerValue;  //目前的数量
            let nowNum = num;
            let model = "spinnerValue";
            let max = this.properties.max;
            let min = this.properties.min;
            let step = this.properties.step;

            let isBeyond = false;

            if (type == "add") {
                if (num <= max) {
                    nowNum = num+step;
                    if(nowNum > max) {
                        nowNum = num - step;
                        isBeyond = true;
                    }
                    else {
                        this.setData({
                            [model]: num+step
                        })
                    }
                    
                    
                }


            } else {
                if (num >= min) {
                    nowNum = num-step;
                    if(nowNum < min) {
                        nowNum = num + step;
                        isBeyond = true;
                    }
                    else {
                        this.setData({
                            [model]: num-step
                        })
                    }
                }
                

            }
            if(!isBeyond) {
                // 如果是超出边界的设置，那么不会触发事件
                // 触发数量改变事件
                var myEventDetail = {
                    type,
                    oldValue:num,
                    value:nowNum,
                    isAchieveLimit:type == "add" ? (nowNum == max) : (nowNum == min)
                } // detail对象，提供给事件监听函数
                var myEventOption = {} // 触发事件的选项
                this.triggerEvent('change', myEventDetail, myEventOption)
            }

            
        },
        // input 失去焦点时的事件绑定 input的双向绑定。
        modelInput(event) {
            let value = event.detail.value - 0;
            let oldValue = this.data.spinnerValue;
            let nowNum = value;
            let model = "spinnerValue";
            let max = this.properties.max;
            let min = this.properties.min;
            let isBeyond = false;
            let isAchieveLimit = false;
            let type;

            //如果没有变，则不进行任何操作。
            if(oldValue == nowNum) {
                return;
            }

            if(value > max || value == max) {
                nowNum = max;
                isAchieveLimit = true;
            }
            else if(value < min || value == min){
                nowNum = min;
                isAchieveLimit = true;
            }
            
            this.setData({
                [model]: nowNum
            })
            
            
            // 触发数量改变事件
            var myEventDetail = {
                type:oldValue > nowNum ? 'reduce' : 'add',
                oldValue,
                value:nowNum,
                isAchieveLimit
            } // detail对象，提供给事件监听函数
            var myEventOption = {} // 触发事件的选项
            this.triggerEvent('change', myEventDetail, myEventOption)

            
        },
        getNumValue() {
            return this.data.spinnerValue;
        }

    }
})