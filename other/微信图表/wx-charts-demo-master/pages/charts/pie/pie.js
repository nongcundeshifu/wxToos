var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
                name: '成交量1成交量1成交量1成交量1成交量1',
                data: 800,
                color: "#28aa6f"
            }, {
                name: '成交量2',
                data: 1200,
                color:"#4ec89a"
            }, {
                name: '成交量3',
                data: 900,
                color: "#28aa6f"
            }, {
                name: '成交量4',
                data: 180,
                color:"#4ec89a"
            }],
            width: windowWidth,
            height: 300,
            dataLabel: true,
            disablePieStroke:false
        });
    }
});