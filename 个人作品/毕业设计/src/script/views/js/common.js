var config = (function() {
    var serverURL = 'http://183.131.152.141:8080';
    var URL = {
        //获取手机验证码
        usr_getvcode: "/xcd/usr/getvcode",
        //用户注册
        usr_reg: "/xcd/usr/reg",
        //用户登陆
        usr_login: "/xcd/usr/login"

    };
    return {
        getURL: function(str) {
            if (URL[str]) {
                return serverURL + URL[str];
            }
        }
    }
})();
var httpHeader = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};
Vue.config.debug = true;
Vue.http.options.emulateJSON = true;


//localstorage
var DP = (function() {
        return {
            //sessionStroge
            //传入object
            strogeAll: function(obj) {
                for (var key in obj) {
                    sessionStorage.setItem(key, obj[key]);
                }
            },
            getAll:function(){
                var obj = {};
                for(var key in sessionStorage){
                    obj[key] = sessionStorage.getItem(key);
                }
                return obj;
            },
            clearUp:function(){
                for(var key in sessionStorage){
                    sessionStorage.removeItem(key);
                }
            },
            set: function(key,val) {
                sessionStorage.setItem(key, val);
            },
            get: function(key) {
                return sessionStorage.getItem(key);
            }
        }
    })();


//layout插件
var layout = (function() {
        // 渲染函数
        function render_root(template) {
            if (!document.getElementById("layout")) {
                var root = document.createElement("div");
                root.setAttribute("id", "layout");
                root.innerHTML = template
                document.body.appendChild(root, null);
            }
        }

        function render_comfirm(msg) {
            var template4comfirm = '<div class="layout-body">' +
                '<div class="layout-alert"><div class="layout-msg">' +
                '<div class="layout-icon"><span class="icon-exclamation" >!</span></div>' +
                '<p style="color:red;">' + msg + '</p></div>' +
                '<div class="layout-btn">' +
                '<button class="layout-btn-normal" id="layout-no">否</button>' +
                '<button class="layout-btn-normal" id="layout-yes">是</button>' +
                '</div></div></div>'
            render_root(template4comfirm);
        }

        function render_alert(smsg, stime) {
            var msg = smsg || "服务器繁忙，请稍后重试！",
                time = stime || 3000;
            var template4alert = '<div class="layout-body">' +
                '<div class="layout-alert"><div class="layout-msg">' +
                '<div class="layout-icon"><span class="icon-exclamation" >!</span></div>' +
                '<p style="color:red;">' + msg + '</p></div>' +
                '</div></div>'
            render_root(template4alert);
            var layout = document.getElementById("layout");
            time && setTimeout(function() {
                layout && layout.remove();
            }, time)
        }
        //添加事件函数
        function addEvent(el, type, fn) {
            el.addEventListener(type, fn, false);
        }
        return {
            // sfn 成功回调函数
            // efn 失败回调函数
            // msg 显示信息
            confirm: function(msg, sfn) {
                render_comfirm(msg);
                var errorfn = function(){
                    var layout = document.getElementById("layout");
                    layout.remove();
                }
                sfn && addEvent(document.getElementById("layout-yes"), "click", sfn);
                addEvent(document.getElementById("layout-no"), "click", errorfn);
            },
            alert: function(msg, time) {
                render_alert(msg, time);
            }
        }

    })();
