var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var ringChart = null;
Page({
    data: {
    },
    touchHandler: function (e) {
        console.log(ringChart.getCurrentDataIndex(e));
    },
    updateData: function () {
        ringChart.updateData({
            title: {
                name: '80%'
            },
            subtitle: {
                color: '#ff0000'
            }
        });
    },     
    onReady: function (e) {
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        ringChart = new wxCharts({
            animation: true,
            canvasId: 'ringCanvas',
            type: 'ring',
            width:320,
            extra: {
                ringWidth: 55,
                pie: {
                    // offsetAngle: -45
                }
            },
            series: [{
                name: '成交量1',
                data: 1,
                stroke: false,
                color:"#28aa6f"
            }, {
                name: '成交量2',
                data: 1,
                 stroke: false,
                 color: "#4ec89a"
            }, {
                name: '成交量3',
                data: 1,
                stroke: false,
                color: "#28aa6f"
            }, {
                name: '成交量4',
                data: 150,
                 stroke: false,
                 color: "#4ec89a"
            }],
            disablePieStroke: false,
            width: windowWidth,
            height: 400,
            dataLabel: true,
            legend: true,
            background: '#f5f5f5',
            padding: 0,
            dataPointShape:true
        });
        ringChart.addEventListener('renderComplete', () => {
            console.log('renderComplete');
        });
        setTimeout(() => {
            ringChart.stopAnimation();
        }, 500);
    }
});