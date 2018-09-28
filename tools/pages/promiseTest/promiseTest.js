// pages/promsieTest/promiseTest.js
// import requestServer from '../../utils/request.js';
// import wxp from '../../utils/wxPromise.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        

        

        // this.testRequestServer();

        // this.testRdSession();

        // this.testAfterWxMethod();

        // this.wxp = new wxp();
        
        // this.testWxPromise();


    },
    testRequestServer() {
        // 设定请求拦截器，只针对data
        const transformRequest = [
            (data,header) => {
                data.submit = 20025;
                data.openid = 'oiZxY5PcQljiMBTJ4s0saaCgitIs';
                data.test = {
                    b:4646
                };
                data.fs = {
                    b: 4646
                };
                return data;
            }
        ]
        // 设定响应拦截器,只针对data
        const transformResponse = [
            (data, header,statusCode) => {
                data.belong_clerk_nickname += '-修改拦截的数据';
                return data;
            },
            (data, header, statusCode) => {
                data.belong_clerk_nickname += '-修改拦截的数据-2';
                data.bind_store += '-修改的拦截器';
                return data;
            }
        ]
        const request = new requestServer({
            serverUrl:'https://game.flyh5.cn/game/wx6e247bba155ec1a3/health_new/Api/',
            transformRequest,
            transformResponse,
        })
        let data = {
            openid:'48484',
            test:{
                a:'4545'
            }
        }
        request.get_request('Card/isBinding', data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {  
            console.log(err);
        })
    },


    // 登陆态改编测试
    testRdSession() {
        this.rdSessionRequestServer('Prize/get_user_count',{
            rdSession:wx.getStorageSync('rdSession')
        }).then((res) => {
            console.log('请求结果',res);
        }).catch((err) => {
            console.log('请求失败',err);
        });
    },
    // 登陆态登陆
    rdSessionRequestServer(url,data) {
        // 设定请求拦截器，只针对data
        const transformRequest = [
            (data, header) => {
                data.submit = '6250776ab7c9bead1099b075862afd43';
                return data;
            }
        ];
        const request = new requestServer({
            serverUrl: 'https://lucky.dh123.cn/index.php/api/',
            transformRequest,
        })


        const rdSessionRequest = request.get_request(url, data)
        .then((res) => {
            if (res.data.status == 300 || res.data.status == 400) {
                // 登陆态异常
                wx.removeStorageSync("rdSession");
                // 进行登陆
                // 登陆成功后，再次请求那个接口。注意此处可能会出现死循环的问题。也就是不停报300,400
                return this.rdSessionLogin(url, data)
            }
            else {
                return res;
            }
        })
        
        return rdSessionRequest;
        
        
        
    },

    rdSessionLogin(url,data) {
        const transformRequest = [
            (data, header) => {
                data.submit = '6250776ab7c9bead1099b075862afd43';
                return data;
            }
        ]
        const request = new requestServer({
            serverUrl: 'https://lucky.dh123.cn/index.php/api/',
            transformRequest,
        })

        const loginPromise = this.login();
        
        return loginPromise
        .then((rdSession) => {
            let data1 = Object.assign({}, data, { rdSession });
            return request.get_request(url, data1)
        })
        .catch((res) => {
            wx.showToast({
                title: '请求登陆态失败！',
                icon: 'none',
                duration: 1000
            })
            return Promise.reject(res)
        })
    },
    

    login() {

        let self = this;
        const transformRequest = [
            (data, header) => {
                data.submit = '6250776ab7c9bead1099b075862afd43';
                return data;
            }
        ]
        const request = new requestServer({
            serverUrl: 'https://lucky.dh123.cn/index.php/api/',
            transformRequest
        })
       
        

        // 正确写法

        return Promise.all([this.wxLogin(), this.getUserInfo()])
        .then(([loginData, userInfo]) => {
            let data = {
                code: loginData.code,
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
            }
            return request.get_request('Base/getOpen', data)

        })
        .then((res) => {
            if (res.data.message.slice(0,7) == 'invalid') {
                wx.setStorageSync("rdSession", 'QrIA2iWDKKLKXJNX');
                console.log("设置缓存成功");
                return 'QrIA2iWDKKLKXJNX';
            }
            return '';
            
        })
        .catch((res) => {
            console.log('login失败',res);
            return Promise.reject(res)
        })


        // 这里有一个问题，那就是wxLogin中的参数如何传递到userinf中。(如果有时候真的需要怎么办？？？)
        // this.wxLogin()
        // .then((res) => {
        //     return this.getUserInfo();
        // })
        // .then((userInfo) => {
        //     let data = {
        //         code: res.code,
        //         submit: self.getSubmitKey(),
        //         avatarUrl: userInfo.avatarUrl,
        //         nickName: userInfo.nickName
        //     }
        //     //发送 res.code 到后台换取 rdSession
            
        // } )
    },
    wxLogin(data) {
        const promise = new Promise((resolve,reject) => {
            wx.login({
                success: res => {
                    resolve(res)
                },
                fail: err => {
                    reject(err)
                }
            })
        });
        return promise;
    },
    getUserInfo() {
        const promise = new Promise((resolve, reject) => {
            wx.getUserInfo({
                success: function (res) {
                    resolve(res.userInfo)
                },
                fail:err => {
                    reject(err)
                }
            })
        });
        return promise;
        
    },

    /*
    
    微信api说明：
    wx.on 开头的 API 是监听某个事件发生的API接口，接受一个 CALLBACK 函数作为参数。当该事件触发时，会调用 CALLBACK 函数。
    如未特殊约定，其他 API 接口都接受一个OBJECT作为参数。
    OBJECT中可以指定success, fail, complete来接收接口调用结果。
    
    
     */

    afterWxMethod(wxMethod) {
        // if (typeof wxMethod === 'function') {
        //     return wxMethod;
        // }
        return (args) => {
            
            const promise = new Promise((resolve, reject) => {
                args.success = (res) => resolve(res);  // 好像成功和失败的回调，都只有一个res参数
                // 如果回调有多个参数，那么可以使用如下形式,然后，then的回调使用数组的解构赋值即可。
                // args.success = (...data) => resolve(data);
                args.fail = (err) => reject(err);
                wxMethod(args);
            });
            return promise;
        }
        
    },
    testAfterWxMethod() {
        const getUserInfo = this.afterWxMethod(wx.getUserInfo);
        getUserInfo({
            lang:'zh_CN',
            timeout:1000
        })
        .then((res) => {
            console.log('获取用户信息', res);
        })
    },
    
    // 测试wxPromise
    testWxPromise() {

        this.wxp.getUserInfo({
            lang: 'zh_CN',
            timeout: 1000
        }).then((res) => {
            console.log('测试wxp的数据',res)
        })

        this.wxp.getImageInfo({
            src:'http://bpic.588ku.com/back_pic/00/00/40/82/8951ed9f74bd401c66aa408c485ccb28.jpg'
        }).then((res) => {
            console.log('测试wxp的数据,图片', res)
        }).catch((err) => {
            console.log('测试wxp的数据,图片错误',err)
        })

        // setTimeout(() => {
        //     this.wxp.redirectTo('/pages/index/index',{
        //         test:1,
        //         b:'test'
        //     })
        // },2000)
    }

})