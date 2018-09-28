// pages/searchTest/searchTest.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        step:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    numChange(e) {
        let detail = e.detail;

        // detail 中的字段为：
        // isAchieveLimit:false   是否这一次操作后，num的值是否已经到达了临界值
        // oldValue:1             旧值
        // type:"add"             类型：add为数值增加，reduce为减少
        // value:2                目前的num值。
        console.log(detail.value,detail);
    },
    setStep() {
        this.setData({
            step:2
        })
        
        let spinner = this.selectComponent("#spinner");
        console.log(spinner.getNumValue());
    }
})