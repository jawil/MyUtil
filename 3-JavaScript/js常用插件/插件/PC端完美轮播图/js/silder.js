 function Tab(wrapID, contentID, tabID) {
        this.id = document.querySelector(wrapID);//焦点图包裹id
        this.contentID = this.id.querySelector(contentID);//** 大图域包裹id
        this.tabID = this.id.querySelector(tabID);
        ;//切换图片底部按钮
        this.index = 0;
        this.flag = true;
        this.iWidth = this.contentID.children[0].offsetWidth;
        //alert(this.iWidth);
        this.settings = {//默认参数
            auto: 1,//自动播放 1或0
            effect: 'swing',//效果配置
            eType: 'click',//**切换按钮鼠标事件
            pageBtn: true,//是否有按钮切换页码
            bns: ['.prev', '.next'],//** 前后按钮配置class
            interval: 3000,//** 停顿时间
            phone:true//是否是移动端
        }
    }
    Tab.prototype.init = function (json) {//初始化

        function extend(parent, child) {
            for (var attr in child) {
                parent[attr] = child[attr];
            }
        }
        extend(this.settings, json);
        this.tabID.children[0].style.cssText = 'background:red';//初始化第一个按钮的颜色
        if (this.settings.auto == 1) {
            this.auto();//是否自动播放
        }
        this.control();//底部图片切换按钮
        if (this.settings.pageBtn) {
            this.PrevNext();//上一张下一张按钮
        }
        if(this.settings.phone){//是否是移动端
            this.ScreenMove();
        }
		};
    Tab.prototype.auto = function () {//自动播放
        var _this = this;//超级坑,尼玛每次都忘了,定时器里面的this指向变了
        var tabBtnChild = this.tabID.children;

        this.timer = setInterval(function () {
            if (_this.settings.auto != 1) {
                return;
            }
            _this.index++;
            _this.index = _this.index === _this.contentID.children.length ? 0 : _this.index;
            Tab.doMove(_this.contentID, {left: -(_this.iWidth) * (_this.index)}, 300, 'easeIn', function () {
                _this.flag = true;
            });
            for (var i = 0; i < tabBtnChild.length; i++) {
                tabBtnChild[i].style.cssText = '';
            }
            tabBtnChild[_this.index].style.cssText = 'background:red';

        }, this.settings.interval);
    };
    Tab.prototype.control = function () {//通过底部按钮改变图片信息
        var _this = this;
        var Ta = this.tabID.children;
        /*        function delegate(mousetype,parent,fn){/!*事件委托*!/
         parent[mousetype]=function(ev){
         var ev=ev||window.event;
         var target=ev.target||ev.srcElement;
         if(target.nodeName!=parent.nodeName){
         fn && fn.call(target);
         }
         }
         }*/
        for (var i = 0; i < Ta.length; i++) {
            Ta[i].index = i;
            Ta[i][_this.settings.eType] = Ta[i]['on' + _this.settings.eType] = function () {
                for (var j = 0; j < Ta.length; j++) {
                    Ta[j].style.cssText = '';
                }
                this.style.cssText = 'background:red';
                _this.index = this.index;
                Tab.doMove(_this.contentID, {left: -(_this.iWidth) * (_this.index)}, 300, 'easeIn');
            }


        }

    };
    Tab.prototype.PrevNext = function () {//上一张下一张图片按钮
        var prev = this.id.querySelector(this.settings.bns[0]);
        var next = this.id.querySelector(this.settings.bns[1]);
        var tabBtnChild = this.tabID.children;

        var _this = this;
        prev.onclick = next.onclick = function () {
            //console.log(this.className);
            clearInterval(_this.timer);
            if (_this.flag) {
                _this.flag = false;
                // console.log(_this.flag);
                if (this.className == _this.settings.bns[0].substring(1)) {
                    _this.index--;
                    _this.index = _this.index === -1 ? _this.contentID.children.length - 1 : _this.index;
                } else {
                    _this.index++;
                    _this.index = _this.index === _this.contentID.children.length ? 0 : _this.index;
                }
                Tab.doMove(_this.contentID, {left: -(_this.iWidth) * (_this.index)}, 300, 'easeIn', function () {
                    _this.flag = true;//执行完毕后打开开关并且重新开启定时器
                    if (_this.settings.auto == 1) {
                        _this.timer = setInterval(function () {
                            _this.index++;
                            _this.index = _this.index === _this.contentID.children.length ? 0 : _this.index;
                            Tab.doMove(_this.contentID, {left: -(_this.iWidth) * (_this.index)}, 300, 'easeIn', function () {
                                _this.flag = true;
                            });
                            for (var i = 0; i < tabBtnChild.length; i++) {
                                tabBtnChild[i].style.cssText = '';
                            }
                            tabBtnChild[_this.index].style.cssText = 'background:red';
                        }, _this.settings.interval);
                    }
                });
                for (var i = 0; i < tabBtnChild.length; i++) {
                    tabBtnChild[i].style.cssText = '';
                }
                tabBtnChild[_this.index].style.cssText = 'background:red';
            }
        }

    };
    Tab.prototype.ScreenMove = function () {//移动端的滑屏功能,同步逻辑太复杂了....
        this.contentID.addEventListener('touchmove', function (event) {
            event.preventDefault();//阻止全局的默认事件
        });
        var downX = 0;
        var prevX = 0;
        var downL = 0;
        var maxLeft = this.id.offsetWidth - this.contentID.offsetWidth;
        var speed = 0;//记录滑动停下来时候的速度
        var onoff1 = true;
        var onoff2 = true;
        var onoff3 = true;
        var _this = this;
        this.contentID.addEventListener('touchstart', function (event) {
            // console.log(2);
            var touch = event.targetTouches[0];
            downX = touch.pageX;//当前鼠标焦点到屏幕可视区的距离
            prevX = touch.pageX;
            downL = this.offsetLeft;//当前元素到父级的left值
            onoff1 = true;//开始时候开关全部设置为true
            onoff2 = true;
            onoff3 = true;
            _this.settings.auto = 0;
            clearInterval(this.timer1);//养成好习惯每次开始之前清除之前的定时器
            // 把元素放在手指所在的位置
            /*          1. touches：当前位于屏幕上的所有手指的一个列表。
             2. targetTouches：位于当前DOM元素上的手指的一个列表。
             3. changedTouches：涉及当前事件的手指的一个列表。*/
            document.addEventListener('touchmove', move, false);

            function move(event) {
                onoff3 = false;
                //console.log(1);
                var touch = event.targetTouches[0];
                var iLeft = _this.contentID.offsetLeft;
                speed = touch.pageX - prevX;
                console.log(speed);
                console.log('spp');
                prevX = touch.pageX;
                if (iLeft >= 0) {//头部
                    if (onoff1) {
                        onoff1 = false;
                        downX = touch.pageX;
                    }
                    //手机上使用translate3D会触发GPU加速,提高性能,太麻烦不弄了,还是left吧
                    //_this.contentID.style.transform='translate3d('+(touch.pageX - downX)/3+'px,0,0)';
                    _this.contentID.style.left = (touch.pageX - downX) / 3 + 'px';
                } else if (iLeft < maxLeft) {//尾部
                    if (onoff2) {
                        onoff2 = false;
                        downX = touch.pageX;
                    }
                    _this.contentID.style.left = ((touch.pageX - downX) / 3 + maxLeft) + 'px';

                }
                else {
                    _this.contentID.style.left = ((touch.pageX - downX) / 3 + downL) + 'px';
                }
            }

            document.addEventListener('touchend', end, false);
            function end() {
                document.removeEventListener('touchmove', move, false);
                document.removeEventListener('touchend', end, false);
                // _this.settings.auto=1;
                if (!onoff3) {
                    clearInterval(_this.timer1);
                    _this.timer1 = setInterval(function () {
                        var iLeft = _this.contentID.offsetLeft;
                        console.log(iLeft + 'px');
                        if (Math.abs(speed) <= 1 || iLeft > 50 || iLeft < maxLeft - 50) {
                            clearInterval(_this.timer1);
                            if (iLeft >= 0) {
                                // _this.contentID.style.cssText='left:'+(0)+'px;transition:.3s;';
                                Tab.doMove(_this.contentID, {left: 0}, 300, 'easeIn');//使用运动效果过渡更协调

                            } else if (iLeft < maxLeft) {
                                // _this.contentID.style.cssText='left:'+(maxLeft)+'px;transition:.3s;';
                                Tab.doMove(_this.contentID, {left: maxLeft}, 300, 'easeIn');
                            }
                            /*_this.contentID.style.cssText = 'left:' +Math.round(Math.abs(iLeft/(_this.iWidth)))*-(_this.iWidth) + 'px;transition:1s;';*/
                            Tab.doMove(_this.contentID, {left: -Math.round(Math.abs(iLeft / (_this.iWidth))) * (_this.iWidth)}, 300, 'easeIn', function () {
                                for (var i = 0; i < _this.contentID.children.length; i++) {
                                    _this.tabID.children[i].style.cssText = '';
                                }
                                _this.tabID.children[Math.round(Math.abs(iLeft / (_this.iWidth)))].style.cssText = 'background:red';
                                _this.index = Math.round(Math.abs(iLeft / (_this.iWidth)));
                                _this.settings.auto = 1;//同步底部切换按钮和图片编号
                            });
                        } else {
                            speed *= 0.8;
                            // console.log('停');
                            // console.log(speed);
                            _this.contentID.style.cssText = 'left:' + (iLeft + speed) + 'px';
                        }
                    }, 13);
                }

            }

            return false;
        });
        _this.contentID.addEventListener('transitonend', function () {
            _this.contentID.style.transition = '';
        });

    };
    Tab.doMove = function (obj, json, times, fx, fn) {
        if (typeof times == 'undefined') {
            times = 400;
            fx = 'linear';
        }
        if (typeof times == 'string') {
            if (typeof fx == 'function') {
                fn = fx;
            }
            fx = times;
            times = 400;
        }
        else if (typeof times == 'function') {
            fn = times;
            times = 400;
            fx = 'linear';
        }
        else if (typeof times == 'number') {
            if (typeof fx == 'function') {
                fn = fx;
                fx = 'linear';
            }
            else if (typeof fx == 'undefined') {
                fx = 'linear';
            }
        }
        var iCur = {};
        for (var attr in json) {
            iCur[attr] = 0;

            if (attr == 'opacity') {
                iCur[attr] = Math.round(getStyle(obj, attr) * 100);
            }
            else {
                iCur[attr] = parseInt(getStyle(obj, attr));
            }

        }
        var startTime = now();
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var changeTime = now();
            var t = times - Math.max(0, startTime - changeTime + times);
            /*0到2000*/
            for (var attr in json) {
                var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);
                if (attr == 'opacity') {
                    obj.style.opacity = value / 100;
                    obj.style.filter = 'alpha(opacity=' + value + ')';
                }
                else {
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
            }
            else {
                return getComputedStyle(obj, false)[attr];
            }
        }

        function now() {
            return (new Date()).getTime();
        }

    }
    var Tween = {
        linear: function (t, b, c, d) { /*匀速*/
            return c * t / d + b;
        },
        easeIn: function (t, b, c, d) {  /*加速曲线*/
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) { /*减速曲线*/
            return -c * (t /= d) * (t - 2) + b;
        }

    };
