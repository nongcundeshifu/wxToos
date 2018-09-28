/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
/**
     * Clamps a text node.
     * @param {String} originalText. 原始的字符串。
     * @param {Object} options. Options to pass to the clamper.
     */
function clamp(select, originalText, options) {

	select = wx.createSelectorQuery().in(isComponentsObj).select(selector);


	options = options || {};

	var self = this,
		opt = {
			clamp: options.clamp || 2,
			splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '], //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
			truncationChar: options.truncationChar || '…',
			truncationHTML: options.truncationHTML
		},


		clampValue = opt.clamp,

		truncationHTMLContainer;

	if (opt.truncationHTML) {
		truncationHTMLContainer = `<text>${opt.truncationHTML}</text>`;
	}

	// 额外需要的参数:

	// 最大行数。
	let maxLines = opt.clamp;
	// 行高：rpx 
	let lineHeight = 32;
	// 最大高度
	let maxHeight = maxLines * lineHeight;


	// UTILITY FUNCTIONS __________________________________________________________



	
}
