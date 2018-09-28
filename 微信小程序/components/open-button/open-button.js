// components/open-button/open-button.js

import loginTools from '../../lib/utils/utils/loginTools/loginTools';
import regeneratorRuntime from '../../lib/utils/regenerator-runtime/runtime-module';
import login from '../../lib/login/login';

const app = getApp();
// 是否正在请求点赞
let isRequest = false;

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        openData: {
            type: Object,
            value: {},
        },
        shareId: {
            type: String,
            value: '12',
        },
        shareType: {
            type: String,
        },
        type: {
            type: String,
            value: 'share',
        },
        iconStaus: {
            type: Number,
            value: 0,
            observer() {
                this.formatIcon();
            },
        },

        text: {
            type: String,
            value: '',
            observer() {
                this.updateIconText();
            },
        },
        cssStyle: {
            type: String,
            value: '',
            observer() {
                this.updateCssStyle();
            },
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        // 收藏的图标数据
        collectIconText: [
            {
                class: 'icon-text',
                icon: 'icon-dianzan',
                text: '',
            },
        ],
        // 分享的图标数据
        shareIconText: [
            {
                class: 'icon-text',
                icon: 'icon-fenxiang',
                text: '',
            },
        ],
        urlType: {
            video: 'video',
            picture: 'img',
            article: 'news',
            h5: 'h5',
        },

    },
    attached() {


    },

    /**
     * 组件的方法列表
     */
    methods: {
        async onCollectTap() {

            if (isRequest) {
                return false;
            }


            isRequest = true;

            if (!(await login.loginProxy())) {
                isRequest = false;
                return false;
            }

            const openid = app.getOpenid();



            if (!openid) {
                app.failureToast('用户未授权！');
                isRequest = false;
                return false;
            }


            if (Number(this.properties.iconStaus) !== 0) {
                // 取消点赞

                const data = {
                    cid: this.properties.shareId,
                    id: Number(this.properties.iconStaus),
                    type: this.data.urlType[this.properties.shareType],
                };
                let resutl;

                try {

                    resutl = await app.service.get_request('index/not_save', data);

                }
                catch (error) {
                    app.failureToast('取消点赞失败！');
                    isRequest = false;
                    return false;
                }

                if (resutl.data.code === 0) {
                    app.failureToast('取消点赞失败！');
                    isRequest = false;
                    return false;
                }



                app.successToast('取消点赞成功！');

                // 触发取消点赞成功事件
                this.triggerEvent('collectSuccess', {});

                isRequest = false;
                return true;
            }



            const data = {
                id: this.properties.shareId,
                type: this.data.urlType[this.properties.shareType],
                openid,
            };
            let resutl;

            try {

                resutl = await app.service.get_request('index/save', data);

            }
            catch (error) {
                app.failureToast('点赞失败！');
                isRequest = false;
                return false;
            }

            if (resutl.data.code === 0) {
                app.failureToast('点赞失败！');
                isRequest = false;
                return false;
            }



            app.successToast('点赞成功！');
            console.log(resutl);
            // 触发点赞成功事件
            this.triggerEvent('collectSuccess', {});
            isRequest = false;
            return true;

        },
        async onSahreTap() {

            if (!(await login.loginProxy())) {
                return false;
            }

            const data = Object.assign({}, {
                id: this.properties.shareId,
                type: this.properties.shareType,
            }, this.properties.openData);
            const url = loginTools.getUrlWithArgs('/pages/share/share', data);

            wx.navigateTo({
                url,
            });
            return true;
        },
        updateIconText() {
            const { type } = this.properties;
            if (type === 'share') {
                this.setData({
                    ['shareIconText[0].text']: this.properties.text,
                });
            }
            else if (type === 'collection') {
                this.setData({
                    ['collectIconText[0].text']: this.properties.text,
                });
            }
        },
        updateCssStyle() {
            this.setData({
                ['shareIconText[0].css']: this.properties.cssStyle,
                ['collectIconText[0].css']: this.properties.cssStyle,
            });
        },

        formatIcon() {

            if (Number(this.properties.iconStaus) === 0) {
                this.setData({
                    'collectIconText[0].css': '',
                });
            }
            else {
                this.setData({
                    'collectIconText[0].css': 'color: #fe8922;',
                });
            }


        },


    },
});
