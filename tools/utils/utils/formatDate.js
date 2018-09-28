

/**
 * @file 关于日期的一些工具
 * @author 农村的师傅 <2556434564@qq.com>
 * @copyright 版权归农村的师傅所有
 * @version 1.0
*/

// 内部方法

/**
 * @desc 将小于9的数字，在前面添加个0，如：6 => 06
 * @param {number} num
 * @return {number}
*/
const __formatNumber = num => {
    num = num.toString();
    return num[1] ? num : '0' + num;
}
/**
 * @desc 转换日期，这是添加一个保险.
 * @desc 不过，这里是否需要抛出一个错误，在其他api调用时，如果无法转换，那么程序会报错，是否有必要。
*/
const __getDate = (any) => {
    let _date = new Date(date);
    if(_date == 'Invalid Date') {
        throw new TypeError('日期转换失败，格式有误');
    }
    return _date;

}

/**
 * @desc 根据指定字符连接出日期字符串
 * @param {Date} date 日期对象，或者可以转换成日期对象的字符串或者时间戳
 * @param {string} [connectionStr = '/'] 一个连接的字符串。支持 / 或者 -
 * @return {string} 一个日期的字符串
*/
const __formatDate = (date,connectionStr = '/') => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(__formatNumber).join(connectionStr);
}

/**
 * @desc 根据日期返回连接的时间字符串
 * @param {Date} date 日期对象，或者可以转换成日期对象的字符串或者时间戳
 * @return {string} 一个时间的字符串，格式为 HH:MM:SS
 */
const __formatTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(__formatNumber).join(':');
}



// api接口

/**
 * 判断是否是一个日期，或者是否可以转换为日期。
 * @param {Date} date 一个待判断的参数
 * @return {Boolean} 判断结果
*/

const isToDate = (date) => {
    try {
        __getDate(date);
        return true;
    } catch(err) {
        return false;
    }
}
/**
 * @desc 格式化日期
 * @param {Date} date 一个js日期对象
 * @format {string} format 需要返回的日期的格式
 * @desc 比如,返回格式有：yyyy-MM-dd HH:MM:SS yyyy/MM/dd HH:MM:SS
 * @desc yyyy-MM-dd yyyy/MM/dd yyyy-MM yyyy/MM MM-dd MM/dd
 * @desc HH:MM:SS HH:MM
 * @return {string} 一个指定格式的日期字符串。
*/
const formatTime = (date,format = 'yyyy/MM/dd HH:MM:SS') => {
    const _date = __getDate(date);
    let formatStr = '';
    switch (format) {
        case 'yyyy/MM/dd HH:MM:SS': {
            formatStr = __formatDate(_date,'/') + ' ' + __formatTime(_date);
            break;
        }
        case 'yyyy-MM-dd HH:MM:SS': {
            formatStr = __formatDate(_date,'-') + ' ' + __formatTime(_date);
            break;
        }
        case 'yyyy/MM/dd': {
            formatStr = __formatDate(_date,'/');
            break;
        }
        case 'yyyy-MM-dd': {
            formatStr = __formatDate(_date,'-');
            break;
        }
        case 'yyyy/MM': {
            formatStr = __formatDate(_date,'/').slice(0,-3);
            break;
        }
        case 'yyyy-MM': {
            formatStr = __formatDate(_date,'-').slice(0,-3);
            break;
        }
        case 'MM/dd': {
            formatStr = __formatDate(_date,'/').slice(0,3);
            break;
        }
        case 'MM-dd': {
            formatStr = __formatDate(_date,'-').slice(0,3);
            break;
        }
        case 'HH:MM:SS': {
            formatStr = __formatTime(_date);
            break;
        }
        case 'HH:MM': {
            formatStr = __formatTime(_date).slice(0,-3);
            break;
        }
        default: {
            formatStr = __formatDate(_date,'/') + ' ' + __formatTime(_date);
        }
    }


    return formatStr;

}

/**
 * @desc 根据一个日期对象，获取这一天是第几周
 * @param {Date} date 一个js日期对象或者时间戳或者可转换的日期字符串
 * @return {string} 一个周期字符串（非数字）
*/
const getWeek = date => {
    let _date = __getDate(date);
    return "日一二三四五六".charAt(_date.getDay());
}

/**
 * @desc 获取某一个月份有多少天
 * @param {Date} date 一个可以通过new Date() 方法转换为js的date对象的都可以
 * @return {number} 传入日期的那个月的天数
*/
const getMonthDay = (date) => {
    const d = __getDate(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    return new Date(year,month,0);  //其实时获取这个月的最后一天的数
}

/**
 * @desc 根据时间戳返回天小时，分和秒   micro_second ：剩余的需要倒计时的毫秒
 * @param <number> micro_second js时间戳
 * @return <object>
 * @return <number> object.day 天数
 * @return <number> object.hr  小时
 * @return <number> object.min 分钟
 * @return <number> object.sec 秒
*/
const dateFormat = function (micro_second) {
    // 总秒数
    var second = Math.floor(micro_second / 1000);


    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // return day + "天" + hr + "小时" + min + "分钟" + sec+"秒";
    return {
        day,
        hr,
        min,
        sec
    };
}

/**
 * 获此时的下一个月的第一天的毫秒的时间戳.需要formatTime函数
 * @param {Date} [date] 如果传入了date，那么以这个日期的下一个月，否则，以当前日期
 * @return {number} 下一个月的第一天的时间戳
*/
const getNextMonth = (date = new Date()) => {
    let _dateStr = __formatDate(__getDate(date));
    let _dateArr = _dateStr.split("/");
    if (_dateArr[1] == "12") {
        _dateArr[0] = (_dateArr[0] - 0) + 1;
        _dateArr[1] = 1;
    } else {
        _dateArr[1] = (_dateArr[1] - 0) + 1;
    }
    return Date.parse(new Date(_dateArr[0] + "/" + _dateArr[1] + "/" + "1"));
}




// @param
/**
 * @desc 根据传入的年份月份字符串，解析出和星期相对应的日期位置。返回为一个二维数组。
 * @desc 2018/12  2018-6  都可以
 * @param {String|timeStamp} date 年份和月份 2018/12 || 2018/12/05 或者时间戳
 * @return {Array} 二维数组，以七天为一个数组，存储一个月的天数的排版数组。
 */
const day_count = (date) => {
    let tempDay = [];
    // ios的解析日期格式会有问题，要使用/进行兼容 /2会解析出为1号。
    let dateStr = `${date.replace(/-/g,"/")}`;
    let dataArr = __formatDate(new Date(dateStr)).split("/");

    let week = __getDate(dateStr).getDay();

    // 本月前面有几个空的
    let dateDay = mGetDate(dataArr[0], dataArr[1]);
    let arrTemp = [];

    let day = 1;
    for (let j = week; j < 7; j++) {
        arrTemp[j] = {
            date: day,
            step: ""
        };
        day++;
    }
    tempDay.push(arrTemp);
    for (let i = 1; i < 6; i++) {
        let arrTemp = [];
        for (let j = 0; j < 7; j++) {
            if (day > dateDay) {
                arrTemp[j] = {
                    date: "",
                    step: ""
                };
                continue;
            }
            arrTemp[j] = {
                date: day,
                step: ""
            };
            day++;
        }
        tempDay.push(arrTemp);
    }
    if (!tempDay[5][0].date) {
        tempDay.pop();
    }
    return tempDay;
}

const dateUtils = {
    isToDate,
    formatTime,
    getWeek,
    getMonthDay,
    dateFormat,
    getNextMonth,
    day_count,
}

export default dateUtils;
