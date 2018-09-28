/**  time:2018/7/27
 *   作者:农村的师傅
 *   功能:自己定义的事件对象模块
 */

"use strict";

// 自定义对象
const Event = function () {
    /*
    一个click就是一个item:eventItem
    eventList.click = {
        //观察者列表: function
        observerList:[],
        type:"",
        eventName:"click",
        triggerHandel:() => {},  // 事件触发时的处理函数
    }

     */
    this.eventList = {};  //事件实例对象的事件链表，里面存放着订阅的事件。
}

const EventPrototype = {

}
Event.prototype = EventPrototype;
// 初始化事件，添加注册的事件到观察者列表（事件列表）
EventPrototype.initEventList = function(eventName,eventType,callback)  {
    const self = this;  //闭包的内存泄露风险
    let eventItem = {
        observerList:[callback],
        type:eventType,
        eventName,
        triggerHandel:function(...age) {
            const observerList = this.observerList;
            const len = observerList.length;
            const event = {
                eventName:this.eventName
            }
            for(let i = 0;i<len;i++) {
                try{
                    observerList[i](event,...age);
                } catch(err) {
                    if(self.eventList.error) {
                        self.emit("error",err);
                    }
                    else {
                        // 向上继续抛出错误
                        throw err;
                    }
                }

            }
            if(this.type == "once") {
                // 只执行一次就删除。
                reomveEvent.call(self,[this.eventName]);
            }
        }
    }
    this.eventList[eventName] = eventItem;
}
EventPrototype.on = function (eventName,callback) {
    if(this.eventList[eventName]) {
        this.eventList[eventName].observerList.push(callback);
    }
    else {
        this.initEventList(eventName,"on",callback)
    }
}

EventPrototype.once = function (eventName,callback) {
    if(this.eventList[eventName]) {
        this.eventList[eventName].observerList.push(callback);
    }
    else {
        this.initEventList(eventName,"once",callback)
    }
}

EventPrototype.emit = function(eventName,...age)  {
    if(this.eventList[eventName]) {
        this.eventList[eventName].triggerHandel(...age);
    }
    else {
        console.log(eventName,"事件不存在")
    }
}





// 清除特定事件



const reomveEvent = function(eventName)  {
    if(!eventName) {
        // 删除全部
    }
    else {
        if(Object.prototype.toString.call(eventName)=='[object Array]') {
            for(let value of eventName) {
                this.eventList[value] = undefined;  // 注意，可能正在执行，所有可能有冲突要解决
            }
        }
        else {
            // 不是数组
        }
    }
}

EventPrototype.reomveEvent = reomveEvent;

// 事件异常处理


module.exports = Event;

