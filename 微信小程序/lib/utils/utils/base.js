






/**
 * 数组去重。使用es6的set集合的方法
 * @param {array} arr 待去重数组
 * @return {array} 一个新的去重后的数组
*/
const unique = (arr) => {
    return Array.from(new Set(arr));
};


/**
 * 通过本页面向小程序返回的上一个页面传递数据。（使用页面栈）
 * @param {object} data 需要传递的数据，是一个对象
 * @param {boolean} [navigateBack] 是否需要返回上一层。
*/
const setLastPageData = (data = {}, navigateBack = false) => {
    // 使用页面栈向上一个页面发送数据。不过要确定本页面栈的上一个页面是想要的页面。
    const currentPages = getCurrentPages();
    const lastPage = currentPages[currentPages.length - 2];  //本页面的上一个页面。要确定这个页面一定存在
    // data  需要传递的数据对象。
    lastPage.getLastPageData && lastPage.getLastPageData(data);  //运行那个页面事先定义好的函数。为getLastPageData函数

    if (navigateBack) {
        wx.navigateBack({
            delta: 1
        })
    }

};


/**
 * 是否是数组
 * @param {array} o 待验证的数组
 * @return {boolean} 返回验证结果。
*/
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

const base = {
    unique,
    setLastPageData,
    isArray,
};
export default base;

