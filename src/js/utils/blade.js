define(['jquery', 'jquery.hammer'], ($) => {
    const self = {};

    self.share = () => {
        var host = 'http://test.tron-m.com/philips/saomang';

        $.ajax({
            type: 'post',
            url: 'http://www.tron-m.com/canon-wx/jssdk',
            data: { url: window.location.href, m: 'getWxConfig', jsonp: 1 },
            jsonpCallback: 'success_jsonpCallback',
            dataType: 'jsonp',
            success: function(args) {
                args = args.result;

                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: args.appId, // 必填，公众号的唯一标识
                    timestamp: args.timestamp, // 必填，生成签名的时间戳
                    nonceStr: args.nonceStr, // 必填，生成签名的随机串
                    signature: args.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                wx.ready(function() {
                    var url = document.location.href;
                    var title = '飞利浦 - 扫盲研究所';
                    var desc = '飞利浦 - 扫盲研究所';
                    var imgUrl = host + '/assets/img/main/bg.jpg';

                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl // 分享图标
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
                    });

                    wx.onMenuShareQQ({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl // 分享图标
                    });

                    wx.onMenuShareWeibo({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl // 分享图标
                    });

                    wx.onMenuShareQZone({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: url, // 分享链接
                        imgUrl: imgUrl // 分享图标
                    });
                });

                wx.error(function(res) {
                    console.log('wx has error:' + res);
                });
            }
        });
    };

    if (!window.myWorld) { window.myWorld = {}; }
    window.myWorld.blade = self;
});
