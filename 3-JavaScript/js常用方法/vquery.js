// JavaScript Document

function bindEvent(obj,events,fn){
	if(obj.addEventListener){
		obj.addEventListener(events,function(ev){
			//fn() -> false
			//fn() -> undefined
			
			if( fn() == false ){
				ev.preventDefault();
				ev.cancelBubble = true;
			}
			
		},false);
	}
	else{
		obj.attachEvent('on'+events,function(){
			
			if( fn() == false ){
				window.event.cancelBubble = true;
				return false;
			}
			
		});
	}
}

function getByClass(oParent,sClass){
	var arr = [];
	var elems = oParent.getElementsByTagName('*');
	
	for(var i=0;i<elems.length;i++){
		if( elems[i].className == sClass ){
			arr.push( elems[i] );
		}
	}
	
	return arr;
	
}

function toArray(elems){
	var arr = [];
	for(var i=0;i<elems.length;i++){
		arr.push(elems[i]);
	}
	return arr;
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,false)[attr];
	}
}

function Vquery(vArg){
	
		this.elements = [];  //选择元素的这样一个集合
	
		//vArg : function
		switch(typeof vArg){
			case 'function':
				//window.onload = vArg;
				bindEvent(window,'load',vArg);
			break;
			case 'string':
				
				switch( vArg.charAt(0) ){
					case '#':   //id
						 this.elements.push(document.getElementById(vArg.substring(1)));
					break;
					case '.':   //class
						this.elements = getByClass(document,vArg.substring(1));
					break;
					default:  //tag
						this.elements = toArray(document.getElementsByTagName(vArg));
					break;
				}
				
			break;
			case 'object':
				if( vArg.constructor == Array ){
					this.elements = vArg;
				}
				else{
					this.elements.push( vArg );
				}
			break;
		}
	
}

Vquery.prototype.html = function(str){

	if(str){  //设置
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].innerHTML = str;
		}
	}
	else{   //获取
		return this.elements[0].innerHTML;
	}
	return this;
};
Vquery.prototype.click = function(fn){
	
	/*for(var i=0;i<this.elements.length;i++){
		bindEvent(this.elements[i],'click',fn);
	}*/
	
	this.on('click',fn);
	return this;
	
};
Vquery.prototype.mouseover = function(fn){
	
	/*for(var i=0;i<this.elements.length;i++){
		bindEvent(this.elements[i],'mouseover',fn);
	}*/
	
	this.on('mouseover',fn);
	return this;
};

Vquery.prototype.on = function(events,fn){
	
	for(var i=0;i<this.elements.length;i++){
		bindEvent(this.elements[i],events,fn);
	}
	return this;
};

Vquery.prototype.hide = function(){
	
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'none';
	}
	return this;
};

Vquery.prototype.show = function(){
	
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display = 'block';
	}
	return this;
};

Vquery.prototype.hover = function(fnOver,fnOut){
	
	this.on('mouseover',fnOver);
	this.on('mouseout',fnOut);
	return this;
};

Vquery.prototype.css = function(attr,value){
	
	if(arguments.length == 2){  //设置
		for(var i=0;i<this.elements.length;i++){
			this.elements[i].style[attr] = value;
		}
	}
	else if(arguments.length == 1){ //获取
		if(typeof attr == 'object'){
			for(var j in attr){
				for(var i=0;i<this.elements.length;i++){
					this.elements[i].style[j] = attr[j];
				}
			}
		}
		else{
			return getStyle(this.elements[0],attr);
		}
	}
	return this;
};


Vquery.prototype.attr = function(attr,value){
	
	//setAttribute
	//getAttribute
	
	if(arguments.length == 2){  //设置
		for(var i=0;i<this.elements.length;i++){
			//this.elements[i][attr] = value;
			this.elements[i].setAttribute(attr,value);
		}
	}
	else if(arguments.length == 1){ //获取
		return this.elements[0].getAttribute(attr);
	}
	return this;
};
Vquery.prototype.eq = function(num){
	return $(this.elements[num]);
};

Vquery.prototype.index = function(){
	
	var elems = this.elements[0].parentNode.children;
	
	for(var i=0;i<elems.length;i++){
		if( elems[i] == this.elements[0] ){
			return i;
		}
	}
	
};

//siblings : 获取所有兄弟节点

Vquery.prototype.find = function(sel){
	
	var arr = [];
	
	if( sel.charAt(0) == '.' ){  //class
	
		for(var i=0;i<this.elements.length;i++){
			
			arr = arr.concat(getByClass( this.elements[i] , sel.substring(1) ));
		}
	
	}
	else{   //tag
		for(var i=0;i<this.elements.length;i++){
			
			arr = arr.concat(toArray(this.elements[i].getElementsByTagName(sel)));
		}
	
	}
	
	return $(arr);
	
};


function $(vArg){
	return new Vquery(vArg);
}

$.trim = function(str){
	return str.replace(/^\s+|\s+$/g,'');
};

$.proxy = function(){};

$.makeArray = function(){};

$.inArray = function(){};

$.extend = function(json){
	
	for(var attr in json){
		$[attr] = json[attr];
	}
	
};

$.fn = {};

$.fn.extend = function(json){
	
	for(var attr in json){
		Vquery.prototype[attr] = json[attr];
	}
	
};