/**
 * @file 微信小程序的登陆界面功能
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有 2018/8/31
 * @version 1.0
 */
import base64 from './base64';
import regUtils from "../regUtils";


const loginTools = {
    /**
     * 使用完整的微信url进行编码.建议使用base64进行编码，因为指不定可能route中会出现 - :  这些字符的。
     * @param {string} url 需要编码的完整微信url，比如：/pages/index/index?id=1&name=zhou
     * @return {string} base64编码后的字符串
     */
    enCodeWxUrl(url) {
        let result = url;
        return base64.encode(result);
    },

    /**
     * 将ecCodeWxUrl编码出来的url进行解码成微信的url
     * @param {string} url 需要解码的base64的url
     * @return {string} 解码成完整的微信url
     */
    deCodeWxUrl(url) {
        let resultUrl = base64.decode(url);
        return resultUrl;
    },

    /**
     * @desc 获取完整的带参数的url:根据传入不带参数的页面url
     * @desc 比如：pages/index/index或者currentPage.route获取的url和页面的options参数来进行拼接成待参数的完整url
     * @param {string} url 不带任何参数的微信完整url
     * @param {object} [options = {}] 需要连接的参数对象
     * @param {boolean} enCode 是否将拼接好的url使用enCodeWxUrl进行编码？
     * @return {string} 返回拼接好的微信url
     */
    getUrlWithArgs(url, options = {}, enCode = false) {
        let result = url + "?";
        for (let key in options) {
            result += key + "=" + options[key] + "&";
        }
        result = result.slice(0, -1);  // 去掉最后的一个& 或者 ?
        // 多一个 & 没什么问题
        return enCode ? this.enCodeWxUrl(result) : result;
    },


    /**
     * 根据完整的url，获取参数和路径，
     * @param {string} url 完整的需要解析的url，比如：/pages/index/index?isSharePage=1
     * @return {object} 返回解析好的url和参数对象
     * @return {string} object.path 不带任何参数的url路径
     * @return {object} object.options 参数对象
     *
     */
    getOptionsAndPath(url) {

        let routeArr = url.split("?");
        let path = routeArr[0];
        let options = {};
        if (routeArr[1]) {
            let optionsArr = routeArr[1].split("&");
            for (let value of optionsArr) {
                if (value) {
                    let keyAndValue = value.split("=");
                    if (keyAndValue[0] && keyAndValue[1]) {
                        options[keyAndValue[0]] = keyAndValue[1];
                    }
                }
            }
        }

        return {
            path,
            options,
        };
    },
    /**
     * 根据小程序的页面栈，获取当前页面的url（不带参数）
    */
    getCurrentPageUrl() {
        // 获取加载的页面
        const pages = getCurrentPages();
        // 获取当前页面的对象
        const currentPage = pages[pages.length-1];
        // 当前页面url
        const url = currentPage.route;
        return url;
    },
    /**
     * 根据小程序的页面栈，获取当前页面的带参数的url
    */
    getCurrentPageUrlWithArgs(enCode = false) {
        // 获取加载的页面
        const pages = getCurrentPages();
        // 获取当前页面的对象
        const currentPage = pages[pages.length - 1];
        // 当前页面url
        const url = `/${currentPage.route}`;
        // 如果要获取url中所带的参数可以查看options
        const { options } = currentPage;
        return this.getUrlWithArgs(url, options, enCode);
    },

};

export default loginTools;

