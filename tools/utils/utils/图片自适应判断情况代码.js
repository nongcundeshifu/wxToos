// 关于图片的裁剪自适应的情况分析，如果要适配微信小程序的image的aspectFill模式，可以使用以下判断方式：

view.sWidth  图片宽度
view.sHeight  图片高度

width  canvas中需要绘制图片的区域的宽度
height  canvas中需要绘制图片的区域的高度





// canvas宽高比例
const cWH = width / height;
// img宽高比例
const imgWH = view.sWidth / view.sHeight;




// if (width > height) {

// 	// 按比例来判断
// 	if (cWH > imgWH) {
// 		// 以宽为准，高裁剪
// 	}
// 	else {
// 		// 以高为准，宽裁剪
// 	}
// }
// else {
// 	// 按比例来判断
// 	if (cWH > imgWH) {
// 		// 以宽为准，高裁剪

// 	}
// 	else {
// 		// 以高为准，宽裁剪
// 	}
// }



// 按比例来判断，直接用以上可以总结出来得出
if (cWH > imgWH) {
    // 以宽为准，将高裁剪，即可保持比例
    rHeight = Math.round((view.sWidth / width) * height);
    rWidth = view.sWidth;


}
else {
    // 以高为准，将宽裁剪，即可保持比例
    rWidth = Math.round((view.sHeight / height) * width);
    rHeight = view.sHeight;
}

rWidth  计算出原图需要绘制部分的图片的宽度
rHeight  计算出原图需要绘制部分的图片的高度


// 设置上下或者左右的位置偏移量，以对准中心点。
if (view.sWidth > rWidth) {
    startX = Math.round((view.sWidth - rWidth) / 2);
}
if (view.sHeight > rHeight) {
    startY = Math.round((view.sHeight - rHeight) / 2);
}

// 绘制
this.ctx.drawImage(view.url, startX, startY, rWidth, rHeight, -(width / 2), -(height / 2), width, height);
