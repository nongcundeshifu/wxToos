import global from '../../global.js';
//index.js
// 所有需要使用到async和await的都需要这个文件。而且，可能所有页面都需要用到tools文件和app对象。
const regeneratorRuntime = require('../../utils/regenerator-runtime/runtime-module.js')
console.log(global);


Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        // 测试px和rpx单位转换
        console.log(global.tools.rpxUtils.pxToRpx(100));
        console.log(global.tools.rpxUtils.rpxToPx(100));

        async function test() {
            console.log(await new Promise(resolve => {
                setTimeout(() => {
                    resolve('数据')
                },2000)
            }));
        }
        
        test()

    },
    // input 双向绑定  page.js中
    modelInput(event) {
        // 实时更新
        let value = event.detail.value;
        let model_name = event.currentTarget.dataset.wxModel;
        this.setData({ [model_name]: value });
    },
    getData() {
        // wx.downloadFile({
        //     url: 'http://game.flyh5.cn/resources/game/wm_game/2018/2018_Xcx/json/content.json', //仅为示例，并非真实的资源
        //     success: function (res) {
        //         if (res.statusCode === 200) {
        //             this.js = require(res.tempFilePath);
        //         }
        //     }
        // })
        wx.request({
            url: 'http://game.flyh5.cn/resources/game/wm_game/2018/2018_Xcx/json/content.json',
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                console.log(res.data)
            }
        })

    }

    
})
