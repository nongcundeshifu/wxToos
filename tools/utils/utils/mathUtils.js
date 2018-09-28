/**
 * @file 文萌整理的数学计算工具类
 * @author
 * @copyright
 * @version 1.0
 */
let isInt = true;

const mathUtils = {
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    getAngle: function (radian) {
        var temp = 180 * radian / Math.PI;
        return temp;
    },

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    getRadian: function (angle) {
        var temp = angle / 180 * Math.PI;
        return temp;
    },

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    getRadian2: function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    },

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    getDistance: function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    },
    /**
     * 取连直线的相交点
     * @param targetPoint0
     * @param angle0
     * @param targetPoint1
     * @param angle1
     * @returns {}
     */
    getCrossPoint: function (targetPoint0, angle0, targetPoint1, angle1){
        var k0 = 0;
        var k1 = 0;
        var xValue = 0;
        var yValue = 0;

        var isExtra0 = angle0 % 180 == 0 ? 1 : angle0 % 90 == 0 ? -1 : 0;
        var isExtra1 = angle1 % 180 == 0 ? 1 : angle1 % 90 == 0 ? -1 : 0;

        (isExtra0 == 0) && (k0 = Math.tan(angle0 * Math.PI / 180));
        (isExtra1 == 0) && (k1 = Math.tan(angle1 * Math.PI / 180));

        var tmp_add = Math.abs(angle0) + Math.abs(angle1);
        if ((tmp_add == 180 && angle0 * angle1 < 0) || Math.floor(angle0) == Math.floor(angle1)) {
            return null;
        }
        if ((isExtra0 == 0) && (isExtra1 == 0)) {
            xValue = ((k0 * targetPoint0.x - targetPoint0.y) - (k1 * targetPoint1.x - targetPoint1.y)) / (k0 - k1);
            yValue = ((k0 * targetPoint1.y - targetPoint1.x * k0 * k1) - (k1 * targetPoint0.y - targetPoint0.x * k0 * k1)) / (k0 - k1);
        } else if ((isExtra0 == 0) && (isExtra1 == 1)) {
            yValue = targetPoint1.y;
            xValue = (yValue - targetPoint0.y) / k0 + targetPoint0.x;
        } else if ((isExtra0 == 0) && (isExtra1 == -1)) {
            xValue = targetPoint1.x;
            yValue = (xValue - targetPoint0.x) * k0 + targetPoint0.y;
        } else if ((isExtra0 == 1) && (isExtra1 == 0)) {
            yValue = targetPoint0.y;
            xValue = (yValue - targetPoint1.y) / k1 + targetPoint1.x;
        } else if ((isExtra0 == 1) && (isExtra1 == -1)) {
            yValue = targetPoint0.y;
            xValue = targetPoint1.x;
        } else if ((isExtra0 == -1) && (isExtra1 == 0)) {
            xValue = targetPoint0.x;
            yValue = (xValue - targetPoint1.x) * k1 + targetPoint1.y;
        } else if ((isExtra0 == -1) && (isExtra1 == 1)) {
            xValue = targetPoint0.x;
            yValue = targetPoint1.y;
        } else {
            return null;
            //trace($_x, $_y);
        }
        //trace($angle0, $angle1);
        return new egret.Point((xValue * 100) / 1000, (yValue * 1000) / 1000);
    },

    /**
     * 直线的角度
     * @param point0
     * @param point1
     * @returns {number}
     */
    getLineAngle: function (point0, point1) {
        var tmp_x = point1.x - point0.x;
        var tmp_y = point1.y - point0.y;
        var tmp_angle = Math.atan2(tmp_y, tmp_x) * 180 / Math.PI;
        return tmp_angle;
    },

    getLinePos: function (point0, point1) {
        var tmp_x = point0.x - point1.x;
        var tmp_y = point0.y - point1.y;
        var tmp_s = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
        return tmp_s;
    },

    /**
     * 直线公式，已知指定的两个点，确定一条直线
     * y = k * x + b，此函数即返回k = point.x和b = point.y
     * @param p1 一个点对象
     * @param p2 另外一个点对象
     * @return (Point) 返回直线公式的两个参数，组合成一个Point对象存储
     * */
    lineFunc: function (p1, p2){
        if (p1.x != p2.x) {
            var k = (p1.y - p2.y) / (p1.x - p2.x);
            var b = p1.y - (p1.y - p2.y) / (p1.x - p2.x) * p1.x;
            return new egret.Point(k, b);
        } else {
            return null;
        }
    },

    /**
     * 产生一个 a 到 b 之间的随机数（默认是 a 不包括 b的整数）：
     * @param a
     * @param b
     * @param isInt 是否是整数
     */
    random: function (a, b) {
        if (isInt) {
            return Math.floor(a + (b - a) * Math.random());
        } else {
            return a + (b - a) * Math.random();
        }
    }
    //     AS3波形运动:
    // public function onEnterFrame1(event:Event):void {
    // ball.y=centerScale+Math.sin(angle)*range;
    // angle+=speed;
    // }

    // 心跳:
    // public function onEnterFrame1(event:Event):void {
    // ball.scaleX=centerScale+Math.sin(angle)*range;
    // ball.scaleY=centerScale+Math.sin(angle)*range;
    // angle+=speed;
    // }

    // AS3圆心旋转:
    // public function onEnterFrame(event:Event):void {
    // ball.x=centerX+Math.cos(angle)*radius;
    // ball.y=centerY+Math.sin(angle)*radius;
    // angle+=speed;
    // }

    // 椭圆旋转:
    // public function onEnterFrame(event:Event):void {
    // ball.x=centerX+Math.cos(angle)*radiusX;
    // ball.y=centerY+Math.sin(angle)*radiusY;
    // angle+=speed;
    // }
    // 处理出界对象：
    // if ( sprite.x - sprite.width / 2 > right ||
    // sprite.x +sprite.width / 2 < left ||
    // sprite.y - sprite.height / 2 > bottom ||
    // sprite.y + sprite.height / 2 < top )
    // {
    // // 移除对象代码（或 重置对象代码）
    // }

    // 屏幕环绕出界对象：
    // if ( sprite.x - sprite.width / 2 > right ) {
    // sprite.x = left – sprite.width / 2;
    // } else if ( sprite.x + sprite.width / 2 < left ) {
    // sprite.x = right + sprite.width / 2;
    // }
    // if ( sprite.y - sprite.height / 2 > bottom ) {
    // sprite.y = top – sprite.height / 2;
    // }else if ( sprite.y + sprite.height / 2 < top ) {
    // sprite.y = sprite.y + sprite.height / 2;
    // }
    // 向鼠标旋转(或向某点旋转)
    // dx = mouseX – sprite.x; dy = mouseY – sprite.y;
    // sprite.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
    // 鼠标到Sprite之间连线
    // public function onMouseMove(event:MouseEvent):void {
    // graphics.clear();
    // graphics.lineStyle(1, 0, 1);
    // graphics.moveTo(sprite1.x, sprite1.y);
    // graphics.lineTo(mouseX, mouseY);
    // var dx:Number=sprite1.x-mouseX;
    // var dy:Number=sprite1.y-mouseY;
    // var dist:Number=int(Math.sqrt(dx*dx+dy*dy));
    // textField.text=dist.toString();
    // }
}
export default mathUtils;
