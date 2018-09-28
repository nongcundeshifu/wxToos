//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        canvasData: {
            userImg: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJQtNOiboVY74WTnUrTSRUib0CdYKZlGBhLNg9MV2m1KmEHsibVpRGibNutlpQwTzwdF5E7nOvHHtsa2A/132",
            userName: "农村的师傅",
            awardList: [
                { name: "奖项一", content: "这是一个奖项描述" },
                { name: "奖项二", content: "这是一个奖项描述" },
                { name: "奖项三", content: "这是一个奖项描述" }
            ]
        },
        date: "06月02日 12:00",
        drawType: "自动开奖",
        twoCode: "",
        instructions: "抽奖说明，不超过30个字",
        canvasHeight:1000,
        opacity:0,
        shareImageSrc:""
    },
    onLoad() {
        this.getShareImage();
    },
    getShareImage() {

        this.getCanvasInfo();
    },
    getCanvasInfo() {
        // canvas 画布信息
        const SelectorQuery = wx.createSelectorQuery();
        const self = this;
        SelectorQuery.select("#canvas").boundingClientRect((rect) => {
            const canvasWidth = rect.width;
            const canvasHeight = rect.height;
            const canvasInfo = {
                width: canvasWidth,
                height: canvasHeight,
                offsetTop:0
            }
            self.drawShareImage(canvasInfo);
        }).exec();
        
    },
    drawShareImage(canvasInfo) {
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
        self.drawUserInfo(context,canvasInfo);
        
        

        
    },
    drawUserInfo(context, canvasInfo) {
        const self = this;
        const canvasData = self.data.canvasData;
        const imageWidth = 50;// 图片40px宽
        const imageOffsetTop = 20;
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
                    context.fillText(canvasData.userName, canvasInfo.width / 2, 90);  //offsettop 100
                    context.font = "18px pingfang";
                    context.fillText("发起了一个抽奖活动", canvasInfo.width / 2, 120);
                    // context.draw(true);
                    canvasInfo.offsetTop = 120;
                    // self.setData({
                    //     canvasHeight:canvasInfo.offsetTop
                    // })
                    self.drawPrizeInfo(context, canvasInfo);
                }
            }
        
        })
    },
    drawPrizeInfo(context, canvasInfo) {
        const self = this;
        const imgProportion = 0.566;  //图片宽高比，其实最好是获取图片的信息在进行裁剪。
        let imgWidth = 0;
        let imgHeight = 0;
        wx.getImageInfo({
            src:"./test.jpg",
            success(res){
                imgWidth = res.width;
                imgHeight = res.height;
                context.drawImage("./test.jpg",10,canvasInfo.offsetTop+40,canvasInfo.width-20,canvasInfo.width*imgProportion)
                canvasInfo.offsetTop = canvasInfo.offsetTop + 40;
                //白色背景
                context.setFillStyle("#fff");
                context.fillRect(10,canvasInfo.offsetTop + canvasInfo.width*imgProportion,canvasInfo.width-20,400);

                //文字信息
                context.setTextAlign("left");
                context.font = "17px pingfang";
                context.setFillStyle("#838383");

                canvasInfo.offsetTop = canvasInfo.offsetTop + canvasInfo.width*imgProportion;
                // context.fillText("项目一：发起了一个抽奖活动", 20, canvasInfo.offsetTop + canvasInfo.width*imgProportion + 10+17,canvasInfo.width-20);
                self.measureDrawText(context,canvasInfo,"奖项一：新用户专享用，金牌吊炸天的奥利奥 X 1",canvasInfo.width - 40,20,{fontSize:17,lineOffsetTop:10})
                // self.measureDrawText(context,canvasInfo,"动态设置画布的高度没什Dynamically setting the height of the canvas makes no difference，所以设置宽高没什么问题",canvasInfo.width - 40,20,{fontSize:17,lineOffsetTop:10})

                // canvasInfo.offsetTop = canvasInfo.offsetTop + canvasInfo.width*imgProportion + 10+17;
                context.font = "14px pingfang";
                context.setFillStyle("#b5b5b5");
                context.fillText("6月05日   12:00 自动开奖", 20, canvasInfo.offsetTop  + 10+14,canvasInfo.width-20);
                canvasInfo.offsetTop = canvasInfo.offsetTop  + 10+14;
                context.setLineWidth(1);
                context.beginPath();
                context.moveTo(20,canvasInfo.offsetTop+10);
                context.lineTo(canvasInfo.width - 20,canvasInfo.offsetTop+10)
                context.setStrokeStyle("#dfdfdf");
                context.closePath();
                context.stroke();
                canvasInfo.offsetTop = canvasInfo.offsetTop+10;
                let codeImageWidth = 90;
                context.drawImage("./code.png",canvasInfo.width/2 - codeImageWidth/2,canvasInfo.offsetTop+10,codeImageWidth,codeImageWidth)
                canvasInfo.offsetTop = canvasInfo.offsetTop+10+codeImageWidth;
                canvasInfo.offsetTop = canvasInfo.offsetTop+10;
                context.setTextAlign("center");
                context.font = "16px pingfang";
                context.fillText("长按识别小程序，参与抽奖", canvasInfo.width/2, canvasInfo.offsetTop + 15);
                canvasInfo.offsetTop = canvasInfo.offsetTop+15;

                context.beginPath();
                context.moveTo(20,canvasInfo.offsetTop+20);
                context.lineTo(canvasInfo.width - 20,canvasInfo.offsetTop+20)
                context.setStrokeStyle("#cfcfcf");
                context.closePath();
                context.stroke();
                canvasInfo.offsetTop = canvasInfo.offsetTop+20;
                if(context.measureText("抽奖说明：这是不超过30个字的抽奖说明,如果超出的会自动换行，并左对齐").width<(canvasInfo.width - 40)) {
                    
                    context.setTextAlign("center");
                    self.measureDrawText(context,canvasInfo,"抽奖说明：这是不超过30个字的抽奖说明，如果超出的会自动换行，并左对齐",canvasInfo.width - 40,canvasInfo.width/2,{fontSize:17,lineOffsetTop:10})
                }
                else {
                    context.setTextAlign("left");
                    self.measureDrawText(context,canvasInfo,"抽奖说明：这是不超过30个字的抽奖说明，如果超出的会自动换行，并左对齐",canvasInfo.width - 40,20,{fontSize:17,lineOffsetTop:10})
                }
                // context.fillText("抽奖说明：这是不超过30个字的抽奖说明，如果一行不够则左对其", canvasInfo.width/2, canvasInfo.offsetTop + 16+15);
                

                canvasInfo.offsetTop = canvasInfo.offsetTop + 20;

                // 结尾：裁切画布大小
                
                context.setFillStyle("#fd5555");
                context.fillRect(0,canvasInfo.offsetTop,canvasInfo.width,canvasInfo.height);

                canvasInfo.offsetTop = canvasInfo.offsetTop+10;  //这里就是画布的高度位置了

                
                // 动态设置画布的高度没什么影响，这个cavas就是div，超出了只是隐藏了，所以设置宽高没什么问题。


                // 方案一：使用wx.drawCanvas 配合context.getActions() 进行修改
                //实际上，context.getActions()后，context中的信息会被清空，如果想重复利用，需要var temp= context.getActions()将操作数组保存下来，才可重复用于wx.drawcanvas；
                /*
                let action = context.getActions();  //返回上下文绘制动作，不推荐使用。因为要配合drawCanvas方法。
                console.log(action);
                action[2].data[0].data[3] = canvasInfo.offsetTop;
                wx.drawCanvas({
                    canvasId:"canvas",
                    actions: action
                })
                */
                
                
                // 方案二：使用draw，然后动态设置画布高度。不过画布高度一开始要设置的非常大。不然背景绘制不够
                context.draw(true);
                self.setData({
                    canvasHeight:canvasInfo.offsetTop,
                    opacity:1
                })
                

            },
            fill(res) {
            }
        })
        
    },
    // 文本绘制方法
    measureDrawText(context,canvasInfo,text,drawWidth,left,drawInfo) {
        const self = this;
        let drawText = text;
        let expectTextLength = Math.floor(drawWidth / (drawInfo.fontSize));
        console.log(expectTextLength);
        let textIndex = 0;
        let isLastChar = false;

        let isBeyond = false;

        for(let i = 0;i<text.length;i++) {
            if((text.length - textIndex < expectTextLength)) {
                expectTextLength = text.length - textIndex;
                isLastChar = true;
            }
            let drawTextTemp = drawText.substring(textIndex,expectTextLength+textIndex);
            let textWidth = context.measureText(drawTextTemp).width;

            if(textWidth < drawWidth) {
                if(isLastChar) {
                    console.log("last:"+drawTextTemp)
                    self.drawText(context,canvasInfo,drawTextTemp,left,drawInfo);
                    break;
                }
                expectTextLength+=1;
                continue;
            }else if( textWidth > drawWidth ) {
                expectTextLength--;
                let drawTextTempNext = drawText.substring(textIndex,expectTextLength+textIndex);
            
                let textWidthNext = context.measureText(drawTextTempNext).width;
                if(textWidthNext < drawWidth) {
                    console.log(drawTextTempNext)
                    self.drawText(context,canvasInfo,drawTextTempNext,left,drawInfo);
                    textIndex = expectTextLength+textIndex;
                }
                else {
                    expectTextLength--;
                }
                continue;

                
                // self.drawText(context,canvasInfo,drawTextTemp,left,top);
                // textIndex == expectTextLength;
                // i = expectTextLength - 1;
                // console.log(drawTextTemp)
            }
            else {
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
    drawText(context,canvasInfo,text,left,drawInfo) {
        console.log(1)
        context.fillText(text, left, canvasInfo.offsetTop+drawInfo.fontSize+drawInfo.lineOffsetTop);
        canvasInfo.offsetTop = canvasInfo.offsetTop+drawInfo.fontSize+drawInfo.lineOffsetTop
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
                console.log(res.tempFilePath)  // 返回图片路径
                self.setData({
                    shareImageSrc:res.tempFilePath
                })

            }
        })   
    },

})
