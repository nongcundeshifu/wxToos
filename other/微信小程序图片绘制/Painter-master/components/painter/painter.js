// 画笔绘制模块
import Pen from './lib/pen';
// 下载图片模块
import Downloader from './lib/downloader';
// 工具模块
const util = require('./lib/util');
// qrcode为二维码模块

const downloader = new Downloader();


// 最大尝试的绘制次数
const MAX_PAINT_COUNT = 5;
Component({
    canvasWidthInPx: 0,
    canvasHeightInPx: 0,
    // 绘制数
    paintCount: 0,
    /**
     * 组件的属性列表
     */
    properties: {
        customStyle: {
            type: String,
        },
        palette: {
            type: Object,
            observer: function(newVal, oldVal) {
				// 如果需要重绘，则会重新开始绘制
                if (this.isNeedRefresh(newVal, oldVal)) {
                    this.paintCount = 0;
                    this.startPaint();
                }
            },
        },
        // 启用脏检查，默认 false
        dirty: {
            type: Boolean,
            value: false,
        },
    },

    data: {
        picURL: '',
        showCanvas: true,
        painterStyle: '',
    },

    attached() {
        setStringPrototype();
    },

    methods: {
        /**
         * 判断一个 object 是否为 空
         * @param {object} object
         */
        isEmpty(object) {
            for (const i in object) {
                return false;
            }
            return true;
        },

		// 是否需要重绘
        isNeedRefresh(newVal, oldVal) {
            if (!newVal || this.isEmpty(newVal) || (this.data.dirty && util.equal(newVal, oldVal))) {
                return false;
            }
            return true;
        },
		// 开始绘制
        startPaint() {
            if (this.isEmpty(this.properties.palette)) {
                return;
            }

			// 获取系统信息。
            if (!(getApp().systemInfo && getApp().systemInfo.screenWidth)) {
                try {
                    getApp().systemInfo = wx.getSystemInfoSync();
                } catch (e) {
                    const error = `Painter get system info failed, ${JSON.stringify(e)}`;
                    that.triggerEvent('imgErr', {
                        error: error
                    });
                    console.error(error);
                    return;
                }
            }
			// 根据屏幕尺寸，获取rpx和px的比值。
            screenK = getApp().systemInfo.screenWidth / 750;

			// 获取所有图片信息。
            this.downloadImages().then((palette) => {
                const {
                    width,
                    height
                } = palette;
				// 获取px单位的canvas宽高
                this.canvasWidthInPx = width.toPx();
                this.canvasHeightInPx = height.toPx();
                if (!width || !height) {
                    console.error(`You should set width and height correctly for painter, width: ${width}, height: ${height}`);
                    return;
                }
                this.setData({
                    painterStyle: `width:${width};height:${height};`,
                });
                const ctx = wx.createCanvasContext('k-canvas', this);
				// 获取画笔，根据调色板进行图片绘制。
                const pen = new Pen(ctx, palette);
				// 调用绘制函数，并设置绘制成功后的回调函数。
                pen.paint(() => {
                    this.saveImgToLocal();
                });
            });
        },

		// 图片文件下载函数，返回promise。主要是利用downloader模块，把img类型的图片和背景下载下拉，并替换路径。
        downloadImages() {
            return new Promise((resolve, reject) => {
                let preCount = 0;
                let completeCount = 0;
				// 这是对象完全复制的一个手段。
                const paletteCopy = JSON.parse(JSON.stringify(this.properties.palette));

                if (paletteCopy.background) {
                    preCount++;
                    downloader.download(paletteCopy.background).then((path) => {
                        paletteCopy.background = path;
                        completeCount++;
                        if (preCount === completeCount) {
                            resolve(paletteCopy);
                        }
                    }, () => {
                        completeCount++;
                        if (preCount === completeCount) {
                            resolve(paletteCopy);
                        }
                    });
                }
                if (paletteCopy.views) {
                    for (const view of paletteCopy.views) {
                        if (view && view.type === 'image' && view.url) {
                            preCount++;
                            /* eslint-disable no-loop-func */
                            downloader.download(view.url).then((path) => {
                                view.url = path;
                                wx.getImageInfo({
                                    src: view.url,
                                    success: (res) => {
                                        // 获得一下图片信息，供后续裁减使用
                                        view.sWidth = res.width;
                                        view.sHeight = res.height;
                                    },
                                    fail: (error) => {
                                        console.error(`getImageInfo failed, ${JSON.stringify(error)}`);
                                    },
                                    complete: () => {
                                        completeCount++;
                                        if (preCount === completeCount) {
                                            resolve(paletteCopy);
                                        }
                                    },
                                });
                            }, () => {
                                completeCount++;
                                if (preCount === completeCount) {
                                    resolve(paletteCopy);
                                }
                            });
                        }
                    }
                }
                if (preCount === 0) {
                    resolve(paletteCopy);
                }
            });
        },
		// 保存绘制好的图片。
        saveImgToLocal() {
            const that = this;
			// 设置300毫秒延迟，防止小程序的一个坑。
            setTimeout(() => {
                wx.canvasToTempFilePath({
                    canvasId: 'k-canvas',
                    success: function(res) {
                        that.getImageInfo(res.tempFilePath);
                    },
                    fail: function(error) {
                        console.error(`canvasToTempFilePath failed, ${JSON.stringify(error)}`);
                        that.triggerEvent('imgErr', {
                            error: error
                        });
                    },
                }, this);
            }, 300);
        },

		// 获取图片信息。并且进行图片尺寸验证。否则重绘。
        getImageInfo(filePath) {
            const that = this;
            wx.getImageInfo({
                src: filePath,
                success: (infoRes) => {
                    if (that.paintCount > MAX_PAINT_COUNT) {
                        const error = `The result is always fault, even we tried ${MAX_PAINT_COUNT} times`;
                        console.error(error);
                        that.triggerEvent('imgErr', {
                            error: error
                        });
                        return;
                    }
                    // 比例相符时才证明绘制成功，否则进行强制重绘制
                    if (Math.abs((infoRes.width * that.canvasHeightInPx - that.canvasWidthInPx * infoRes.height) / (infoRes.height * that.canvasHeightInPx)) < 0.01) {
                        that.triggerEvent('imgOK', {
                            path: filePath
                        });
                    } else {
                        that.startPaint();
                    }
                    that.paintCount++;
                },
                fail: (error) => {
                    console.error(`getImageInfo failed, ${JSON.stringify(error)}`);
                    that.triggerEvent('imgErr', {
                        error: error
                    });
                },
            });
        },
    },
});

let screenK = 0.5;


// 设置rpx转换为px的函数
function setStringPrototype() {
    /* eslint-disable no-extend-native */
    /**
     * 是否支持负数
     * @param {Boolean} minus 是否支持负数
     */
    String.prototype.toPx = function toPx(minus) {
        let reg;
        if (minus) {
            reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
        } else {
            reg = /^[0-9]+([.]{1}[0-9]+){0,1}(rpx|px)$/g;
        }
        const results = reg.exec(this);
        if (!this || !results) {
            console.error(`The size: ${this} is illegal`);
            return 0;
        }
        const unit = results[2];
        const value = parseFloat(this);

        let res = 0;
        if (unit === 'rpx') {
            res = Math.round(value * screenK);
        } else if (unit === 'px') {
            res = value;
        }
        return res;
    };
}