/**  time:2018/9/4
 *   作者:农村的师傅
 *   功能:封装平安小程序的wx.request请求
 */





/**
 * Promise 封装 wx.request 请求方法
 *
 * @param {Object} config 配置项
 * @param {String} config.serverUrl 基础请求路径
 * @param {Object} config.header 请求头
 *
 */

/*
例子

new Service({
    serverUrl:'',       //请求接口的根路径，接口都会在这个路径之下请求
    header:{            //设置header头
        'content-type': 'application/json'
    },
    dataType:''         //返回数据类型默认为json
    responseType:''    //响应数据类型默认为text.还可以去arraybuffer
})


*/


const Serviec = function Serviec(config) {
    this.config = config;
    this.__init();
};

let requestPrototype = {};
Serviec.prototype = requestPrototype;
// Object.setPrototypeOf(requestServer, requestPrototype);

requestPrototype.__init = function () {
    this.__initConfig();
    this.__initRequest();
};

requestPrototype.__initConfig = function () {
    const config = {
        // 设置header头
        header: {
            'content-type': 'application/json',
        },
        // 返回数据类型默认为json
        dataType: 'json',
        // 响应数据类型默认为text.还可以去arraybuffer
        responseType: 'text',
        // 会把header作为第二个参数传递过去
        transformRequest: [
            data => data,
        ],
        // 会把header作为第二个参数，starcode作为第三个参数传递过去
        transformResponse: [
            data => data,
        ],
    };

    this.config = Object.assign({}, config, this.config);
};

requestPrototype.__initRequest = function () {
    const __methods = [
        'GET',
        'POST',
    ];

    __methods.forEach((method) => {
        this[`${method.toLocaleLowerCase()}_request`] = (url, data, config) => {
            return this.__defaultRequest(Object.assign({}, this.config, {
                url, data, method,
            }, config));
        };
    });
};
requestPrototype.__defaultRequest = function (config) {
    const { serverUrl } = config;
    let $url = config.url;
    // 如果他不是绝对路径，则拼接serverUrl和传入的url
    if ($url.charAt(0) !== '/') {
        $url = serverUrl + $url;
    }
    // 设置wx.request的参数
    const $$config = {
        url: $url,
        data: config.data,
        header: config.header,
        method: config.method,
        dataType: config.dataType,
        responseType: config.responseType,
    };





    // 状态码的拦截
    const validateStatus = statusCode => statusCode >= 200 && statusCode < 300;



    // 如果要转换数据，那么会变的只有data，header和statusCode根本不会变。

    // 执行所有拦截数据的转换函数
    const transformData = (data, header, statusCode, fns) => {
        let result;
        fns.forEach((fn) => {
            result = fn(data, header, statusCode);
        });
        return result;
    };
    // 这是响应数据拦截函数,并且根据validateStatus这个状态拦截吗函数来判断是否是执行then还是catch。
    const transformResponse = (res) => {
        const _res = Object.assign({}, res, {
            data: transformData(
                res.data,
                res.header,
                res.statusCode,
                this.config.transformResponse,
            ),
        });
        return validateStatus(res.statusCode) ? _res : Promise.reject(res);
    };

    const requestServer = (config) => {
        const _config = Object.assign({}, config, {
            data: transformData(config.data, config.header, undefined, this.config.transformRequest),
        });
        return this.__http(_config).then(transformResponse, transformResponse);
    };






    let promise = Promise.resolve($$config);


    // 请求拦截器(请求之前做的一些事情)

    promise = promise.then(requestServer);

    // 响应拦截器(响应后做的事情)

    return promise;
};

requestPrototype.__http = function (config) {
    let _config = config;
    return new Promise((resolve, reject) => {
        _config.success = (res) => {
            console.log(`请求成功:${config.url}`, res);
            resolve(res);

        };
        _config.fail = (err) => {
            console.log('请求失败', err);
            reject(err);

        };

        // _config.complete = () => {
        //     console.log('请求失败complete');
        //
        // };
        wx.request(_config);





    });
};

export default Serviec;
