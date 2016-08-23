var config = (function() {
    var FormalEnvironment = 'http://api.qiqueqiao.com:8080'; //正式环境API
    var testEnvironment = 'http://test.lechiche.com:8080'; //测试环境API
    var webHost = ['www.qiqueqiao.com', 'qiqueqiao.com'];
    var getHost = window.location.host;
    Array.prototype.contains = function(obj) {//数组中是否存在一个元素
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
    var serverURL = (function() {
        if (webHost.contains(getHost)) {
            return FormalEnvironment;
        } else {
            return testEnvironment;
        }
    })();
    var URL = {
        //用户登出
        login: "/3q/usr/login",
        //注册
        reg: "/3q/usr/reg",
        //获取企业列表
        listbiz: "/3q/usr/listbiz",
        //申请互推
        puborder: "/3q/biz/puborder",
        //企业联盟查询条件
        getmetadata: "/3q/usr/getmetadata",
        //获取订单详情
        qryorder: '/3q/biz/qryorder',
        //支付订单
        payorder: '/3q/biz/payorder',
        //获取账号信息
        getinfo: '/3q/biz/getinfo',
        //取消订单
        cancelorder: '/3q/biz/cancelorder',
        //获取验证码
        getvcode: '/3q/usr/getvcode',
        //重置密码
        resetpasswd: '/3q/usr/resetpasswd',
        //完善账号信息[edit]
        upinfo: "/3q/biz/upinfo",
        //完善企业信息
        cmplinfo: "/3q/biz/cmplinfo",
        //新增标签
        addtag: '/3q/biz/addtag',
        //删除标签
        rmbiztag: '/3q/biz/rmbiztag',
        //获取标签
        querybiztag: 'querybiztag',
        //下载url
        downurl: '/3q/qiniu/downurl',
        //获取banner
        listbanner: '/3q/usr/listbanner',
        //用户获取地区
        getarea: '/3q/usr/getarea',
        //用户获取行业
        getindustry: '/3q/usr/getindustry',
        //uptoken
        uptoken: '/3q/qiniu/uptoken',
        //企业 申请企业认证
        applyauth: '/3q/biz/applyauth',
        //通过标签获取企业列表
        listbizbytag: '/3q/usr/listbizbytag',
        //获取热门标签
        queryhottag: '/3q/biz/queryhottag',
        //listfaq
        listfaq: '/3q/usr/listfaq',
        //listbulletin
        listbulletin: '/3q/usr/listbulletin',
        //listcobiz
        listcobiz: '/3q/usr/listcobiz',
        //listorder
        listorder: '/3q/biz/listorder',
        //listnotify
        listnotify: '/3q/biz/listnotify',
        //rmbiztag
        rmbiztag: '/3q/biz/rmbiztag',
        //qryorder
        qryorder: '/3q/biz/qryorder',
        //payback
        payback: '/3q/biz/payback',
        //checkusrbyname
        checkusrbyname: '/3q/usr/checkusrbyname'

    };
    return {
        getURL: function(str) {
            if (URL[str]) {
                return serverURL + URL[str];
            }
        }
    }
})()
var httpHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
   xhr: {
        'withCredentials': true
    },
    emulateJSON: true
}
Vue.config.debug = true;
var bucket = 'http://7xuqsd.com2.z0.glb.qiniucdn.com/';




Vue.filter("formatTime", function(value) {
    return value.substring(0, 10);
})
