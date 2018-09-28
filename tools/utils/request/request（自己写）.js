




/**
 * Promise 封装 wx.request 请求方法
 * 
 * @param {Object} config 配置项  
 * @param {String} config.suffix 方法名后缀字符串，默认值 Request
 * @param {String} config.baseURL 基础请求路径
 * @param {Object} config.header 请求头
 * 
 */

/*
例子

new requestServer({
    serverUrl:'',       //请求接口的根路径，接口都会在这个路径之下请求
    header:{            //设置header头
        'content-type': 'application/json'   
    },
    dataType:''         //返回数据类型默认为json
    responseType:''    //响应数据类型默认为text.还可以去arraybuffer
})


*/


const requestServer = function (config) {
    this.config = config;
    this.__init();
}

let requestPrototype = {};
requestServer.prototype = requestPrototype;
// Object.setPrototypeOf(requestServer, requestPrototype);

requestPrototype.__init = function () {
    this.__initConfig();
    this.__initRequest();
}

requestPrototype.__initConfig = function () {
    const config = {
        header: {            //设置header头
            'content-type': 'application/json'
        },
        dataType: 'json',         //返回数据类型默认为json
        responseType:'text',    //响应数据类型默认为text.还可以去arraybuffer
        transformRequest: [
            (data, header) => {
                return data;
            }
        ],
        transformResponse: [
            (data, header,statusCode) => {
                return data;
            }
        ]
    }

    this.config = Object.assign({},config,this.config);
}

requestPrototype.__initRequest = function () {
    const __methods = [
        'GET',
        'POST',
    ];

    __methods.forEach((method) => {
        this[`${method.toLocaleLowerCase()}_request`] = (url, data, config) => {
            return this.__defaultRequest(Object.assign({},this.config,{
                url, data, method
            }, config));
        }
    })
}
requestPrototype.__defaultRequest = function (config) {
    let serverUrl = config.serverUrl;
    let $url = config.url;
    // 如果他不是绝对路径，则拼接serverUrl和传入的url
    if($url.charAt(0) != '/') {
        $url = serverUrl + $url;
    }
    // 设置wx.request的参数
    let $$config = {
        url: $url,
        data: config.data,
        header: config.header,
        method: config.method,
        dataType: config.dataType,
        responseType:config.responseType,
    }



    

    // 状态码的拦截
    const validateStatus = (statusCode) => {
        return statusCode >= 200 && statusCode < 300;
    }

    

    // 如果要转换数据，那么会变的只有data，header和statusCode根本不会变。

    // 执行所有拦截数据的转换函数
    const transformData = (data, header, statusCode,fns) => {
        fns.forEach((fn) => {
            data = fn(data,header,statusCode);
        })
        return data;
    }
    // 这是响应数据拦截函数,并且根据validateStatus这个状态拦截吗函数来判断是否是执行then还是catch。
    const transformResponse = (res) => {

        let _res = Object.assign({}, res, {
            data: transformData(res.data,res.header,res.statusCode,this.config.transformResponse)
        })
        return validateStatus(res.statusCode) ? _res : Promise.reject(res);
    }

    const requestServer = (config) => {
        const _config = Object.assign({}, config,{
            data: transformData(config.data, config.header, undefined, this.config.transformRequest)
        })
        return this.__http(_config).then(transformResponse, transformResponse);
    }






    let promise = Promise.resolve($$config);


    // 请求拦截器(请求之前做的一些事情)

    promise = promise.then(requestServer);
    
    // 响应拦截器(响应后做的事情)
    
    return promise;
}

requestPrototype.__http = function (config) {
    return new Promise((resolve, reject) => {
        config.success = (res) => {
            resolve(res)
        };
        config.fail = (err) => reject(err);
        wx.request(config);
    });
    
}


module.exports = requestServer;
