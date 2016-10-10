    ! function(window) {
        //设置轮播图ICON焦点
        var setFocusIcon = function(obj, x, iconCss) {
            for (var i = 0; i < obj.children.length; i++) {
                obj.children[i].style.cssText = iconCss;
            }
            obj.children[x].style.cssText = iconCss + 'background-color:#ee798a;';
        };
        var Tween = { //运动效果
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

        function getStyle(obj, attr) { //兼容样式
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, false)[attr];
            }
        }

        function now() { //取得当前时间戳
            return (new Date()).getTime();
        }

        function Slider(ele, json) {
            this.sliderWrap = document.querySelector(ele);
            this.sliderContent = null;
            this.sliderFlag = null; //轮播图那个小点点标志
            this.index = 0;
            this.iWidth = null;
            this.iHeight = null;
            this.length = null;
            this.iconCss = null;
            this.initSettings = json || {}; //接受最传过来的配置参数
            this.settings = { //默认参数
                sliderWrap: '', //轮播图id
                auto: 1, //自动播放 1或0
                interval: 3000, //停顿时间
                img: [], //图片地址
                effect: 'easeIn', //效果配置
                eType: 'onmouseover', //切换按钮鼠标事件

            }
            this.init();
        }


        Slider.prototype = {

            init: function() { //初始化
                this.setStyle();
                this.setImgStyle();
                if (this.settings.auto == 1) {
                    this.autoPlay(); //是否自动播放
                }
                this.eventType();
            },

            renderdDomTree: function() { //渲染js动态生成dom节点
                var self = this;
                for (var attr in this.initSettings) {
                    this.settings[attr] = this.initSettings[attr];
                }
                if (this.settings.img.length) { //如果没有图片传入则不渲染dom
                    var oUlSlider = document.createElement('ul');
                    var oUlFlag = document.createElement('ul');
                    this.settings.img.forEach(function(item, index) {
                        var oLi1 = document.createElement('li');
                        var oLi2 = document.createElement('li');
                        var oA = document.createElement('a');
                        var oImg = document.createElement('img');
                        oImg.src = item.imgsrc;
                        oA.href = item.ahref;
                        oA.appendChild(oImg);
                        oLi1.appendChild(oA);
                        oUlSlider.appendChild(oLi1);
                        oUlFlag.appendChild(oLi2);
                    });
                    this.sliderWrap.appendChild(oUlSlider);
                    this.sliderWrap.appendChild(oUlFlag);
                }
            },

            getData: function() { //设置数据
                this.renderdDomTree();
                this.sliderContent = this.sliderWrap.getElementsByTagName('ul')[0];
                this.sliderFlag = this.sliderWrap.getElementsByTagName('ul')[1];
                this.iWidth = this.sliderWrap.offsetWidth;
                this.iHeight = this.sliderWrap.offsetHeight;
                this.length = this.sliderContent.getElementsByTagName('li').length;
                this.iconCss = ' cursor:pointer;background-color:gray;width:15px;height:15px;border-radius:50%;float:left;margin:0 10px;';
            },

            setStyle: function() {
                this.getData();
                var self = this;
                var sliderLi = this.sliderContent.getElementsByTagName('li');
                var iconLi = this.sliderFlag.getElementsByTagName('li');
                //设置轮播图容器的样式
                this.sliderWrap.style.cssText = "position: relative;overflow:hidden;";
                //设置轮播图ICON焦点样式
                this.sliderFlag.style.cssText = 'padding:0;margin:0;list-style: none;position: absolute;bottom: 3%;left: 50%;margin-left: -50px';
                var iconLi = Array.prototype.slice.call(iconLi); //把类数组转换成数组
                iconLi.forEach(function(item, index) { //循坏数组
                    item.style.cssText = self.iconCss;
                });

                //设置第一个轮播图ICON焦点样式
                this.sliderFlag.children[0].style.cssText = this.iconCss + 'background-color:#ee798a;';
                //设置ul的css样式
                this.sliderContent.style.cssText =
                    'width:' + this.iWidth * this.length + 'px;' +
                    'height:' + this.iHeight + 'px;' +
                    'overflow:hidden;position:relative;top:0;left:0;margin:0;padding:0;';
                //设置li的样式
                var sliderLi = Array.prototype.slice.call(sliderLi); //把类数组转换成数组
                sliderLi.forEach(function(item, index) { //循坏数组
                    item.style.cssText =
                        'width:' + self.iWidth + 'px;' +
                        'height:' + self.iHeight + 'px;' +
                        'float:left;list-style: none;position:relative;margin:0;padding:0;';
                });

            },
            setImgStyle: function() {
                var self = this;
                var oImg = this.sliderContent.getElementsByTagName('img');
                var oImg = Array.prototype.slice.call(oImg); //把类数组转换成数组
                oImg.forEach(function(item, index) { //循坏数组,设置图片样式,等比例缩放
                    item.onload = function() {
                            var Iwidth = item.width;
                            var Iheight = item.height;
                            var rate = Iwidth / Iheight;
                            if (Iwidth >= self.iWidth || Iheight >= self.iHeight) { //如果图片原始尺寸超过容器的大小
                                if (rate >= 1) { //如果长比高大
                                    if (self.iWidth / rate <= self.iHeight) {
                                        item.style.width = (Iwidth > self.iWidth ? self.iWidth : Iwidth) + 'px';
                                        item.style.height = (Iwidth > self.iWidth ? (self.iWidth / rate) : Iheight) + 'px';

                                    } else {
                                        item.style.height = self.iHeight + 'px';
                                        item.style.width = self.iHeight * rate + 'px';
                                    }

                                } else { //如果长比高小
                                    item.style.height = (Iheight > self.iHeight ? self.iHeight : Iheight) + 'px';
                                    item.style.width = (Iheight > self.iHeight ? self.iHeight * rate : Iwidth) + 'px';

                                }
                            } else { //如果图片原始尺寸没有超过容器的大小
                                item.style.width = Iwidth + 'px';
                                item.style.height = Iheight + 'px';
                            }
                        }
                        //让图片上下垂直居中
                    item.style.cssText = "position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;";
                });
            },

            autoPlay: function() { //轮播图自动播放
                var self = this;
                this.autotimer = setInterval(function() {
                    if (self.settings.auto == 0) {
                        return;
                    }
                    self.index++;
                    self.index = self.index === self.length ? 0 : self.index;
                    Slider.doMove(self.sliderContent, {
                        left: -self.index * self.iWidth
                    }, 400, self.settings.effect);

                    setFocusIcon(self.sliderFlag, self.index, self.iconCss);

                }, this.settings.interval);

            },
            eventType: function() { //点击还是悬浮切换轮播图
                var oLi = this.sliderFlag.getElementsByTagName('li');
                var self = this;
                for (var i = 0; i < this.length; i++) {
                    ! function(i) {
                        oLi[i][self.settings.eType] = function() {
                            self.settings.auto = 0;
                            self.index = i;
                            setFocusIcon(self.sliderFlag, self.index, self.iconCss);
                            Slider.doMove(self.sliderContent, {
                                left: -i * self.iWidth
                            }, 400, self.settings.effect);

                        }
                        if (self.settings.eType === 'onmouseover') {
                            oLi[i].onmouseout = function() {
                                self.index = i;
                                self.settings.auto = 1;
                            }
                        }
                    }(i);
                }
            }
        }

        Slider.doMove = function(obj, json, times, fx, fn) { //运动框架的封装
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
        }

        window.Slider = Slider;

    }(window);
