function ajax(opts) {
       //一.设置默认参数
       var defaults = {
           method: 'GET',
           url: '',
           data: '',
           async: true,
           cache: true,
           contentType: 'application/x-www-form-urlencoded',
           success: function() {},
           error: function() {}
       };

       //二.用户参数覆盖默认参数
       for (var key in opts) {
           defaults[key] = opts[key];
       }

       //三.对数据进行处理
       if (typeof defaults.data === 'object') { //处理 data
           var str = '';
           for (var key in defaults.data) {
               str += key + '=' + defaults.data[key] + '&';
           }
           defaults.data = str.substring(0, str.length - 1);
       }

       defaults.method = defaults.method.toUpperCase(); //处理 method

       defaults.cache = defaults.cache ? '' : '&' + new Date().getTime(); //处理 cache

       if (defaults.method === 'GET' && (defaults.data || defaults.cache)) defaults.url += '?' + defaults.data + defaults.cache; //处理 url

       //四.开始编写ajax
       //1.创建ajax对象
       var oXhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
       //2.和服务器建立联系，告诉服务器你要取什么文件,跨域的解决兼容IE7
       if ("withCredentials" in oXhr) {
           oXhr.open(defaults.method, defaults.url, defaults.async);
       } else if (typeof XDomainRequest != 'undefined') {
           oXhr = newXDomainRequest();
           oXhr.open(defaults.method, defaults.url);
       } else {
           oXhr = null;
       }
       //oXhr.open(defaults.method, defaults.url, defaults.async);
       //3.发送请求
       if (defaults.method === 'GET')
           oXhr.send(null);
       else {
           oXhr.setRequestHeader("Content-type", defaults.contentType);
           oXhr.send(defaults.data);
       }
       //4.等待服务器回应
       oXhr.onreadystatechange = function() {
           if (oXhr.readyState === 4) {
               if (oXhr.status === 200)
                   defaults.success.call(oXhr, oXhr.responseText);
               else {
                   defaults.error();
               }
           }
       };
   }
