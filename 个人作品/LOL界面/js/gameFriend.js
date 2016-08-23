// JavaScript Document
define(function(require,exports,module){
function listfriend(obj){
var oBtn=document.getElementById('zhedie');//底部我的游戏好友
var oWrap=document.getElementById("wrap");
var aDiv=oWrap.getElementsByTagName("div");	
var oMdel=document.getElementById('model');
var flagmodel='';
var bOff=true;
var flagOff=true;
var oCircle=document.getElementById('circle');
var oSearch=document.getElementById('search');
var oMin=document.getElementById('minwindow');
var oInutmin=document.getElementById('showbox');
var str=obj.innerHTML;
var b_off=false;
var iDelay=200;
var oTimer=null;
var j=0;
var bOff2=true;
oInutmin.onclick=function(){
	if(flagOff){
		/*if(b_off){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='show1';
			}
			
		}*/
		if(b_off){
		if(oBtn.value=='-'){
			if(j==aDiv.length){
			for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='show1';
			}
			}
			else{
				for(var i=0;i<j;i++){
			aDiv[i].className='show1';
			}
				

				
			}
		
}
	else{
		if(j<0){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='hide1';
			}
		}
		else{
			for(var i=j-1;i<aDiv.length;i++){
				aDiv[i].className='hide1';
			}
		}
	}
		}
		
	obj.style.display='block';
	flagOff=false;
	}else{
		/*if(b_off){
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='show1';
			}
			
		}
*/	

/*if(oBtn.value=='-'){
			for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='show1';
			}
}
	else{
		for(var i=0;i<aDiv.length;i++){
			aDiv[i].className='hide1';
			}
	}*/
	obj.style.display='none';
	flagOff=true;
	}
	/*if(b_off){
		b_off=!b_off;
	}*/
}
oMin.onclick=function(){
	obj.style.display='none';
	flagOff=true;
	}
oSearch.onfocus=function(){
	if(this.value=='筛选好友列表'){
	this.value='';
	}
	else{
	oSearch.select();
	}
	
}
oSearch.onblur=function(){
	if(this.value==''){
		this.value='筛选好友列表';
	}
}
oMdel.onfocus=function(){
	flagmodel=this.value;
	this.style.cssText="background:white;border:none;color:black";
	if(this.value=='在线'||this.value=='离线'){
	this.value='';
	}else{
		oMdel.select();
		}
	}
oMdel.onblur=function(){
	this.style.cssText='';
	if(this.value==''){
	this.value='在线';
	if(!bOff){
		this.style.color='red';
		this.value='离线';
			}
					  }
					  else{
						  if(!bOff){
		this.style.color='red';
	
			}else{
				this.style.cssText='';
			}
						  
					  }
	
	
						}
oCircle.onclick=function(){
	if(bOff){
	this.style.cssText="background:red;border:1px solid white;box-shadow:0px 0px 20px 0 red;";
	if(oMdel.value=='在线'){
	oMdel.value='离线';
	};
	oMdel.style.color='red';
	}else{
		this.style.cssText='';
		if(oMdel.value=='离线'){
	oMdel.value='在线';
		}
	oMdel.style.color='#3C9F36';
	}
	bOff=!bOff;
}

/*var iDelay=200;
var oTimer=null;
var i=0;
var bOff2=true;*/
oBtn.onclick=function()
{
	b_off=true;
	if(oTimer)
	{
		return;
	}
	if(bOff2)
	{
		j=0;
		oTimer=setInterval(function(){
			aDiv[j].className="show";
			j++;
			if(j==aDiv.length)
			{
				clearInterval(oTimer);
				oTimer=null;
				bOff2=false;
			}	
		},iDelay);
		this.value="-";
	}
	else
	{
		j=aDiv.length-1;
		this.value="+";
		oTimer=setInterval(function(){
			aDiv[j].className="hide";
			j--;
			if(j<0)
			{
				clearInterval(oTimer);
				bOff2=true;
				oTimer=null;
				
			}	
		},iDelay);
	}
};


    var oshakeDiv = document.getElementById('wrap');
    var oSpanshake = oshakeDiv.getElementsByTagName('span');//中间右侧新闻栏目3D翻转


    for (var i = 0; i < oSpanshake.length; i++) {

        oSpanshake[i].onmousemove = function (ev) {
            var ev = ev || window.event;

            var distance = ev.clientX - getLeft(this);
            if (2 * distance < this.offsetWidth) {
                this.style.transform = 'rotateY(-15deg)';
            } else {
                this.style.transform = 'rotateY(15deg)';
            }
        };

        oSpanshake[i].onmouseout = function () {
            this.style.WebkitTransform = "rotateY(0deg)";
            this.style.MozTransform = "rotateY(0deg)";
            this.style.transform = "rotateY(0deg)";
            this.style.cssText = '';
        };


        oSpanshake[i].onmouseover = function (ev) {

            this.style.color = "#FEFF00";
            var iX = ev.clientX - getLeft(this);
            this.style.transition = "0.5s";
            this.style.WebkitTransition = "0.5s";
            this.style.MozTransition = "0.5s";
            /*if(iX>this.offsetWidth/2)
             {
             this.style.WebkitTransform="rotateY(10deg)";
             this.style.MozTransform="rotateY(10deg)";
             this.style.transform="rotateY(10deg)";
             }
             else
             {
             this.style.WebkitTransform="rotateY(-10deg)";
             this.style.MozTransform="rotateY(-10deg)";
             this.style.transform="rotateY(-10deg)";
             }*/


            //alert(oDli.length);
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

	}
	exports.listfriend=listfriend;
	});