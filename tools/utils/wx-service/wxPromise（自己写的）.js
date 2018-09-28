


/**
 * 遍历wx对象中的属性，如果是异步方法，则封装为promise的形式，如果是同步的，则不变。
 * 
 * 
 * 
 */



const wxp = function () {
    this.__init()
}


let wxpPrototype = {};
wxp.prototype = wxpPrototype;


wxpPrototype.__init = function () {
    this.__initTools();
    this.__initDefault();
    this.__initMethods();
}


wxpPrototype.__initTools = function () {
    this.tools = {
        getUrlWithArgs(url, options = {}) {
            let result = url + "?";
            // for in 专门用来遍历对象。for of不能遍历对象。
            for (let key in options) {
                result += key + "=" + options[key] + "&";
            }
            result = result.slice(0, -1);  // 去掉最后的一个& 或者 ?
            return result;
        },
    }
}

wxpPrototype.__initDefault = function () {
    // 存储异步方法
    this.noPromiseMethods = [
        'stopRecord',
        'pauseVoice',
        'stopVoice',
        'pauseBackgroundAudio',
        'stopBackgroundAudio',
        'showNavigationBarLoading',
        'hideNavigationBarLoading',
        'createAnimation',
        'createContext',
        'hideKeyboard',
        'stopPullDownRefresh',
    ]

    this.wxMethods = Object.keys(wx);
}

wxpPrototype.__initMethods = function () {

    this.wxMethods.forEach((method) => {
        this[method] = (...ags) => {
            // 判断是否为非异步方法或以 wx.on 开头，或以 Sync 结尾的方法
            if (this.noPromiseMethods.indexOf(method) !== -1 || method.substr(0, 2) === 'on' || /\w+Sync$/.test(method)) {
                return wx[method](...ags);
            }
            return this.__wxPromiseMethod(method,...ags);
        }
    })

    // 重写导航api，参数不再用于拼接
    // @param { String } url  路径
    // @param { Object } params 参数

    const navigate = [
        'navigateTo',
        'redirectTo',
        'switchTab',
        'reLaunch',
    ]

    navigate.forEach((navigateMethod) => {
        this[navigateMethod] = (url,params = {}) => {
            // 将params拼接为路径
            let obj = {
                url
            }
            if(navigateMethod !== 'switchTab') {
                obj.url = this.tools.getUrlWithArgs(url,params)
            }
            wx[navigateMethod](obj);
        }
    })

    this.navigateBack = (delta = 1) => {
        return wx.navigateBack({
            delta,
        })
    }


}

wxpPrototype.__wxPromiseMethod = function (method,obj = {}) {
    const promise = new Promise((resolve, reject) => {
        obj.success = (res) => resolve(res);  // 好像成功和失败的回调，都只有一个res参数
        // 如果回调有多个参数，那么可以使用如下形式,然后，then的回调使用数组的解构赋值即可。
        // args.success = (...data) => resolve(data);
        obj.fail = (err) => reject(err);
        wx[method](obj);
    });
    return promise;
}


module.exports = wxp;













