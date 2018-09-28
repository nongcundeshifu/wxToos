
/**
 * @file 微信小程序有关于金额的一些工具，比如保留两位小数，校验金额格式之类的
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有 2018/8/31
 * @version 1.0
 */



/**
 * 强制保留两位小数的方法(网络)
 * @param {number|string} x 一个数字字符串或者一个数字
 * @return {number} 强制保留两位小数的数字
 */
const changeTwoDecimal = (x) => {
    var f_x = parseFloat(x);
    if (f_x !== f_x) {
        return NaN;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}



/**
 * @desc 手机金额校验,金额验证函数，最多两位小数.并且或者转换成可用金额.input要使用带小数点的键盘
 * @desc 这个函数是在用户输入每次input事件触发时的校验
 * @param {number|string} price 一个金额数字或者金额字符串
 * @return {number} 转换后的金额数字
 */
const checkInputMoney = function (price) {
    // parseFloat(15.)  => 15
    // parseFloat(.15)  => 0.15
    const regexp = /^[0-9]+[.]?[0-9]*$/i;  // 金额正则  0.15  15.  15都可以

    if (price == '.') {
        return '0.';
    }
    if (!regexp.test(price)) {
        return '';
    }
    let priceArr = (price + '').split('.');

    // 只留下两位小数
    if (priceArr[1] && priceArr[1].length > 0) {
        if (priceArr[1].length > 2) {
            priceArr[1] = priceArr[1].substring(0, 2);
        }
    }
    let result = priceArr[0] + (price.indexOf(".") > 0 ? '.' : '') + (priceArr[1] ? priceArr[1] : '');
    if (result > 0.01) {
        return result;
    } else {
        return ''
    }

}
//
//
/**
 * 这个函数是在点击提交金额时的校验,并转换为数值。如果返回false 则表明金额输入有误
 * @param {number|string} price 待校验的金额数字或者字符串。
 * @return {number|boolean} 如果是false，则不符合金额格式，如果 非全等 的false则金额是符合格式的。
 */
const checkMoney = function (price) {
    const regexp = /^[0-9]+[.]?[0-9]*$/i;

    // 要么为0  要么金额不匹配。
    if (price == '0.' || !regexp.test(price) || price == 0) {
        return false;
    }

    return parseFloat(price);
}

// 计算费率的函数
// 计算手续费,小数四舍五入。微信就是提现时，是两位小数，且四舍五入收的手续费。最低0.1元。
// 微信是如果提现时，余额可以扣手续费，就余额扣。否则，提示余额不足，提示最大可以扣多少
// 微信充值到微信钱包则不需要手续费。
// 微信之间转账好像也不需要，有这功能再说。
// 如何保证 57*0.02 => 1.14000000000001 向上取整时是0.14（向下取整和四舍五入没有这个问题）。
// 要兼容这种情况。所以，直接*100 再保留一些位小数即可，把后面的给忽略掉。
// 不过如果是无限小数，那么就不行了。
/**
 * 计算金额费率的函数
 * @param {number|string} price 待验证的金额数字或者金额字符串
 * @param {number} poundageInterest 手续费的费率，比如：0.02
 * @param {string} [type = 'round'] 分别可选为：round | ceil | floor 含义为：四舍五入，向上取整，向下取整。
 * @param {number} [fixed = 2] 保留的小数点位数
 */
const getPoundage = (price, poundageInterest, type = 'round', fixed = 2) => {
    let result = parseFloat(price * this.data.poundageInterest * 100);

    switch (type) {
        case 'ceil':{
            result = (Math.ceil(result.toFixed(5)) / 100);
        }
        case 'floor':{
            result = (Math.floor(result)/100);
        }
        default :{
            result = (Math.round(result)/100);
        }
    }

    return parseFloat(result);
}

const moneyUtils = {
    changeTwoDecimal,
    checkInputMoney,
    checkMoney,
    getPoundage
}
export default moneyUtils;
