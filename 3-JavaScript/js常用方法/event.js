var EventUtil={
	
	add:function(el,type,fn){/*添加事件*/
				/*为了兼容IE8*/
	el.listeners = el.listeners || {};
	el.listeners[type]=el.listeners[type] || [];
		if(el.addEventListener){
			el.addEventListener(type,fn,false);
				el.listeners[type].push(fn);
			}
		else if(el.attachEvent){
			el[fn]=function(){
				fn.call(el,window.event);
				}
			el.attachEvent('on'+type,el[fn]);
				el.listeners[type].push(el[fn]);
		}
		else{
		element["on" + type] = handler;	
		}
		},
	remove:function(el, type, fn){/*移除事件*/
 if(el.removeEventListener){
            el.removeEventListener(type, fn, false);
        }else if(el.detachEvent){
            el.detachEvent('on' + type, el[fn]);
        }
		else{
			element["on" + type] = null;
		}
			
			
		},
	trigger:function(el ,type){/*主动触发事件*/
        try{/*try里面的不兼容IE8,catch来兼容IE8*/
            if(el.dispatchEvent){
                var evt = document.createEvent('Event');
                evt.initEvent(type,true,true);
                el.dispatchEvent(evt);
            }else if(el.fireEvent){
                el.fireEvent('on'+type);
            }
        }catch(e){/*兼容IE8*/
			for(var i=0;i<el.listeners[type].length;i++){
		 el.listeners[type][i]();
	}
			};
    
		},
getEvent:function(event){/*兼容事件event*/
    return event ? event : window.event;
  },
  getTarget: function(event){/*兼容目标target*/
    return event.target || event.srcElement;
  },
  preventDefault: function(event){ /*阻止默认方法*/
    if (event.preventDefault){
        event.preventDefault();
    }else{
        event.returnValue = false;
    }
  },
 stopPropagation: function(event){/*阻止冒泡*/
    if (event.stopPropagation){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
  },
 delegate:function(mousetype,parent,fn){/*事件委托*/
	parent[mousetype]=function(ev){
		var ev=ev||window.event;
		var target=ev.target||ev.srcElement;
		if(target.nodeName!=parent.nodeName){
		fn && fn.call(target);
		}
		}
},
getPageX:function(event){
	return event.pageX=event.pageX?event.pageX:(event.clientX+getScrollLeft());
	},
getPageY:function(event){
	return event.pageY=event.pageY?event.pageY:(event.clientY+getScrollTop());
},
getScrollLeft:function(){
	return document.body.scrollLeft() || document.documentElement.scrollLeft();
	},
getScrollTop:function(){
	return document.body.scrollTop() || document.documentElement.scrollTop();
},
getWheelDelta:function(event){/*兼容火狐谷歌IE当等于120时候向上当等于-120时候向下滚动*/
	if(event.wheelDelta){
		return event.wheelDelta;
	}else{
		return -event.detail*40;
	}
	
	}
	}
	