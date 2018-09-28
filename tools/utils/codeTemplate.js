
/**
 * @file 这里是一些小程序的代码模板，不可引用
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有 2018/8/31
 * @version 1.0
 */

/**
 * @desc input 双向绑定  app.js中或者直接放在工具函数中。textarea有问题
 * @param {event} event 事件对象
 */
const modelInputApp = (event) => {
    // 实时更新
    let value = event.detail.value;
    // data-wx-modex='value'
    let model_name = event.currentTarget.dataset.wxModel;
    this.setData({ [model_name]: value });
}

// 微信支付封装(不可直接引用，只是代码模板)
// 支付下单生成订单号
const placeOrder = () => {
    var self = this;

    let data = {
        submit: app.getSubmitKey(),
        openid: wx.getStorageSync("openId"),
        order_price: this.data.count,
    }
    app.post_service("Product/go_shoping", data, "GET", (res) => {
        if (res.data.status == 200) {



        }
        else {
            wx.showToast({
                title: res.data.message,
                icon: 'none',
                duration: 2000
            })
        }
    })
}




// 微信支付(不可直接引用，只是代码模板)
const wxPay = (data) => {
    var self = this;
    wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
        success: function (res) {
            if (res.errMsg == "requestPayment:ok") {
                wx.showToast({
                    title: '支付成功',
                    icon: "none",
                    duration: 2000,
                    mask: true
                })
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })
                }, 2000)
            } else {
                // 支付失败
                wx.showToast({
                    title: '支付失败',
                    icon: "none",
                    duration: 1000
                })
            }

        },
        fail: function (res) {
            wx.showToast({
                title: '支付失败',
                icon: "none",
                duration: 1000
            })

        }
    })
}



// 秒杀倒计时



// 每次定时器都会执行的，更新事件的函数。（这是个函数代码模板）
// 为了计算出倒计时剩余的秒数
//
//
//
//type：状态：1 未开始 2 秒杀已经开始中 3 秒杀结束
const countdown = function () {
    let product = this.data.product;  //所有需要倒计时的商品列表对象
    let len = product.length;
    for (let i = 0; i < len; i++) {
        if (product[i].type == 3) {   //倒计时已经结束
            continue;
        }
        let total_micro_second = product[i].over_time;  //获取剩余时间的秒数

        // 渲染倒计时时钟
        if (total_micro_second - 1000 <= 0) {
            // 已经倒计时结束了,或者直接刷新最简单
            if (product[i].type == 1) {
                // 从未开始转换为已开始状态。
                product[i].type = 2;
                product[i].over_time = product[i].endtime - product[i].starttime;

                product[i].Howtime = null;
                total_micro_second = product[i].endtime - product[i].starttime;  //计算开始秒杀剩余时间
                product[i].Howtime = this.dateformat(total_micro_second);
            } else if (product[i].type == 2) {
                // 从已开始转化为已结束
                product[i].type = 3;
                product[i].Howtime = null;
                product[i].over_time = 0;
            }

        } else {
            // 更新时间
            product[i].over_time = total_micro_second - 1000;
            product[i].Howtime = this.dateformat(total_micro_second - 1000);
        }
    }
    this.setData({
        product
    });
}
