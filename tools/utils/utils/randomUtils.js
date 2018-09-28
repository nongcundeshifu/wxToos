/**
 * @file 文萌整理的关于随机数的工具
 * @author
 * @copyright
 * @version 1.0
 */
/**
 * 随机数工具类
 */
const randomUtils = {
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    limit: function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    },

    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    limitInteger: function ($from, $end) {
        return Math.round(this.limit($from, $end));
    },

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    randomArray: function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    },
    /**
     * 在一个数组中随机获取N个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    getRandomArray: function (arr, num) {
        if (arr.length < num) {
            console.warn('不能大于数组长度');
        }
        let randomArr = [];
        let masterArr = arr;
        for (var k = 0; k < num; k++) {
            var random = RandomUtils.limitInteger(0, masterArr.length - 1);
            randomArr.push(masterArr[random]);
            masterArr.splice(random, 1);
        }
        return randomArr;
    }
}
export default randomUtils;
