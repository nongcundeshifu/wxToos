/**
 * @file rpx和px互相转换工具
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有 2018
 * @version 1.0
 */

/**
 * @desc 微信rpx转px和px转rpx函数。
 * @desc 如果要在js也如css样式一样适配的话，那么除了使用获取节点信息之外，那么就需要使用像素转换了
 * @desc 750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。
*/
const system = wx.getSystemInfoSync();
const rpxToPxRatio = system.screenWidth / 750;
const pxToRpxRatio = 750 / system.screenWidth;

/**
 * 将一个rpx值 转为 px值。
 * @param <number> rpxValue 要转换的rpx值
*/
const rpxToPx = (rpxValue) => {
    const result = parseFloat(rpxValue) || 0;
    return result * rpxToPxRatio;
}

/**
 * 将一个px值 转为 rpx值
 * @param <number> pxValue 要转换的px值
 */
const pxToRpx = pxValue => {
    const result = parseFloat(pxValue) || 0;
    return result * pxToRpxRatio;
}

const rpxUtils = {
    rpxToPx,
    pxToRpx,
}

export default rpxUtils;
