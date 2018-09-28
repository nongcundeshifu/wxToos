"use strict";

// 他使用自定义的字符集进行编码，注意不要超出62，没有验证输入

// NB: does not validate input
exports.encode = function encode(int, charset) {
    let byCode = charset.byCode;
    if (int === 0) {
        return byCode[0];
    }

    var res = "",
        max = charset.length;
    while (int > 0) {
        res = byCode[int % max] + res;
        int = Math.floor(int / max);
    }
    return res;
};

exports.decode = function decode(str, charset) {
    var byChar = charset.byChar,
        res = 0,
        length = str.length,
        i, char;
    for (i = 0; i < length; i++) {
        char = str[i];
        res += byChar[char] * Math.pow(62, (length - i - 1));
    }
    return res;
};

// NB: does not validate input
exports.indexCharset = function indexCharset(str) {
    var byCode = {},
        byChar = {},
        length = str.length,
        i, char;
    for (i = 0; i < length; i++) {
        char = str[i];
        byCode[i] = char;
        byChar[char] = i;
    }
    return { byCode: byCode, byChar: byChar, length: length };
};
