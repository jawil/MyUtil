/*
1、插件style样式：
    #paging a {
        margin: 6px;
        text-decoration: none;
        font-size: 22px;
    }

    #paging a:hover {
        color: red;
        text-decoration: underline;
    }

    #paging span {
        font-size: 40px;
        color: blue;
        position: relative;
        top: -3px;
    }
2、插件html结构：
<div id="paging">
    </div>

3、插件用法：
page({
    id: 'paging',
    nowPage: 1,
    allPage: 30,
    callBack: function(now, all) {
        console.log('当前页:' + now + ',总共页:' + all);
    }
});
*/
(function(window) {
    function page(opt) {
        if (!opt.id)
            return false;
        var oDiv = document.getElementById(opt.id);
        var nowPage = opt.nowPage || 1;
        var allPage = opt.allPage || 5;
        var callBack = opt.callBack || function() {};
        if (nowPage >= 4 && allPage >= 6) {
            var oA = document.createElement('a');
            oA.href = '#1';
            oA.innerHTML = '首页';
            oDiv.appendChild(oA);
        }
        if (nowPage >= 2) {
            var oA = document.createElement('a');
            oA.href = '#' + (nowPage - 1);
            oA.innerHTML = '上一页';
            oDiv.appendChild(oA);
        }

        if (allPage <= 5) {
            for (var i = 1; i <= allPage; i++) {
                var oA = document.createElement('a');
                oA.href = '#' + i;
                if (nowPage == i)
                    oA.innerHTML = i;
                else
                    oA.innerHTML = '[' + i + ']';
                oDiv.appendChild(oA);
            }
        } else {
            //alert(nowPage);
            for (var i = 1; i <= 5; i++) {

                var oA = document.createElement('a');
                if (nowPage == 1 || nowPage == 2) {
                    oA.href = '#' + i;
                    if (nowPage == i) {
                        oA.innerHTML = i;
                    } else {
                        oA.innerHTML = '[' + i + ']';
                    }

                } else if ((allPage - nowPage == 0) || (allPage - nowPage == 1)) {
                    oA.href = '#' + (allPage - 5 + i);
                    if (allPage - 5 + i == nowPage) {
                        oA.innerHTML = (allPage - 5 + i);
                    } else {
                        oA.innerHTML = '[' + (allPage - 5 + i) + ']';
                    }
                } else {
                    oA.href = '#' + (nowPage - 3 + i);
                    if (i == 3) {
                        oA.innerHTML = (nowPage - 3 + i);
                    } else {
                        oA.innerHTML = '[' + (nowPage - 3 + i) + ']';
                    }

                }
                oDiv.appendChild(oA);
            }
        }
        if (allPage - nowPage >= 1) {

            if (allPage - nowPage >= 3 && allPage >= 6) {
                if (nowPage + 2 !== allPage - 1) {
                    var oSpan = document.createElement('span');
                    oSpan.innerHTML = '...';
                    oDiv.appendChild(oSpan);
                }

                var oA = document.createElement('a');
                oA.href = '#' + (allPage);
                oA.innerHTML = '[' + allPage + ']';
                oDiv.appendChild(oA);

            }
            var oA = document.createElement('a');

            oA.href = '#' + (nowPage + 1);
            oA.innerHTML = '下一页';
            oDiv.appendChild(oA);
        }

        callBack(nowPage, allPage);
        var aA = oDiv.getElementsByTagName('a');
        for (var i = 0; i < aA.length; i++) {
            aA[i].onclick = function() {
                var nowPage = parseInt(this.getAttribute('href').substring(1));
                oDiv.innerHTML = '';
                page({

                    id: opt.id,
                    nowPage: nowPage,
                    allPage: allPage,
                    callBack: callBack
                });

                return false;
            }
        }
    }

    window.page = page;
})(window);
