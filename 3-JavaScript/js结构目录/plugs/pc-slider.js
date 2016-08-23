    (function(window) {
        "use strict";
        //更改轮播图位置
        var setPosition = function(obj, x) {
            obj.style["-webkit-transform"] = "translate3d(" + x + "px, 0, 0)";
            obj.style["transform"] = "translate3d(" + x + "px, 0, 0)";
        };
        //设置轮播图ICON焦点
        var setFocusIcon = function(obj, x) {
            for (var i = 0; i < obj.children.length; i++) {
                obj.children[i].className = '';
            }
            obj.children[x].className = 'current';
        };
        //初始化数据的配置交换
        var extend = function(parent, child) {
            for (var attr in child) {
                parent[attr] = child[attr];
            }
        }

        function Slider() {
            this.sliderWrap = null;
            this.sliderContent = null;
            this.sliderFlag = null;
            this.index = 0;
            this.flag = true;
            this.iWidth = null;
            this.length = null;
            this.settings = { //默认参数
                sliderWrap: '', //轮播图id
                auto: 1, //自动播放 1或0
                interval: 4000, //** 停顿时间
                imgurl: '', //图片地址
                effect: 'easeIn', //效果配置
                eType: 'click', //**切换按钮鼠标事件

            }
        }
        Slider.prototype = {
            init: function(json) {
                this.setData(json);
                if (this.settings.auto == 1) {
                    this.autoPlay(); //是否自动播放
                }
                var _this = this;
                window.onresize = function() {
                    setTimeout(function() {
                        clearInterval(_this.autotimer);
                        _this.init();
                        _this.sliderContent.style.left = '0px';
                        _this.index = 0;
                        setFocusIcon(_this.sliderFlag, _this.index);

                    }, 0);


                }
                this.click();

            },
            setData: function(data) {
                extend(this.settings, data);
                this.sliderWrap = document.querySelector(this.settings.sliderWrap);
                this.sliderContent = this.sliderWrap.querySelectorAll('ul')[0];
                this.sliderFlag = this.sliderWrap.getElementsByTagName('ol')[0];
                this.iWidth = this.sliderContent.children[0].offsetWidth;
                this.length = this.sliderContent.children.length;
            },
            render_domtree: function() {

            },
            autoPlay: function() { //自动播放
                var _this = this; //超级坑,尼玛每次都忘了,定时器里面的this指向变了
                this.autotimer = setInterval(function() {
                    if (_this.settings.auto == 0) {
                        return;
                    }
                    _this.index++;
                    _this.index = _this.index === _this.length ? 0 : _this.index;
                    Slider.doMove(_this.sliderContent, {
                        left: -_this.index * _this.iWidth
                    }, 400, _this.settings.effect);
                    setFocusIcon(_this.sliderFlag, _this.index);

                }, this.settings.interval);
            },
            click: function() {
                var oLi = this.sliderFlag.querySelectorAll('li');
                var oLength = oLi.length;
                var _this = this;
                for (var i = 0; i < oLength; i++) {
                    (function(i) {
                        oLi[i].onmouseover = function() {
                            _this.settings.auto = 0;
                            _this.index = i;
                            for (var j = 0; j < oLength; j++) {
                                oLi[j].className = '';
                            }
                            this.className = 'current';
                            Slider.doMove(_this.sliderContent, {
                                left: -i * _this.iWidth
                            }, 400, _this.settings.effect);

                        }
                        oLi[i].onmouseout = function() {
                            _this.index = i;

                            _this.settings.auto = 1;
                        }
                    })(i);
                }
            }
        };
        Slider.doMove = function(obj, json, times, fx, fn) {
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
            }

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
        window.Slider = Slider;
    })(window);
