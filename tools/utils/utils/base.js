






/**
 * 数组去重。使用es6的set集合的方法
 * @param {array} arr 待去重数组
 * @return {array} 一个新的去重后的数组
*/
const unique = (arr) => {
    return Array.from(new Set(arr));
}


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

}


/**
 * 是否是数组
 * @param {array} o 待验证的数组
 * @return {boolean} 返回验证结果。
*/
const isArray = (o) => {
    return Object.prototype.toString.call(o) == '[object Array]';
}


/*

    微信api说明：
    wx.on 开头的 API 是监听某个事件发生的API接口，接受一个 CALLBACK 函数作为参数。当该事件触发时，会调用 CALLBACK 函数。
    如未特殊约定，其他 API 接口都接受一个OBJECT作为参数。
    OBJECT中可以指定success, fail, complete来接收接口调用结果。


     */

/**
 * 把一个微信方法封装为一个promise的方法。
 * @param {array} o 待验证的数组
 * @return {boolean} 返回验证结果。
 */

const wxMethodPromise =  (wxMethod) => {
    return (args) => {

        const promise = new Promise((resolve, reject) => {
            args.success = (res) => resolve(res);
            // 好像成功和失败的回调，都只有一个res参数
            // 如果回调有多个参数，那么可以使用如下形式,然后，then的回调使用数组的解构赋值即可。
            // args.success = (...data) => resolve(data);
            args.fail = (err) => reject(err);
            wxMethod(args);
        });
        return promise;
    }

}

/**
 * 使用JSON完全复制一个对象
*/

const deepCopyObj = deepCopyObj(object) => {
    return JSON.parse(JSON.stringify(object));
}

/**
 * 是否是一个url路径
*/
const isValidUrl = isValidUrl(url) {
    return /(ht|f)tp(s?):\/\/([^ \\/]*\.)+[^ \\/]*(:[0-9]+)?\/?/.test(url);
}


/**
 * 添加一个异步版本的forEach遍历函数。
*/
Array.prototype.forEachSync = async function (callback, thisArg) {
    const len = this.length;
    for (let i = 0;i < len;i += 1) {
        await callback(this[i]);
    }
}

// 例子：
// const arr = [1, 2, 3];
// arr.forEachSync(async (value) => {
//     const result = await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(value);
//         }, 1000);
//     });
//     console.log(result);
//
// });




const base = {
    unique,
    setLastPageData,
    isArray,
    wxMethodPromise,
    deepCopyObj,
    isValidUrl,
}



export default base;

