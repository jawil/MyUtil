// JavaScript Document
define(function(require,exports,module){

    function showShop() {

        var popuUlp = document.getElementById('shopright');
        //var popuLip=popuUlp.getElementsByTagName('li');
        var popinput = popuUlp.getElementsByTagName('input');

        for (var i = 0; i < popinput.length; i++) {
            popinput[i].index = i;
            popinput[i].onclick = function () {
                var d1 = new Dialog();
                d1.init({   //配置参数
                    mark: true
                });
                d1.dragMove();
                document.getElementById('heroName').innerHTML = popuUlp.getElementsByClassName('feng')[this.index].innerHTML;
                document.getElementById('heroimg').src = popuUlp.getElementsByClassName('imgclass')[this.index].src;
                document.getElementById('heroneed').innerHTML = popuUlp.getElementsByClassName('spandj')[this.index].innerHTML;
                setLOLData();


            }

        }


        var popuUl = document.getElementById('popular');
        var popuLi = popuUl.getElementsByTagName('li');
        for (var i = 0; i < popuLi.length; i++) {
            popuLi[i].onclick = function () {
                var d1 = new Dialog();
                d1.init({   //配置参数
                    mark: true
                });
                d1.dragMove();
                document.getElementById('heroName').innerHTML = this.getElementsByTagName('span')[0].innerHTML;
                document.getElementById('heroimg').src = this.getElementsByTagName('img')[0].src;
                document.getElementById('heroneed').innerHTML = this.getElementsByTagName('p')[0].innerHTML;
                setLOLData();


            }

        }


        //简单弹窗组件的开发
        var buyUl = document.getElementById('newgoods');
        var buyLi = buyUl.getElementsByTagName('li');
        var aInput = buyUl.getElementsByTagName('input');
        for (var i = 0; i < aInput.length; i++) {
            aInput[i].index = i;
            aInput[i].onclick = function () {

                var d1 = new Dialog();

                d1.init({   //配置参数
                    mark: true
                });
                d1.dragMove();
                //获得购买组件里面各个标签的数据

                document.getElementById('heroName').innerHTML = buyLi[this.index].getElementsByTagName('p')[0].innerHTML;
                document.getElementById('heroimg').src = buyLi[this.index].getElementsByTagName('img')[0].src;
                document.getElementById('heroneed').innerHTML = buyLi[this.index].getElementsByTagName('span')[0].innerHTML;
                setLOLData();


            }


        }


        function setLOLData() {//购买商品时候调用
            var oId = document.getElementById('flagp');
            var oMess = document.getElementById('usemoney');
            var useobtn = document.getElementById('obt_buy');
            var divId = document.getElementById('divId');
            var ofinsh = document.getElementById('finshbuy');
            var nowspan = document.getElementById('nowdianjuan');
            //oId.style.backgroundColor='red';
            nowspan.innerHTML = document.getElementById('mydianjuan').value;

            var needspan = document.getElementById('needdj');
            var neednumber = document.getElementById('heroneed').innerHTML.substring(3);
            needspan.innerHTML = neednumber;

            var extraspan = document.getElementById('extradj');
            var extranumber = parseInt(nowspan.innerHTML) - parseInt(needspan.innerHTML);
            extraspan.innerHTML = extranumber;
            if (extranumber >= 0) {
                oId.style.backgroundColor = '#222A40';
                oMess.style.border = '1px solid #222A40';
                useobtn.style.background = 'url(img1/35.png) no-repeat 80px #091D34';
                useobtn.style.cursor = 'pointer';//直接利用css实现  input:enabled{}来实现
                useobtn.disabled = false;

            }
            useobtn.onclick = function () {

                document.getElementById('mydianjuan').value = extraspan.innerHTML;
                divId.innerHTML = '<h1 style="color:#FFFF00">购买物品成功!</h1><br/><span style="color:white;font-size:14px;">恭喜你已经获得一个可以永久使用的皮肤.你可以在每局游戏英雄选择时挑选使用.</span><input style="margin-left:200px;margin-top:380px;width:85px;height:40px;color:white;background:#091D34;border:1px solid #4D4D4D;cursor:pointer"  id="finshbuy" type="button" value="完成"/>';

                var ofinsh = document.getElementById('finshbuy');
                var oMask = document.getElementById('mark');
                ofinsh.onclick = function () {
                    document.body.removeChild(divId);
                    document.body.removeChild(oMask);
                }
            }

        }

        //面向对象的弹窗组件代码

        function Dialog() {
            this.oLogin = null;
            this.disX = 0;
            this.disY = 0;
            this.leftMax = 0;
            this.topMax = 0;
            this.settings = {
                w: 530,
                h: 510,
                dir: 'center',
                title: '购买商品',
                mark: false
            };

        }

        Dialog.prototype.init = function (opt) {

            extend(this.settings, opt);
            this.create();
            this.fnClose();
            if (this.settings.mark) {
                this.createMark();
            }

        };


        Dialog.prototype.create = function () {
            this.oLogin = document.createElement('div');
            this.oLogin.className = 'login';
            this.oLogin.id = 'divId';
            this.oLogin.innerHTML = '<div class="title"><span>' + this.settings.title + '</span><p class="close">x</p></div><div class="content"></div><div id="messagediv"><p id="heroName">丧失杀手 金克斯</p><p id="heroneed" class="jinbi">点劵:6450</p><img  id="heroimg" src="img1/16.png"/></div><div id="usemoney"><p id="flagp">使用</br>点券</p><p class="usebuy">目前点券<span id="nowdianjuan" style="float:right">3000</span></p><p class="usebuy">消耗&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-<span id="needdj" style="float:right">2000</span></p><p style="border-bottom:1px dashed white;" class="usebuy"><p><p class="usebuy">余额<span id="extradj" style="float:right">1000</span></p><input id="obt_buy" disabled="disabled" type="button" value="购买"/></div>';
            document.body.appendChild(this.oLogin);
            this.setData();
        };


        Dialog.prototype.setData = function () {

            this.oLogin.style.width = this.settings.w + 'px';
            this.oLogin.style.height = this.settings.h + 'px';

            if (this.settings.dir == 'center') {
                this.oLogin.style.left = (viewWidth() - this.oLogin.offsetWidth) / 2 + 'px';
                this.oLogin.style.top = (viewHeight() - this.oLogin.offsetHeight) / 2 + 'px';
            }
            else if (this.settings.dir == 'right') {
                this.oLogin.style.left = (viewWidth() - this.oLogin.offsetWidth) + 'px';
                this.oLogin.style.top = (viewHeight() - this.oLogin.offsetHeight) + 'px';
            }

        };

        Dialog.prototype.fnClose = function () {

            var oClose = this.oLogin.getElementsByTagName('p')[0];
            var This = this;

            oClose.onclick = function () {

                document.body.removeChild(This.oLogin);

                if (This.settings.mark) {
                    document.body.removeChild(This.oMark);
                }


            };

        };

        Dialog.prototype.createMark = function () {//遮罩的生成方法

            var oMark = document.createElement('div');
            oMark.id = 'mark';

            document.body.appendChild(oMark);

            this.oMark = oMark;

            oMark.style.width = viewWidth() + 'px';
            oMark.style.height = viewHeight() + 'px';

        };


        Dialog.prototype.dragMove = function () {//拖拽的方法
            var This = this;
            this.oLogin.onmousedown = function (ev) {
                var ev = ev || event;
                This.disX = ev.clientX - This.oLogin.offsetLeft;
                This.disY = ev.clientY - This.oLogin.offsetTop;
                This.leftMax = document.documentElement.clientWidth - This.oLogin.offsetWidth;
                This.topMax = document.documentElement.clientHeight - This.oLogin.offsetHeight;
                document.onmousemove = function (ev) {
                    var L = ev.clientX - This.disX;
                    var T = ev.clientY - This.disY;
                    if (L < 0)
                        L = 0;
                    else if (L > This.leftMax)
                        L = This.leftMax;
                    if (T < 0)
                        T = 0;
                    else if (T > This.topMax)
                        T = This.topMax;
                    This.oLogin.style.left = L + 'px';
                    This.oLogin.style.top = T + 'px';
                };

                document.onmouseup = function (ev) {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };

                return false;
            }

        };

        /*function Drag(){//面向对象的拖拽

         this.oDiv=document.getElementById('div1');
         this.disX=0;
         this.disY=0;
         this.leftMax=0;
         this.topMax=0;

         }

         Drag.prototype.init=function(){
         var This=this;
         this.oDiv.onmousedown=function(ev){

         var ev=ev||event;
         This.fnDown(ev);
         return false;
         }


         }

         Drag.prototype.fnDown=function(ev){
         var This=this;
         this.disX=ev.clientX-this.oDiv.offsetLeft;
         this.disY=ev.clientY-this.oDiv.offsetTop;
         this.leftMax=document.documentElement.clientWidth-this.oDiv.offsetWidth;
         this.topMax=document.documentElement.clientHeight-this.oDiv.offsetHeight;

         document.onmousemove=function(ev){
         var ev=ev||event;
         This.fnMove(ev);
         }
         document.onmouseup=this.fnUp;
         }

         Drag.prototype.fnMove=function (ev){

         var L=ev.clientX-this.disX;
         var T=ev.clientY-this.disY;

         if(L<0)
         L=0;
         else if(L>this.leftMax)
         L=this.leftMax;
         if(T<0)
         T=0;
         else if(T>this.topMax)
         T=this.topMax;


         this.oDiv.style.left=L+'px';
         this.oDiv.style.top=T+'px';



         }

         Drag.prototype.fnUp = function(){
         document.onmousemove = null;
         document.onmouseup = null;
         }
         */
        function extend(obj1, obj2) {
            for (var attr in obj2) {
                obj1[attr] = obj2[attr];
            }
        }

        function viewWidth() {
            return document.documentElement.clientWidth;
        }

        function viewHeight() {
            return document.documentElement.clientHeight;
        }

        function scrollY() {  //滚动条高度
            return document.documentElement.scrollTop || document.body.scrollTop;
        }

        //游戏商城的JavaScript特效代码
        var oBtn = document.getElementById('shopping');
        var shopDiv = document.getElementById('ajaxdiv');
        var showindex = document.getElementById('icno');
        var showspan1 = document.getElementById('showspan');
        showindex.onmouseover = function () {
            showspan1.style.display = 'block';
        };
        showindex.onmouseout = function () {
            showspan1.style.display = 'none';
        };


        var oUl8 = document.getElementById('jptj');

        var oLi8 = oUl8.getElementsByTagName('li');

        var oDiv8 = document.getElementById('ajax2');

        //var oLi=document.querySelectorAll('#ul li');
        for (var i = 0; i < oLi8.length; i++) {
            oLi8[i].index = i;
            oLi8[i].onclick = function () {
                for (var i = 0; i < oLi8.length; i++) {
                    oLi8[i].style.cssText = '';
                }

                this.style.cssText = 'color:red;border-right:none;opacity:1';
                //打开浏览器
            }
        }
        var scrollDiv = document.getElementById('goodslist');//整个div的高度
        var scrollUl = document.getElementById('newgoods');//Ul的高度

        var scrollScro = document.getElementById('definescroll');//滚动条的高度
        var scrollSpan = scrollScro.getElementsByTagName('span')[0];//滚轮标志的高度

        var iMaxTop = scrollScro.offsetHeight - scrollSpan.offsetHeight;
        //alert(srollSpan.offsetTop);

        var imin = scrollSpan.offsetTop;
        scrollSpan.onmousedown = function (ev) {
            var ev = ev || event;
            var disY = ev.clientY - this.offsetTop;

            document.onmousemove = function (ev) {

                var ev = ev || event;
                var T = ev.clientY - disY;
                if (T < 0) {
                    T = 0;
                }
                else if (T > iMaxTop) {
                    T = iMaxTop;
                }

                scrollSpan.style.top = T + 'px';
                var iScale = T / iMaxTop;

                scrollUl.style.top = (scrollDiv.offsetHeight - scrollUl.offsetHeight) * iScale + 'px';
            };


            document.onmouseup = function () {

                document.onmousemove = document.onmouseup = null;

            };

            return false;


        };

        var bgmimg11 = document.getElementById('bgmimg1');
        var bgmimg22 = document.getElementById('bgmimg2');

        bgmimg22.onmouseover = bgmimg11.onmouseover = function () {
            this.getElementsByTagName('span')[0].style.display = 'block';

        };

        bgmimg22.onmouseout = bgmimg11.onmouseout = function () {
            //alert(1);
            this.getElementsByTagName('span')[0].style.display = 'none';

        };

        scrollScro.onmousewheel = scrollSpan.onmousewheel = scrollDiv.onmousewheel = fn;//滚轮的效果.兼容火狐,IE,Chrome

        if (scrollDiv.addEventListener) {
            scrollDiv.addEventListener('DOMMouseScroll', fn, false);
        }
        else if (scrollScro.addEventListener) {
            scrollScro.addEventListener('DOMMouseScroll', fn, false);
        }
        else if (scrollSpan.addEventListener) {
            scrollSpan.addEventListener('DOMMouseScroll', fn, false);
        }

        function fn(ev) {

            var ev = ev || event;

            var b = true;

            if (ev.wheelDelta) {
                b = ev.wheelDelta > 0 ? true : false;
            } else {
                b = ev.detail < 0 ? true : false;
            }


            if (b) {
                var speed = scrollSpan.offsetTop - 10;

                if (speed < 0) {

                    speed = 0;

                }
                scrollSpan.style.top = speed + 'px';

                var iScale = speed / iMaxTop;
                //alert(iScale);
                scrollUl.style.top = (scrollDiv.offsetHeight - scrollUl.offsetHeight) * iScale + 'px';
            } else {
                var speed = scrollSpan.offsetTop + 10;

                if (speed > iMaxTop) {

                    speed = iMaxTop;

                }
                scrollSpan.style.top = speed + 'px';


                var iScale = speed / iMaxTop;
                //alert(iScale);
                scrollUl.style.top = (scrollDiv.offsetHeight - scrollUl.offsetHeight) * iScale + 'px';
            }

            if (ev.preventDefault) {
                ev.preventDefault();
            }

            return false;


        }


        var dicshop = document.getElementById('yuanoul');
        var dicli = dicshop.getElementsByTagName('li');
        var dicpic = document.getElementById('dicpng');
        var arrUrl1 = ['img1/6.png', 'img1/7.png', 'img1/8.png', 'img1/9.png', 'img1/10.png', 'img1/11.png', 'img1/12.png', 'img1/13.png', 'img1/14.png'];
        var numbershop = 0;
        setInterval(function () {
            numbershop++;
            numbershop = numbershop >= 9 ? 0 : numbershop;
            dicpic.src = arrUrl1[numbershop];

            for (var i = 0; i < dicli.length; i++) {
                dicli[i].style.cssText = '';
            }
            dicpic.style.opacity = '0';
            doMove(dicpic, {opacity: 100}, 2000, 'easeOutStrong');
            dicli[numbershop].style.cssText = 'border:1px solid #5599FF;color:blue';
        }, 3000);

        for (var i = 0; i < dicli.length; i++) {
            dicli[i].index = i;

            dicli[i].onclick = function () {
                numbershop = this.index;
                dicpic.src = arrUrl1[this.index];
                for (var i = 0; i < dicli.length; i++) {
                    dicli[i].style.cssText = '';
                }

                dicpic.style.opacity = '0';
                doMove(dicpic, {opacity: 100}, 2000, 'easeIn');

                this.style.cssText = 'border:1px solid #5599FF;color:blue';

            }

        }


    }
	
	exports.showShop=showShop;
});