function getOffsetT(obj)/*获取该元素到屏幕可视区最左边的距离*/
{ 
	var iTop=0; 
	while(obj)
	{
		iTop+=obj.offsetTop;
		obj=obj.offsetParent	
	} 
	return iTop; 
}
function getOffsetL(obj)/*获取该元素到屏幕可视区最上边边的距离*/
{ 
	var iLeft=0; 
	while(obj)
	{
		iLeft+=obj.offsetLeft;
		obj=obj.offsetParent;	
	} 
	return iLeft; 
} 

function getByClass(obj,sClass)/*兼容IE678的getbyclass方法*/
{
	var aRr=[];
	var aTag=obj.getElementsByTagName('*');
	for(var i=0;i<aTag.length;i++)
	{
		var aClass=aTag[i].className.split(" ");
		for(var j=0;j<aClass.length;j++)
		{
			if(aClass[j]==sClass)
			{
				aRr.push(aTag[i]);
				break;	
			}
		}
	}
	return aRr;
}