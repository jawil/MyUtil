// JavaScript Document
define(function(require,exports,module){


    function loadIndexShow() {
        var hashA = document.getElementById('indexA');
        var hashB = document.getElementById('shopA');
        var hsahDiv1 = document.getElementById('ajaxdiv');
        var hsahDiv2 = document.getElementById('game_shop');
        var flagjs = 0;
        hashA.onclick = function () {

            var hash = this.dataset.hash;

            window.location.hash = hash;
            //hsahDiv1.style.display = 'none';
            hsahDiv2.style.display = 'none';

            if (hash == hsahDiv1.dataset.hash) {
                hsahDiv1.style.display = 'block';
            }


        };


        hashB.onclick = function () {

            var hash = this.dataset.hash;

            window.location.hash = hash;
            hsahDiv1.style.display = 'none';
            //hsahDiv2.style.display = 'none';

            if (hash == hsahDiv2.dataset.hash) {
                hsahDiv2.style.display = 'block';
                flagjs++;
            }
            if (hash == hsahDiv2.dataset.hash && flagjs == 1) {

				 require('./gameShop.js').showShop();
            }

        };

        	window.onhashchange = function(){
         window.location.reload();
         };

        var firstHash = window.location.hash.substring(1) || 'index';


        if (firstHash == hsahDiv1.dataset.hash) {
            hsahDiv2.style.display = 'none';
            hsahDiv1.style.display = 'block';

        }
        else if (firstHash == hsahDiv2.dataset.hash) {
            hsahDiv1.style.display = 'none';
            hsahDiv2.style.display = 'block';

        }


        //主界面的JavaScript特效代码
        var oUl1 = document.getElementById('faceul3');//左侧中间公告活动图片轮播特效
        var oUl2 = document.getElementById('faceul4');
        var oLi1 = oUl1.getElementsByTagName('li');
        var oLi2 = oUl2.getElementsByTagName('li');
        var iLen = oLi1.length;
        var iWidth = oLi2[0].offsetWidth;
        var number = 0;
        var timer = null;
        timer = setInterval(show, 3000);
        for (var i = 0; i < oLi1.length; i++) {
            oLi1[i].index = i;


            oLi1[i].onmouseout = function () {
                timer = setInterval(show, 3000);
            };
            oLi1[i].onmouseover = function () {
                clearInterval(timer);
                number = this.index;
                for (var i = 0; i < oLi1.length; i++) {
                    oLi1[i].style.cssText = '';
                }
                this.style.backgroundColor = '#07414E';
                this.style.color = 'white';
                startMove(oUl2, {
                    left: -this.index * iWidth
                });
            }
        }


        function show() {
            number++;
            number = number > 4 ? 0 : number;
            for (var i = 0; i < oLi1.length; i++) {
                oLi1[i].style.cssText = '';
            }
            oLi1[number].style.backgroundColor = '#07414E';
            oLi1[number].style.color = 'white';
            startMove(oUl2, {
                left: -number * iWidth
            });
        }


        var oLiHand = document.getElementById('oliHand');//底部左侧掌上英雄联盟特效
        var oImg = document.getElementById('img2');
        oLiHand.onmouseover = function () {
            oImg.style.display = 'block';
            oImg.style.zIndex = 9999;
        };
        oLiHand.onmouseout = function () {
            oImg.style.display = 'none';
        };


        var oUlhero = document.getElementById('faceul5');//底部中侧免费英雄特效
        var oLihero = oUlhero.getElementsByTagName('li');
        var oAhero = oUlhero.getElementsByTagName('a');
        for (var i = 0; i < oLihero.length; i++) {
            oLihero[i].index = i;
            oLihero[i].onmouseover = function () {

                oAhero[this.index].style.display = 'block';
            };


            oLihero[i].onmouseout = function () {

                oAhero[this.index].style.display = 'none';
            }

        }


        var oP = document.getElementById('pSpan');//底部右侧视频图片轮播特效
        var oSpan = oP.getElementsByTagName('span');
        var oGameimg = document.getElementById('gameImg');
        var arrUrl = ['img/37.png', 'img/38.png', 'img/39.png', 'img/40.png', 'img/41.png'];
        oSpan[0].style.backgroundColor = '#16DCDB';

        var time2 = null;
        var flagnumber = 0;

        time2 = setInterval(function () {
            flagnumber++;

            flagnumber = flagnumber > 4 ? 0 : flagnumber;
            for (var i = 0; i < oSpan.length; i++) {

                oSpan[i].style.cssText = '';

            }
            oGameimg.src = arrUrl[flagnumber];
            oSpan[flagnumber].style.backgroundColor = '#16DCDB';
        }, 2000);


        for (var i = 0; i < oSpan.length; i++) {
            oSpan[i].index = i;
            oSpan[i].onmouseover = function () {
                for (var i = 0; i < oSpan.length; i++) {

                    oSpan[i].style.cssText = '';


                }
                flagnumber = this.index;
                this.style.backgroundColor = '#16DCDB';
                oGameimg.src = arrUrl[this.index];
            }
        }


        var opppp = document.getElementById('oPPP');//底部右侧视频播放六边形点击特效
        var odddd = document.getElementById('trangle');
        opppp.onmouseover = odddd.onmouseove = oGameimg.onmouseover = function () {
            opppp.style.borderColor = '#43BACA';
            odddd.style.borderLeftColor = '#43BACA';
        };

        oGameimg.onmouseout = function () {
            opppp.style.cssText = '';
            odddd.style.cssText = '';
        };


        var oDul = document.getElementsByClassName('3Dmove');//中间右侧新闻栏目3D翻转
        for (var j = 0; j < oDul.length; j++) {
            var oDli8 = oDul[j].getElementsByTagName('li');

            for (var i = 0; i < oDli8.length; i++) {

                oDli8[i].onmouseleave = function () {
                    this.style.WebkitTransform = "rotateY(0deg)";
                    this.style.MozTransform = "rotateY(0deg)";
                    this.style.transform = "rotateY(0deg)";
                };


                oDli8[i].onmouseenter = function (ev) {

                    this.style.color = "red";
                    var iX = ev.clientX - getLeft(this);
                    this.style.transition = "0.5s";
                    this.style.WebkitTransition = "0.5s";
                    this.style.MozTransition = "0.5s";
                    if (iX > this.offsetWidth / 2) {
                        this.style.WebkitTransform = "rotateY(20deg)";
                        this.style.MozTransform = "rotateY(20deg)";
                        this.style.transform = "rotateY(20deg)";
                    }
                    else {
                        this.style.WebkitTransform = "rotateY(-20deg)";
                        this.style.MozTransform = "rotateY(-20deg)";
                        this.style.transform = "rotateY(-20deg)";
                    }


                    //alert(oDli.length);
                }
            }
        }


        function getLeft(obj) {
            var iLeft = 0;
            while (obj) {
                iLeft += obj.offsetLeft;
                obj = obj.offsetParent;
            }
            return iLeft
        }


        //overflow:visible;visibility:hidden;
        var oulnews = document.getElementById('faceul6');//中间右侧窗口栏滚动特效
        var oliNews = oulnews.getElementsByTagName('li');

        var odivnews = document.getElementById('news');
        var listDiv1 = document.getElementsByClassName('listnews');
        var distance = odivnews.getElementsByTagName('div')[0].offsetWidth;
        oliNews[0].style.backgroundColor = '#07414E';
        for (var i = 0; i < oliNews.length - 1; i++) {
            oliNews[i].index = i;
            oliNews[i].onmouseover = function () {

                for (var i = 0; i < oliNews.length - 1; i++) {
                    oliNews[i].style.cssText = '';

                }

                this.style.backgroundColor = '#07414E';
                this.style.color = 'white';
                doMove(odivnews, {
                    left: -this.index * distance
                }, 200, 'easeIn', function () {
                });
            }
        }



        	var listDiv=document.getElementsByClassName('listnews');//小三角形光标运动

         for(var i=0;i<listDiv.length;i++){
         var listLi=listDiv[i].getElementsByTagName('li');

         for(var j=0;j<listLi.length;j++){
         listLi[j].onmouseout=function(){
         this.getElementsByTagName('div')[0].style.cssText='';
         doMove(this.getElementsByTagName('div')[0], {
         left :0
         },100,'easeIn' ,function(){});
         }

         listLi[j].onmouseover=function(){

         this.getElementsByTagName('div')[0].style.borderLeftColor='white';
         doMove(this.getElementsByTagName('div')[0], {
         left :5
         },100,'easeIn' ,function(){});

         }
         }
         }


        var laDiv = document.getElementById('R_top');//改名卡和拉克丝轮播
        var laSpan = laDiv.getElementsByTagName('span');
        var laImg = laDiv.getElementsByTagName('img')[0];
        laSpan[0].style.backgroundColor = "#16DAD9";
        var laUrl = ['img/49.png', 'img/50.png'];
        var lanumber = 0;
        setInterval(function () {
            lanumber++;
            lanumber = lanumber > 1 ? 0 : lanumber;
            for (var i = 0; i < laSpan.length; i++) {
                laSpan[i].style.cssText = '';
            }
            laImg.src = laUrl[lanumber];
            laSpan[lanumber].style.backgroundColor = "#16DAD9";

        }, 4000);
        for (var i = 0; i < laSpan.length; i++) {
            laSpan[i].index = i;
            laSpan[i].onmouseover = function () {
                for (var i = 0; i < laSpan.length; i++) {
                    laSpan[i].style.cssText = '';
                }
                laImg.src = laUrl[this.index];
                lanumber = this.index;
                this.style.backgroundColor = '#16DAD9';
            }

        }

        var kanoul = document.getElementById('kanghan');
        var kandiv = document.getElementById('R_center1');
        var kanA = kandiv.getElementsByTagName('a');
        var kanwidth = kanoul.getElementsByTagName('li')[0].offsetWidth;
        //alert(kanwidth);
        var kannumber = 0;
        kanA[0].onclick = function () {
            kannumber--;
            kannumber = kannumber < 0 ? 2 : kannumber;
            startMove(kanoul, {left: -kannumber * kanwidth});
        };

        kanA[1].onclick = function () {
            kannumber++;
            kannumber = kannumber > 2 ? 0 : kannumber;
            //alert(kannumber);
            startMove(kanoul, {left: -kannumber * kanwidth});

        };
        setInterval(function () {
            kannumber++;
            kannumber = kannumber > 2 ? 0 : kannumber;
            startMove(kanoul, {left: -kannumber * kanwidth});
        }, 2500);

        var modelOul = document.getElementById('gamemodel');
        var modelOspan = modelOul.getElementsByTagName('span');
        var modelOli = modelOul.getElementsByTagName('li');
        var modelOp = modelOul.getElementsByTagName('p');
        //alert(modelOspan[1].innerHTML);
        //alert(modelOli.length);
        //var mouseCount=true;

        for (var i = 0; i < modelOli.length; i++) {
            modelOli[i].index = i * 2 + 1;


            modelOli[i].onmouseover = function (e) {//直接用onmouseenter即可
                if (!e)
                    e = window.event;
                var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
                while (reltg && reltg != this)
                    reltg = reltg.parentNode;
                if (reltg != this) {
                    // 这里可以编写 onmouseenter 事件的处理代码
                    doMove(modelOspan[this.index], {top: -80}, 20, 'easeIn', function () {
                        doMove(this, {top: 20}, 200, 'easeOut');
                        this.onmouseover = function () {
                        };
                    });
                    doMove(modelOp[(this.index - 1) / 2], {left: -100}, 20, 'easeIn', function () {
                        doMove(this, {left: 8}, 200, 'easeOut');
                        this.onmouseover = function () {
                        };
                    });
                }


            }

        }


        //底部琴弦文字的特效
        var pianoUl = document.getElementById('pianoStyle');
        var pianoLi = pianoUl.getElementsByTagName('li');
        var pianoP = pianoUl.getElementsByTagName('p');
        var iLiHeight = pianoLi[0].offsetHeight;
        for (var i = 0; i < pianoP.length; i++) {
            var str = pianoP[i].innerHTML;
            pianoP[i].innerHTML = '';
            for (var j = 0; j < str.length; j++) {
                pianoP[i].innerHTML += '<span>' + str[j] + '</span>';
            }
            var aSpan = pianoP[i].children;

            for (var j = 0; j < aSpan.length; j++) {
                aSpan[j].style.left = aSpan[j].offsetLeft + "px";
                aSpan[j].style.top = aSpan[j].offsetTop + "px";
                aSpan[j].startTop = aSpan[j].offsetTop;
            }
            for (var j = 0; j < aSpan.length; j++) {
                aSpan[j].style.position = "absolute";
                (function (aSpan, nub2) {
                    var iStart = 0;
                    var iSpanHeight = aSpan[0].offsetHeight;
                    aSpan[nub2].onmouseover = function (ev) {
                        ev = ev || window.event;
                        iStart = ev.clientY;

                    };
                    aSpan[nub2].onmousemove = function (ev) {
                        ev = ev || window.event;
                        var iDis = ev.clientY - iStart;
                        var iNub = iDis > 0 ? 1 : -1;
                        if (this.startTop + iDis >= 0 && this.startTop + iDis < (iLiHeight - iSpanHeight)) {
                            //this.style.top=this.startTop+iDis+"px";
                            /*
                             假设 选中 8  6
                             0 0
                             1 0
                             2 0
                             3 1
                             4 2
                             5 3
                             6 4
                             7 5
                             8 6
                             9 5
                             10 4
                             11 3
                             12 2
                             13 1
                             14 0
                             15 0
                             16 0
                             。。。
                             */
                            for (var j = 0; j < aSpan.length; j++) {
                                if (Math.abs(iDis) > Math.abs(nub2 - j)) {
                                    aSpan[j].style.top = aSpan[j].startTop + (Math.abs(iDis) - Math.abs(nub2 - j)) * iNub + "px";
                                }
                                else {
                                    aSpan[j].style.top = aSpan[j].startTop + "px";
                                }
                            }
                        }
                    };
                    aSpan[nub2].onmouseout = function (ev) {
                        for (var j = 0; j < aSpan.length; j++) {
                            doMove(aSpan[j], {top: aSpan[j].startTop}, 500, "elasticOut");
                        }
                    };
                })(aSpan, j);
            }


        }


    }

	exports.loadIndexShow=loadIndexShow;
});
