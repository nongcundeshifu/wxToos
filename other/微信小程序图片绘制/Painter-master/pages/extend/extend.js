// pages/extend/extend.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
		// 图片绘制json
		paletteTemp: {
			width: '640rpx',
			height: '830rpx',
			background: '#00abc6',
			borderRadius: '10rpx',
			views: [
				// {
				// 	type: 'text',
				// 	text: '什么鬼东西',
				// 	css: {
				// 		width: '590rpx',
				// 		top: '530rpx',
				// 		left: '30rpx',
				// 		fontSize: '32rpx',
				// 		maxLines: 1,
				// 		fontWeight: 'bold',
				// 	},
				// },
				{
					type: 'text',
					text: '使用 wx.request、wx.connectSocket、wx.uploadFile、wx.downloadFile 等方法时，都会涉及到 URL，微信小程序是不允许随便访问 URL 的，需要在小',
					css: {
						width: '400rpx',
						top: '600rpx',
						left: '30rpx',
						fontSize: '24rpx',
						maxLines: 4,
						color: '#000',
						lineHeight: '40rpx',
						borderWidth: '1rpx',
					},
				},

			],
		},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
		this.painterInit();
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

    },

	onPainterErr(e) {
		console.log(e);
	},

	painterInit() {
		const palette = this.data.paletteTemp;
		
		palette.views.push({
			type: 'image',
			url: '/pages/extend/1.jpg',

			css: {
				width: '640rpx',
				height: '510rpx',
				top: 0,
				left: '0rpx',
				mode: 'aspectFill',
				borderRadius: '10rpx',
			},
		});
		// 需要配置https才可以成功。
		// palette.views.push({
		// 	type: 'image',
		// 	// url: 'https://game.flyh5.cn/small/pingan/api/index/get_qrcode?page=pages/browse/video/video&scene=id=96451',
		// 	url: `${app.globalData.service}index/get_qrcode?page=${page[type]}&scene=${scene}`,
		// 	css: {
		// 		width: '160rpx',
		// 		height: '160rpx',
		// 		top: '600rpx',
		// 		left: '450rpx',
		// 		mode: 'aspectFill',
		// 	},
		// });
		// palette.views.push({
		// 	type: 'image',
		// 	url: '/img/underline.png',
		// 	css: {
		// 		width: '660rpx',
		// 		height: '20rpx',
		// 		top: '500rpx',
		// 		left: '-10rpx',
		// 		mode: 'scaleToFill',
		// 	},
		// });
		this.setData({

			paletteTemp: palette,
		});


	},
})