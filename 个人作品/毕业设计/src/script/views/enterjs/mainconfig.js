require.config({
	paths:{
		jquery:"../../libs/jquery",
		swiper:"../../plugs/swiper.min",
        commonObj:"../js/commonobj"


	}
})
require(['jquery','swiper','commonObj'],function($,swiper,commonObj){
	var topSlider=new Swiper('#topSlider', {
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: true
    });
    commonObj.loadCanvas();
    $(window).scroll(commonObj.scrollHandler);
    $("#productul").on("touchmove", commonObj.scrollHandler);



})