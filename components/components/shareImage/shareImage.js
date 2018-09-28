// components/shareImage/shareImage.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pr_canvasData:{
            type:Object,
            value:{}
        }
    },
    
    /**
     * 组件的初始数据
     */
    data: {

    },
    // 生命周期函数
    attached() {
        this.setData({
            canvasData: this.properties.pr_canvasData
        })
        
    },
    /**
     * 组件的方法列表
     */
    methods: {
        getCanvasData(options) {
            const self = this;
            let canvasData = self.data.canvasData;
            app.getUserInfo((userInfo) => {
                const { nickName, avatarUrl: avatarurl } = userInfo || {};
                canvasData.userImg = avatarurl;
                canvasData.userName = nickName;
                self.getPrizeInfo(options.prize_id, (prizeInfo) => {
                    canvasData.bannerImage = prizeInfo.pic;
                    canvasData.is_collage.status = prizeInfo.is_collage == 2;
                    canvasData.awardList = self.awardList(prizeInfo);
                    canvasData.run_type = self.run_type(prizeInfo);
                    canvasData.remark = prizeInfo.description || '';
                    // canvasData.remark = prizeInfo.is_collage;  //奖品说明字段
                    self.setData({
                        canvasData
                    })
                    self.getShareImage(canvasData);
                })

            })

        },
        run_type(prizeInfo) {
            switch (prizeInfo.run_type) {
                case 1:
                    return prizeInfo.run_date + " 自动开奖"
                case 2:
                    return "本抽奖达到" + prizeInfo.run_people + "人后自动开奖";
                case 3:
                    return "本抽奖由发起人手动开奖";
                case 4:
                    return "本抽奖为现场开奖";
            }

        },
        awardList(prizeInfo) {
            let awardList = [];
            if (prizeInfo.prize[0]) {
                awardList[0] = {};
                awardList[0].name = "奖项一";
                awardList[0].content = prizeInfo.prize[0].prize_name + " X " + prizeInfo.prize[0].number;
            }
            if (prizeInfo.prize[1]) {
                awardList[1] = {};
                awardList[1].name = "奖项二";
                awardList[1].content = prizeInfo.prize[1].prize_name + " X " + prizeInfo.prize[1].number;
            }
            if (prizeInfo.prize[2]) {
                awardList[2] = {};
                awardList[2].name = "奖项三";
                awardList[2].content = prizeInfo.prize[2].prize_name + " X " + prizeInfo.prize[2].number;
            }
            return awardList;
        },
        getPrizeInfo(prize_id, callback) {
            const self = this;
            let data = {
                submit: app.getSubmitKey(),
                prize_id,
                rdSession: wx.getStorageSync("rdSession")

            }
            app.post_service('Index/get_prize_detail', data, 'GET', function (res) {
                if (res.data.status == 200) {


                    self.setData({
                        prizeInfo: res.data.prize,
                    })
                    callback && callback(res.data.prize);
                }
            })
        },
        getShareImage(canvasData) {

            this.getCanvasInfo(canvasData);
        },
        getCanvasInfo(canvasData) {
            // canvas 画布信息
            const SelectorQuery = wx.createSelectorQuery();
            const self = this;
            SelectorQuery.select("#canvas").boundingClientRect((rect) => {
                const canvasWidth = rect.width;
                const canvasHeight = rect.height;
                const canvasInfo = {
                    width: canvasWidth,
                    height: canvasHeight,
                    offsetTop: 0
                }
                self.drawShareImage(canvasInfo, canvasData);
            }).exec();

        },
        drawShareImage(canvasInfo, canvasData) {
            const self = this;
            console.log(canvasInfo)
            const context = wx.createCanvasContext('canvas');
            const strokStyle = "#fd5555";
            const fillStyle = "#fd5555";

            // 提前设置一些属性
            context.setTextAlign("center");

            // 填充背景
            context.setFillStyle(fillStyle);
            // context.fillRect(0,0,canvasInfo.width,canvasInfo.height);
            context.beginPath();
            context.rect(0, 0, canvasInfo.width, canvasInfo.height);
            context.closePath();
            context.fill();
            // context.draw(true);
            self.drawUserInfo(context, canvasInfo, canvasData);




        },
        drawUserInfo(context, canvasInfo, canvasData) {
            const self = this;
            const imageWidth = 50; // 图片40px宽
            const imageOffsetTop = 10;
            const strokStyle = "#fd5555";
            const fillStyle = "#fd5555";
            // 需要配置下载合法域名，不能直接从网络上获取文件，真机上绘制不出来，要下载下来才行。或者直接缓存起来，转base64
            wx.downloadFile({
                url: canvasData.userImg,
                success: function (res) {

                    // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                    if (res.statusCode === 200) {
                        context.drawImage(res.tempFilePath, canvasInfo.width / 2 - imageWidth / 2, imageOffsetTop, imageWidth, imageWidth);
                        context.setLineWidth(20);
                        context.setStrokeStyle(strokStyle);
                        context.beginPath();
                        context.arc(canvasInfo.width / 2, imageOffsetTop + imageWidth / 2, imageWidth / 2 + 10, 0, 2 * Math.PI)
                        context.closePath();
                        context.stroke();
                        context.font = "15px pingfang";
                        context.setFillStyle("#fff8c2");
                        context.fillText(canvasData.userName, canvasInfo.width / 2, 80); //offsettop 100
                        context.font = "14px pingfang";
                        context.fillText(canvasData.title, canvasInfo.width / 2, 100);
                        // context.draw(true);
                        canvasInfo.offsetTop = 100;
                        // self.setData({
                        //     canvasHeight:canvasInfo.offsetTop
                        // })
                        self.drawPrizeInfo(context, canvasInfo, canvasData);
                    }
                }

            })
        },
        drawPrizeInfo(context, canvasInfo, canvasData) {
            const self = this;
            const imgProportion = 2 / 3; //图片宽高比，其实最好是获取图片的信息在进行裁剪。
            let imgWidth = 0;
            let imgHeight = 0;
            wx.getImageInfo({
                src: canvasData.bannerImage,
                success(res) {
                    imgWidth = res.width;
                    imgHeight = res.height;
                    context.drawImage(res.path, 10, canvasInfo.offsetTop + 10, canvasInfo.width - 20, canvasInfo.width * imgProportion)
                    if (canvasData.is_collage.status) {
                        context.drawImage(canvasData.is_collage.iconImage, 20, canvasInfo.offsetTop + canvasInfo.width * imgProportion - 30, 30, 30);
                    }
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 10;

                    //白色背景
                    context.setFillStyle("#fff");
                    context.fillRect(10, canvasInfo.offsetTop + canvasInfo.width * imgProportion, canvasInfo.width - 20, 400);

                    //文字信息
                    context.setTextAlign("left");
                    context.font = "17px pingfang";
                    context.setFillStyle("#838383");

                    canvasInfo.offsetTop = canvasInfo.offsetTop + canvasInfo.width * imgProportion;
                    // context.fillText("项目一：发起了一个抽奖活动", 20, canvasInfo.offsetTop + canvasInfo.width*imgProportion + 10+17,canvasInfo.width-20);
                    for (let text of canvasData.awardList) {
                        self.measureDrawText(context, canvasInfo, text.name + "：" + text.content, canvasInfo.width - 40, 20, { fontSize: 12, lineOffsetTop: 6 })
                    }

                    // self.measureDrawText(context,canvasInfo,"动态设置画布的高度没什Dynamically setting the height of the canvas makes no difference，所以设置宽高没什么问题",canvasInfo.width - 40,20,{fontSize:17,lineOffsetTop:10})

                    // canvasInfo.offsetTop = canvasInfo.offsetTop + canvasInfo.width*imgProportion + 10+17;
                    context.font = "12px pingfang";
                    context.setFillStyle("#b5b5b5");
                    context.fillText(canvasData.run_type, 20, canvasInfo.offsetTop + 10 + 5, canvasInfo.width - 20);
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 10 + 5;
                    context.setLineWidth(1);
                    context.beginPath();
                    context.moveTo(20, canvasInfo.offsetTop + 10);
                    context.lineTo(canvasInfo.width - 20, canvasInfo.offsetTop + 10)
                    context.setStrokeStyle("#dfdfdf");
                    context.closePath();
                    context.stroke();
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 10;
                    let codeImageWidth = 90;
                    context.drawImage(canvasData.minProgram.imageSrc, canvasInfo.width / 2 - codeImageWidth / 2, canvasInfo.offsetTop + 5, codeImageWidth, codeImageWidth)
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 5 + codeImageWidth;
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 5;
                    context.setTextAlign("center");
                    context.font = "16px pingfang";
                    context.fillText(canvasData.minProgram.title, canvasInfo.width / 2, canvasInfo.offsetTop + 15);
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 15;

                    context.beginPath();
                    context.moveTo(20, canvasInfo.offsetTop + 6);
                    context.lineTo(canvasInfo.width - 20, canvasInfo.offsetTop + 6)
                    context.setStrokeStyle("#cfcfcf");
                    context.closePath();
                    context.stroke();
                    canvasInfo.offsetTop = canvasInfo.offsetTop + 6;
                    if (context.measureText(canvasData.remark).width < (canvasInfo.width - 40)) {

                        context.setTextAlign("center");
                        self.measureDrawText(context, canvasInfo, canvasData.remark, canvasInfo.width - 40, canvasInfo.width / 2, { fontSize: 12, lineOffsetTop: 6 })
                    } else {
                        context.setTextAlign("left");
                        self.measureDrawText(context, canvasInfo, canvasData.remark, canvasInfo.width - 40, 20, { fontSize: 12, lineOffsetTop: 6 })
                    }
                    // context.fillText("抽奖说明：这是不超过30个字的抽奖说明，如果一行不够则左对其", canvasInfo.width/2, canvasInfo.offsetTop + 16+15);


                    canvasInfo.offsetTop = canvasInfo.offsetTop + 10;

                    // 结尾：裁切画布大小

                    context.setFillStyle("#fd5555");
                    context.fillRect(0, canvasInfo.offsetTop, canvasInfo.width, canvasInfo.height);

                    canvasInfo.offsetTop = canvasInfo.offsetTop + 10; //这里就是画布的高度位置了





                    // 方案二：使用draw，然后动态设置画布高度。不过画布高度一开始要设置的非常大。不然背景绘制不够
                    context.draw(true);
                    self.setData({
                        canvasHeight: canvasInfo.offsetTop
                    })
                    load.loadEnd(self);


                },
                fill(res) { }
            })

        },
        // 文本绘制方法
        measureDrawText(context, canvasInfo, text, drawWidth, left, drawInfo) {
            const self = this;
            let drawText = text;
            let expectTextLength = Math.floor(drawWidth / (drawInfo.fontSize));
            console.log(expectTextLength);
            let textIndex = 0;
            let isLastChar = false;

            let isBeyond = false;

            for (let i = 0; i < text.length; i++) {
                if ((text.length - textIndex < expectTextLength)) {
                    expectTextLength = text.length - textIndex;
                    isLastChar = true;
                }
                let drawTextTemp = drawText.substring(textIndex, expectTextLength + textIndex);
                let textWidth = context.measureText(drawTextTemp).width;

                if (textWidth < drawWidth) {
                    if (isLastChar) {
                        console.log("last:" + drawTextTemp)
                        self.drawText(context, canvasInfo, drawTextTemp, left, drawInfo);
                        break;
                    }
                    expectTextLength += 1;
                    continue;
                } else if (textWidth > drawWidth) {
                    expectTextLength--;
                    let drawTextTempNext = drawText.substring(textIndex, expectTextLength + textIndex);

                    let textWidthNext = context.measureText(drawTextTempNext).width;
                    if (textWidthNext < drawWidth) {
                        console.log(drawTextTempNext)
                        self.drawText(context, canvasInfo, drawTextTempNext, left, drawInfo);
                        textIndex = expectTextLength + textIndex;
                    } else {
                        expectTextLength--;
                    }
                    continue;


                    // self.drawText(context,canvasInfo,drawTextTemp,left,top);
                    // textIndex == expectTextLength;
                    // i = expectTextLength - 1;
                    // console.log(drawTextTemp)
                } else {
                    expectTextLength--;
                    continue;
                }
            }


            // for(let i = 0;i<text.length;i++) {
            //     if(text.length - textIndex < expectTextLength) {
            //         expectTextLength = text.length - textIndex;
            //         isLastChar = true;
            //     }
            //     let drawTextTemp = drawText.substring(textIndex,expectTextLength);
            //     let drawTextTempNext = drawText.substring(textIndex,expectTextLength+1);

            //     let textWidth = context.measureText(drawTextTemp).width;
            //     let textWidthNext = context.measureText(drawTextTempNext).width;

            //     if(drawTextTemp < drawWidth) {
            //         expectTextLength+=2;
            //         --i;
            //         continue;
            //     }else if( textWidth < drawWidth && drawTextTemp > drawWidth ) {
            //         self.drawText(context,canvasInfo,drawTextTemp,left,top);
            //         textIndex == expectTextLength;
            //         i = expectTextLength - 1;
            //         console.log(drawTextTemp)
            //     }
            //     else if(textWidth > drawWidth){
            //         expectTextLength--;
            //         --i;
            //         continue;
            //     }
            // }
        },
        drawText(context, canvasInfo, text, left, drawInfo) {
            console.log(1)
            context.fillText(text, left, canvasInfo.offsetTop + drawInfo.fontSize + drawInfo.lineOffsetTop);
            canvasInfo.offsetTop = canvasInfo.offsetTop + drawInfo.fontSize + drawInfo.lineOffsetTop
        },
        saveShareImage(canvasInfo) {
            const self = this;
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: canvasInfo.width,
                height: canvasInfo.offsettop,
                canvasId: 'canvas',
                success: function (res) {
                    console.log(res.tempFilePath) // 返回图片路径
                    self.setData({
                        shareImageSrc: res.tempFilePath
                    })
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            console.log(res)
                        },
                        fail(res) {
                            console.log(res)
                        }
                    })

                }
            })
        },

    }
})
