//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        image1:[
            "http://pic1.win4000.com/pic/3/8a/1efa1227108.jpg",
            "http://img0.imgtn.bdimg.com/it/u=426595056,3152484396&fm=27&gp=0.jpg",
            "http://img4.imgtn.bdimg.com/it/u=973931041,1439083005&fm=27&gp=0.jpg",
            "http://img5.imgtn.bdimg.com/it/u=1810050752,207505815&fm=200&gp=0.jpg",
            "http://img2.imgtn.bdimg.com/it/u=2085651048,3663153396&fm=200&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=3955217826,2041232644&fm=27&gp=0.jpg",
            "http://img5.imgtn.bdimg.com/it/u=1970453870,3645267607&fm=200&gp=0.jpg",
            "http://pic1.win4000.com/pic/3/8a/1efa1227108.jpg",
            "http://img1.imgtn.bdimg.com/it/u=3442569881,3636953688&fm=27&gp=0.jpg",
            "http://img2.imgtn.bdimg.com/it/u=784480113,1342336517&fm=27&gp=0.jpg",
        ],
        image2: [
            "http://pic1.win4000.com/wallpaper/d/59b0ecd50be87.jpg",
            "https://img-arch.pconline.com.cn/images/upload/upc/tx/itbbs/1408/09/c16/37245684_1407591597949.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2968681380,2315608072&fm=27&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=705946810,3787436125&fm=27&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=4091245905,3267256868&fm=27&gp=0.jpg",
            "http://img5.imgtn.bdimg.com/it/u=3345596217,2498776830&fm=27&gp=0.jpg",
            "http://img4.imgtn.bdimg.com/it/u=1292606346,752693602&fm=27&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2256128035,3211204545&fm=27&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2981740560,2414125258&fm=27&gp=0.jpg",
            "http://img2.imgtn.bdimg.com/it/u=2250409695,912565043&fm=27&gp=0.jpg",
            
        ],
        test: true,
        loadImage:null,
        loadImageLength:0,
        urlArr: [
            "http://pic1.win4000.com/wallpaper/d/59b0ecd50be87.jpg",
            "https://img-arch.pconline.com.cn/images/upload/upc/tx/itbbs/1408/09/c16/37245684_1407591597949.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2968681380,2315608072&fm=27&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=705946810,3787436125&fm=27&gp=0.jpg",
            "http://img1.imgtn.bdimg.com/it/u=4091245905,3267256868&fm=27&gp=0.jpg",
            "http://img5.imgtn.bdimg.com/it/u=3345596217,2498776830&fm=27&gp=0.jpg",
            "http://img4.imgtn.bdimg.com/it/u=1292606346,752693602&fm=27&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2256128035,3211204545&fm=27&gp=0.jpg",
            "http://img0.imgtn.bdimg.com/it/u=2981740560,2414125258&fm=27&gp=0.jpg",
            "http://img2.imgtn.bdimg.com/it/u=2250409695,912565043&fm=27&gp=0.jpg",
        ]
    },
    onLoad: function () {
        // this.loadImage(...this.data.image2)
        this.loadImage2();  // 使用image来进行预加载
        // 使用迭代器.好像不可以
        // function* imageGenerator(items) {
        //     const self = this;
        //     for (let i = 0; i < items.length; i++) {
        //         yield items[i];
        //     }

        // }
        // const generator = imageGenerator(this.data.urlArr);
        // this.setData({
        //     generator
        // })
    },
    loadImage(...url) {
        const self = this;
        url.forEach((value,index) => {

            // 下载下来后，可以使用临时路径存放。不过要每次都下载一次，不会有缓存，因为临时文件不会缓存。
            // 文件的临时路径，在小程序本次启动期间可以正常使用,小程序关闭后就会失效。
            wx.downloadFile({
                url: value, 
                success: function (res) {
                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    if (res.statusCode === 200) {
                        console.log("加载成功：", res);
                        self.setData({
                            ['image2['+index+']']:res.tempFilePath
                        })
                    }
                }
            })


        });
    },
    
    loadImage2() {
        const self = this;
        let loadImage = {};  //wx不能遍历set好像,所以没用set，要试试
        let urlArr = self.data.urlArr;

        let length = urlArr.length > 5 ? 5 : urlArr.length;
        self.setData({
            loadImageLength: length
        },() => {
            // 最多5个同时进行预加载。
            for (let i = 0; i < length; i++) {
                if (urlArr[i]) {
                    loadImage[urlArr[i]] = true;
                }
            }
            // console.log(loadImage)
            self.setData({
                loadImage
            })
        })

    },
    loadImageOk(e) {
        // 一张图片加载完成后的运行函数
        const src = e.target.dataset.src;
        let loadImage = this.data.loadImage;
        delete loadImage[src];  //删除已经加载的。 有些没删掉。因为他的src获取的好像有时候不准确。导致删除不准确了，小问题。
        // 要么直接不要删除，直接添加即可。那么可以直接使用数组了。问题也不是很大。影响不大。
        const urlArr = this.data.urlArr;
        if (urlArr.length > this.data.loadImageLength) {  //说明还有要加载的
            loadImage[urlArr[this.data.loadImageLength]] = true;
            // 这个是异步的，可能导致了可能不可预测的问题。在一个setdata还未渲染时，下一个setdata就覆盖掉了？

            // console.log(loadImage, src, urlArr[this.data.loadImageLength])
            // console.log(src)
            this.setData({
                loadImageLength: this.data.loadImageLength+1,
                loadImage
            })
            
        }
        // console.log("image加载完成", src, e.detail, this.data.loadImageLength)

    },
    
    loadImage3() {
        const self = this;
        let loadImage = new Set();  //wx不能遍历set好像,所以没用set，要试试
        // let urlArr = self.data.urlArr;
        let generator = self.data.generator;

        let length = urlArr.length > 5 ? 5 : urlArr.length;
        self.setData({
            loadImageLength: length
        }, () => {
            // 最多5个同时进行预加载。
            for (let i = 0; i < length; i++) {
                let next = generator.next();
                if(!next.done) {
                    loadImage.add(next.value);
                }
            }
            // console.log(loadImage)
            self.setData({
                loadImage
            })
        })

    },
    loadImageOk3(e) {
        // 一张图片加载完成后的运行函数
        const src = e.target.dataset.src;
        let loadImage = this.data.loadImage;
        delete loadImage[src];  //删除已经加载的。 有些没删掉。因为他的src获取的好像有时候不准确。导致删除不准确了，小问题。
        const urlArr = this.data.urlArr;

        let next = generator.next();
        if(!netx.done) {
            loadImage.delete(src);
            loadImage.add(next.value);
        }

        // console.log("image加载完成", src, e.detail, this.data.loadImageLength)

    },
    tap() {
        this.setData({
            test:!this.data.test
        })
    },
    loadOk(e) {
        // console.log("image加载完成",e.detail);
    },
    switchImage() {

    }
})
