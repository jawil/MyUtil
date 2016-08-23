(function(window) {
    "use strict";
    //初始化数据的配置交换
    var extend = function(parent, child) {
        for (var attr in child) {
            parent[attr] = child[attr];
        }
    }

    function NoticeScroll() {
        this.noticeID = null;
        this.index = 0;
        this.iWidth = null;
        this.length = null;
        this.settings = {
            noticeID: '',
            auto: 1,
            interval: 3000,
            noticeText: [{
                    "src": '#',
                    "text": '1234'
                }, {
                    "src": '#',
                    "text": '4567'
                }, {
                    "src": '#',
                    "text": '899098'
                }

            ],
            effect: 'easeOut'
        }
    }

    NoticeScroll.prototype = {
        init: function(json) {
            this.render_domtree(json);
            if (this.settings.auto == 1) {
                this.autoPlay(); //是否自动播放
                console.log(1);
            }
        },
        render_domtree: function(data) {
            extend(this.settings, data);
            this.noticeID = document.querySelector(this.settings.noticeID);
            console.log('555555');
            var _this=this;
            setTimeout(function(){
                _this.length=_this.noticeID.getElementsByTagName('li').length;
            },0);

            /*this.length = this.settings.noticeText.length;
            for (var i = 0; i < this.length; i++) {
                var oA = document.createElement('a');
                oA.href = this.settings.noticeText[i].src;
                var oLi = document.createElement('li');
                oLi.innerHTML = this.settings.noticeText[i].text;
                oA.appendChild(oLi);
                this.noticeID.appendChild(oA);
            }*/
            this.iHeight = this.noticeID.getElementsByTagName('li')[0].offsetHeight;
        },
        autoPlay: function() { //自动播放
            var _this = this; //超级坑,尼玛每次都忘了,定时器里面的this指向变了
            this.autotimer = setInterval(function() {
                if (_this.settings.auto == 0) {
                    return;
                }
                _this.index++;
                _this.index = _this.index === _this.length ? 0 : _this.index;
                NoticeScroll.doMove(_this.noticeID, {
                    top: -_this.index * _this.iHeight,
                }, 300, _this.settings.effect);

            }, this.settings.interval);
        }
    };
    NoticeScroll.doMove = function(obj, json, times, fx, fn) {
        var iCur = {};
        for (var attr in json) {
            iCur[attr] = 0;

            if (attr == 'opacity') {
                iCur[attr] = Math.round(getStyle(obj, attr) * 100);
            } else {
                iCur[attr] = parseInt(getStyle(obj, attr));
            }
        }
        var startTime = now();
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var changeTime = now();
            var t = times - Math.max(0, startTime - changeTime + times);
            /*0到2000*/
            for (var attr in json) {
                var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);
                if (attr == 'opacity') {
                    obj.style.opacity = value / 100;
                    obj.style.filter = 'alpha(opacity=' + value + ')';
                } else {
                    obj.style[attr] = value + 'px';
                }
            }
            if (t == times) {
                clearInterval(obj.timer);
                if (fn) {
                    fn.call(obj);
                }
            }
        }, 13);

        function getStyle(obj, attr) {
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        };

        function now() {
            return (new Date()).getTime();
        }

    }
    var Tween = {
        linear: function(t, b, c, d) { /*匀速*/
            return c * t / d + b;
        },
        easeIn: function(t, b, c, d) { /*加速曲线*/
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) { /*减速曲线*/
            return -c * (t /= d) * (t - 2) + b;
        }

    };
    window.NoticeScroll = NoticeScroll;
})(window);
