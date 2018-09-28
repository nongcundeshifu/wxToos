// components/clamp/clamp.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
		value: {
			type: String,
			value: '',
		},
		lines: {
			type: Number,
			value: 2,
		},
    },

    /**
     * 组件的初始数据
     */
    data: {
		text: '',
    },
	attached() {
		this.setData({
			text: this.properties.value,
		});
	},

	ready() {
		this.clampText();
	},

    /**
     * 组件的方法列表
     */
    methods: {

		// 根据属性计算他的内容
		clampText() {
			const select = wx.createSelectorQuery().in(this).select('#text');
			const fields = new Promise(((resolve, reject) => {
				select.fields({
					size: true,
					computedStyle: ['fontSize', 'lineHeight'],
				}, (res) => {
					// 此处返回指定要返回的样式名

					resolve(res);
				}).exec();

				// 超时
				setTimeout(() => {
					reject(new Error('请求节点超时'));
				}, 5000);

			})).then((res) => {
				let { width, fontSize, lineHeight } = res;

				if (lineHeight === 'normal') {
					lineHeight = 1.4;
				}
				width = parseInt(width);
				fontSize = parseInt(fontSize);

				// fontSize这种东西可能会是一些默认值之类的。

				const ctx = wx.createCanvasContext('clampCanvas');

				this.ctx = ctx;
				

				const result = this._fillAbsText({
					width,
					lines: this.properties.lines,
					fontSize,
					text: this.properties.value,
				})

				console.log(result);

				this.setData({
					text: result,
				});










			});






		},


		/*
		view = {
			width
			lines
			text
			fontSize
		}
		
		*/
		_fillAbsText(view) {
			if (!view.text) {
				return;
			}
			this.ctx.save();
			const {
				width,
				// px
				fontSize = 18,
				lines,
			} = view;
			this.ctx.setFillStyle('#000000');
			this.ctx.setFontSize(fontSize+1);
			const preLineLength = Math.round(view.text.length / lines);

			let start = 0;
			let alreadyCount = 0;
			let result = '';


			for (let i = 0; i < lines; ++i) {
				console.log(1);
				alreadyCount = preLineLength;
				let text = view.text.substr(start, alreadyCount);
				let measuredWith = this.ctx.measureText(text).width;
				// 如果测量大小小于width一个字符的大小，则进行补齐，如果测量大小超出 width，则进行减除
				// 如果已经到文本末尾，也不要进行该循环

				//  更改源码
				if ((start + alreadyCount > view.text.length)) {
					text = view.text.substr(start, view.text.length);
					alreadyCount = view.text.length - start;
				}

				while ((start + alreadyCount <= view.text.length) && (width - measuredWith > fontSize+1 || measuredWith > width)) {
					if (measuredWith < width) {
						text = view.text.substr(start, ++alreadyCount);
					} else {
						if (text.length <= 1) {
							// 如果只有一个字符时，直接跳出循环
							break;
						}
						text = view.text.substr(start, --alreadyCount);
					}
					measuredWith = this.ctx.measureText(text).width;
				}
				start += text.length;
				// 如果是最后一行了，发现还有未绘制完的内容，则加...
				if (i === lines - 1 && start < view.text.length) {
					while (this.ctx.measureText(`${text}...`).width > width) {
						console.log(3);
						if (text.length <= 1) {
							// 如果只有一个字符时，直接跳出循环
							break;
						}
						text = text.substring(0, text.length - 1);
					}
					text += '...';
					measuredWith = this.ctx.measureText(text).width;
				}
				
				this.ctx.fillText(text, 0, 0, 375);
				console.log(text, this.ctx.measureText(text).width);

				result += text;
				
			}
			this.ctx.setStrokeStyle('red')
			this.ctx.strokeRect(10, 10, 150, 75)
			this.ctx.draw();
			return result;

			
		}



    }
})