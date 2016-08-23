// JavaScript Document
define(function(require,exports,module){


	var oChatbox = document.getElementById('chatbox');
    require('./gameFriend.js').listfriend(oChatbox);

	 var hsahDiv1 = document.getElementById('ajaxdiv');
    var oloadtext = document.getElementById("loadtext");
    var oload = document.getElementById("load");
    var oloadIco1 = document.getElementById("loadIco1");
    var oloadIco2 = document.getElementById("loadIco2");
    var iLength = 0;
    var showload = document.getElementById('loadingshow');
    var aUrl2 = ['img/1.png', 'img/2.png', 'img/3.png', 'img/4.png', 'img/5.png', 'img/6.png', 'img/7.png'];


    var aUrl = ['http://image.tianjimedia.com/uploadImages/2014/024/366EEY371J4W_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/LW9RW816SB20_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/6DX29OCAQ444_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2015/162/03/H30P7RD76E91_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/LME6775198U8_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/4167PQ839EAE_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/28CP2MM25061_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/F399H6AJ35NN_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/989A8N57143A_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/216M96WN00F7_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/ACZ7Q0M00110_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/ZL99IPZ2AIV3_1000x500.jpg',
        'http://image.tianjimedia.com/uploadImages/2014/024/16K71AEL9870_1000x500.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=472330a75366d0167e199e20a72ad498/7c3e3924ab18972baaffb3a0e7cd7b899f510abf.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=68feca526f061d957d4637304bf50a5d/b1bd3a7b02087bf4cb2ee483f3d3572c10dfcf47.jpg',
        'http://imgsrc.baidu.com/forum/w%3D580/sign=b5e1a987a2cc7cd9fa2d34d109002104/d0f1bd1001e9390138713f547aec54e736d19615.jpg'
    ];


    for (var i = 0; i < aUrl.length; i++) {
        var oImg = new Image();
        oImg.onload = function () {
            iLength++;
            oloadtext.innerHTML = parseInt(iLength / aUrl.length * 100) + "%";

            if (iLength == aUrl.length) {
                oload.style.WebkitAnimationPlayState = "paused";
                oloadIco1.style.WebkitAnimationPlayState = "paused";
                oloadIco2.style.WebkitAnimationPlayState = "paused";

                showload.style.display = 'none';
                hsahDiv1.style.display = 'block';
				 require('./indexJs.js').loadIndexShow();

                //showShop();

            }
        };
        oImg.onerror = function () {
            iLength++;
            oloadtext.innerHTML = parseInt(iLength / aUrl.length * 100) + "%";
            if (iLength == aUrl.length) {
                oload.style.WebkitAnimationPlayState = "paused";
                oloadIco1.style.WebkitAnimationPlayState = "paused";
                oloadIco2.style.WebkitAnimationPlayState = "paused";
            }
        };
        oImg.src = aUrl[i];
    }



	});
