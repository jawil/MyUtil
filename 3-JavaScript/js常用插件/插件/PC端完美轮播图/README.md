## 轮播图插件用法:

网上轮播图好多都是Jquery写的插件,自己用原生JS面向对象写了一个轮播图插件.

```JavaScript
new Tab('wrapID',//焦点图包裹id,如果是ID,则'#wrapID',如果是class,则.wrapID
		'wrapImg', //大图域包裹id,用法同上
		'tabBtn'//底部切换按钮
		).init(
//初始化参数
		 {//默认参数
            auto: 1,//自动播放  1或0
            effect: 'swing',
            //效果配置,linear匀速,easeIn加速曲线,easeOut减速曲线
            eType: 'click',//**切换按钮鼠标事件
            pageBtn: true,//是否有按钮切换页码
            bns: ['.prev', '.next'],//** 前后按钮配置class
            interval: 3000,//** 停顿时间
            phone:true//是否是移动端,移动端支持滑屏功能
        }
);


```
##效果如如下

![show](http://i4.piimg.com/cba4bdf54d3085e8.jpg "show")