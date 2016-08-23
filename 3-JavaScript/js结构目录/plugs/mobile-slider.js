(function(window) { //轮播图效果
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
            this.sliderWrap = null,
            this.sliderContent = null;
            this.sliderFlag = null;
            this.index = 0;
            this.flag = true;
            this.iWidth = null;
            this.length = null;
            this.settings = {
                sliderWrap: '', //轮播图id
                auto: 1, //自动播放 1或0
                interval: 3000, //** 停顿时间
                imgurl: '' //图片地址
            }
        }
        Slider.prototype.init = function(json) { //初始化

            this.setData(json);
            if (this.settings.auto == 1) {
                this.autoPlay(); //是否自动播放
            }

            this.handleTouch();
        }
        Slider.prototype.setData = function(data) { //设置数据
            extend(this.settings, data);
            this.sliderWrap = document.querySelector(this.settings.sliderWrap);
            this.sliderContent = this.sliderWrap.getElementsByTagName('ul')[0];
            this.sliderFlag = this.sliderWrap.getElementsByTagName('ol')[0];
            this.iWidth = this.sliderContent.children[0].offsetWidth;
            this.length = this.sliderContent.children.length;
            for (var i = 0; i < this.length; i++) {
                //设置背景图
                this.sliderContent.getElementsByTagName('span')[i].style.backgroundImage = 'url(' + this.settings.imgurl[i].img + ')';
            }
        }
        Slider.prototype.autoPlay = function() { //自动播放
            var _this = this; //超级坑,尼玛每次都忘了,定时器里面的this指向变了
            this.autotimer = setInterval(function() {
                _this.index++;
                _this.index = _this.index === _this.length ? 0 : _this.index;
                setPosition(_this.sliderContent, -_this.index * _this.iWidth);
                setFocusIcon(_this.sliderFlag, _this.index);

            }, this.settings.interval);
        }

        Slider.prototype.handleTouch = function() {
            var _this = this,
                $wrap = this.sliderContent,
                touchStart,
                touchMove,
                iStartPageX,
                iScroll,
                touchEnd;
            this.sliderContent.ontouchmove = function(e) {
                e.preventDefault();
            };

            touchStart = function(e) {
                if (_this.autotimer) {
                    clearInterval(_this.autotimer);
                } //清除定时器定时器
                iStartPageX = e.changedTouches[0].pageX;
            };

            touchMove = function(e) {
                var iDis = (e.changedTouches[0].pageX - iStartPageX);
                if (_this.index == 0 || _this.index == _this.length - 1) {
                    iDis /= 2;
                }
                setPosition(_this.sliderContent, -_this.index * _this.iWidth + iDis);
            };
            touchEnd = function(e) {
                var iDis = e.changedTouches[0].pageX - iStartPageX;

                if (iDis > 0 && _this.index === 0) { //表示在头部
                    setPosition(_this.sliderContent, 0);

                }
                if (iDis < 0 && _this.index === _this.length - 1) { //表示尾部
                    setPosition(_this.sliderContent, -(_this.length - 1) * _this.iWidth);

                }
                if (iDis < 0 && _this.index != _this.length - 1) { //不在头部并且向右滑动
                    if (Math.abs(iDis) > _this.iWidth / 3) {
                        _this.index += 1;
                    }
                    setPosition(_this.sliderContent, -_this.iWidth * _this.index);
                    setFocusIcon(_this.sliderFlag, _this.index);
                }
                if (iDis > 0 && _this.index != 0) {
                    if (Math.abs(iDis) > _this.iWidth / 3) { //不在尾部并且向左滑动
                        _this.index -= 1;
                    }
                    setPosition(_this.sliderContent, -_this.iWidth * _this.index);
                    setFocusIcon(_this.sliderFlag, _this.index);
                }
                if (_this.settings.auto == 1) {
                 //开启定时器
                _this.autotimer = setInterval(function() {
                    _this.index++;
                    _this.index = _this.index === _this.length ? 0 : _this.index;
                    setPosition(_this.sliderContent, -_this.index * _this.iWidth);
                    setFocusIcon(_this.sliderFlag, _this.index);

                }, _this.settings.interval);
            }
            }

            $wrap.addEventListener("touchstart", touchStart, false);
            $wrap.addEventListener("touchmove", touchMove, false);
            $wrap.addEventListener("touchend", touchEnd, false);
        }
        window.Slider = Slider;
    }(window));
