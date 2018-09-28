/**
 * @file 由文萌整理的二维码或条形码方法类
 * @author
 * @copyright
 * @version 1.0
 */
import barcode from './barcode';
import qrcode from './qrcode';

function convert_length(length) {
    return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height) {
    barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
}

function qrc(id, code, width, height) {
    qrcode.api.draw(code, {
        ctx: wx.createCanvasContext(id),
        width: convert_length(width),
        height: convert_length(height)
    })
}

const code = {
    barcode: barc,
    qrcode: qrc
}
export default code;
