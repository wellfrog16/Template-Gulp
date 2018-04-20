// 剧本

define([
    'jquery',
    'helper/lakers.js',
    'text!../components/block.html!strip'],
($, lakers, htmlBlock) => {
    const laker = {};

    // 挂载
    laker.mount = function() {
        if (!this.$root) {
            lakers.$root.append(htmlBlock);
            this.root = lakers.$root.find('.sys-block');
        }
    };
});
