
/**
 * @file 分享海报模块
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有 2018/9/5
 * @version 1.0
 */
// 微信小程序rpx转换工具
import rpxUtils from '../utils/utils/rpxUtils';

/**
 * 仿造Painter绘图插件编写的绘图插件。尽量不要太过小程序。期望功能：
 * 1.文本，图片，矩形，圆角，json格式，自定义绘制渲染函数：用户自定义绘制。
 * 2.除了可以指定绘制内容，还可以指定布局，比如top，left等，以及旋转
 * 3.很在意他的'对结果图片进行检测机制，如果绘图出错会进行重绘。'功能。
*/

class SharePoster {
    /**
     * @param {object} config = {} 初始化参数
     *
    */
    constructor(config = {}) {
        this.__initCanvas(config);
    }

    __initCanvas(config) {

    }

    /**
     * 用户调用绘制方法进行图片的绘制
     * @param {object} palette = {} 绘制信息
    */
    draw(palette = {}) {

    }
}

export default SharePoster;
