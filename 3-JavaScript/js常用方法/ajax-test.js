/*******************************************************************************************************
 *
 * 使用新API解析JSON，对解析JSON出现可能出现的异常进行了处理
 *
 *******************************************************************************************************/

/**
 * JavaScript Ajax Library v0.7
 * Copyright (c) 2010 snandy
 * Blog: http://snandy.javaeye.com/
 * QQ群: 34580561
 * Date: 2010-08-08
 *
 * 1,执行基本ajax请求,返回XMLHttpRequest
 * Ajax.request(url,{
 * 		async 	是否异步 true(默认)
 * 		method 	请求方式 POST or GET(默认)
 * 		type 	数据格式 text(默认) or xml or json
 * 		encode 	请求的编码 UTF-8(默认)
 * 		timeout 请求超时时间 0(默认)
 * 		data 	请求参数 (字符串或json)
 * 		success 请求成功后响应函数 参数为text,json,xml数据
 * 		failure 请求失败后响应函数 参数为xmlHttp, msg, exp
 * });
 *
 * 2,执行ajax请求,返回纯文本
 * Ajax.text(url,{
 * 		...
 * });
 *
 * 3,执行ajax请求,返回JSON
 * Ajax.json(url,{
 * 		...
 * });
 *
 * 4,执行ajax请求,返回XML
 * Ajax.xml(url,{
 * 		...
 * });
 */

Ajax =
function(){
	function request(url,opt){
		function fn(){}
		opt = opt || {};
		var async   = opt.async !== false,
			method  = opt.method 	|| 'GET',
			type    = opt.type 		|| 'text',
			encode  = opt.encode 	|| 'UTF-8',
			timeout = opt.timeout 	|| 0,
			data    = opt.data 		|| null,
			success = opt.success 	|| fn,
			failure = opt.failure 	|| fn;
			method  = method.toUpperCase();
		if(data && typeof data == 'object'){/*//对象转换成字符串键值对*/
			data = _serialize(data);
		}
		if(method == 'GET' && data){
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
			data = null;
        }
		var xhr = function(){
			try{
				return new XMLHttpRequest();
			}catch(e){
				try{
					return new ActiveXObject('Msxml2.XMLHTTP');
				}catch(e){
					try{
						return new ActiveXObject('Microsoft.XMLHTTP');
					}catch(e){
						failure(null,'create xhr failed',e);
					}
				}
			}
		}();
		if(!xhr){return;}
		var isTimeout = false, timer;
		if(async && timeout>0){
			timer = setTimeout(function(){
				xhr.abort();
				isTimeout = true;
			},timeout);
		}
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4 && !isTimeout){
				_onStateChange(xhr, type, success, failure);
				clearTimeout(timer);
			}else{}
		};
		xhr.open(method,url,async);
		if(method == 'POST'){
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=' + encode);
		}
		xhr.send(data);
		return xhr;
	}
	function _serialize(obj){
		var a = [];
		for(var k in obj){
			var val = obj[k];
			if(val.constructor == Array){
				for(var i=0,len=val.length;i<len;i++){
					a.push(k + '=' + encodeURIComponent(val[i]));
				}
			}else{
				a.push(k + '=' + encodeURIComponent(val));
			}
		}
		return a.join('&');
	}
	function _onStateChange(xhr,type,success,failure){
		var s = xhr.status, result;
		if(s>= 200 && s < 300){
			switch(type){
				case 'text':
					result = xhr.responseText;
					break;
				case 'json':
					/*// http://snandy.javaeye.com/blog/615216*/
					result =function(str){
						try{

							return JSON.parse(str);
						}catch(e){
							try{
								return (new Function('return ' + str))();
							}catch(e){
								failure(xhr,'parse json error',e);
							}
						}
					}(xhr.responseText);
				break;
				case 'xml':
					result = xhr.responseXML;
					break;
			}
			/*// text, 返回空字符时执行success
			// json, 返回空对象{}时执行suceess，但解析json失败，函数没有返回值时默认返回undefined*/
			typeof result !== 'undefined' && success(result);

			/*//请求超时，调用abort后xhr.status为0，但不知为0时是否还有其它的情况*/
		}else if(s===0){
			failure(xhr,'request timeout');
		}else{
			failure(xhr,xhr.status);
		}
		xhr = null;
	}
	return (function(){
		var Ajax = {request:request}, types = ['text','json','xml'];
		for(var i=0,len=types.length;i<len;i++){
			Ajax[types[i]] = function(i){
				return function(url,opt){
					opt = opt || {};
					opt.type = types[i];
					return request(url,opt);
				}
			}(i);
		}
		return Ajax;
	})();
}();
