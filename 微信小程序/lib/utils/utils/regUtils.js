/**
 * @file 文萌整理的正则工具
 * @author
 * @copyright
 * @version 1.0
 */
/**
  * 正则公用方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 先引用var RegUtils = require('../../utils/RegUtils.js');
  * RegUtils.checkEmail()
  */

const regUtils = {

	/*
	用途：检查输入的Email信箱格式是否正确
	输入：strEmail：字符串
	返回：如果通过验证返回true,否则返回false
	*/
    checkEmail: function (strEmail) {
        //var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
        var emailReg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (emailReg.test(strEmail)) {
            return true;
        }
        else {
            alert("您输入的Email地址格式不正确！");
            return false;
        }
    },

	/*
	用途：校验ip地址的格式
	输入：strIP：ip地址
	返回：如果通过验证返回true,否则返回false；
	*/
    isIP: function (strIP) {
        if (isNull(strIP)) {
            return false;
        }
        var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
        if (re.test(strIP)) {
            if (Number(RegExp.$1) < 256 && Number(RegExp.$2) < 256 && Number(RegExp.$3) < 256 && Number(RegExp.$4) < 256) {
                return true;
            }
        }
        return false;
    },

	/*
	用途：检查输入手机号码是否正确
	输入：strMobile：字符串
	返回：如果通过验证返回true,否则返回false
	*/
    checkMobile: function (strMobile) {
        if (strMobile.length != 11) {
            return false;
        }
        var regu = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        // var re = new RegExp(regu);
        if (regu.test(strMobile)) {
            return true;
        }
        else {
            return false;
        }
    },
	/*
	用途：检查输入字符串是否为空或者全部都是空格
	输入：str
	返回：如果全是空返回true,否则返回false
	*/
    isNull: function (str) {
        if (str == "") {
            return true;
        }
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
    },

	/*
	用途：检查输入对象的值是否符合整数格式
	输入：str 输入的字符串
	返回：如果通过验证返回true,否则返回false
	*/
    isInteger: function (str) {
        var regu = /^[-]{0,1}[0-9]{1,}$/;
        return regu.test(str);
    },

	/*
	用途：检查输入字符串是否符合正整数格式
	输入：s：字符串
	返回：如果通过验证返回true,否则返回false
	*/
    isNumber: function (s) {
        var regu = "^[0-9]+$";
        var re = new RegExp(regu);
        if (s.search(re) != - 1) {
            return true;
        }
        else {
            return false;
        }
    },

	/*
	用途：检查输入字符串是否符合金额格式,格式定义为带小数的正数，小数点后最多三位
	输入：s：字符串
	返回：如果通过验证返回true,否则返回false
	*/
    isMoney: function (s) {
        var regu = "^[0-9]+[\.][0-9]{0,3}$";
        var re = new RegExp(regu);
        if (re.test(s)) {
            return true;
        }
        else {
            return false;
        }
    },

	/*
	function:cTrim(sInputString,iType)
	description:字符串去空格的函数
	parameters:iType：1=去掉字符串左边的空格;2=去掉字符串左边的空格;0=去掉字符串左边和右边的空格
	return value:去掉空格的字符串
	*/
    cTrim: function (sInputString, iType) {
        var sTmpStr = ' ';
        var i = - 1;
        if (iType == 0 || iType == 1) {
            while (sTmpStr == ' ') {
                ++i;
                sTmpStr = sInputString.substr(i, 1);
            }
            sInputString = sInputString.substring(i);
        }
        if (iType == 0 || iType == 2) {
            sTmpStr = ' ';
            i = sInputString.length;
            while (sTmpStr == ' ') {
                --i;
                sTmpStr = sInputString.substr(i, 1);
            }
            sInputString = sInputString.substring(0, i + 1);
        }
        return sInputString;
    },
    /*
	用途：检查输入字符串是否有标点符合，如果有则替换为“”
	输入：s：字符串
	返回：无
	*/
    Symbol: function (text) {
        var regu = /[\ |\~|\`|\，|\。|\！|\？|\、|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
        text = text.replace(regu, "");
        return text;
    }

}
export default regUtils;
