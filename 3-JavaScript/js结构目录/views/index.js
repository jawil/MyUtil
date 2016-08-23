(function() {
    var url = window.location.search; //设置或获取 href 属性中跟在问号后面的部分。
    var prodNo = url.substring(url.lastIndexOf('=') + 1, url.length); //获取url等号后面的内容
    var APP = new Vue({
        el: '#app',
        data: {
            companyList: '',
            noticeList: '',
            banners: '',
            isIE: '',
            bucket: bucket
        },
        http: httpHeader,
        ready: function() {
            this.IE();
            this.getListcobiz();
            this.getListbulletin();
            this.getBanners();
        },
        methods: {
            getBanners: function() {
                var _this = this;
                ajax({
                    url: config.getURL('listbanner'),
                    method: "POST",
                    success: function(data) {
                        var data1 = JSON.parse(data);
                        _this.banners = data1.banners;
                        setTimeout(function() {
                            new Slider().init({
                                sliderWrap: '#slider-wrap'
                            });
                        }, 0);
                    }
                });
            },
            getListcobiz: function() {
                var _this = this;
                ajax({
                    url: config.getURL('listcobiz'),
                    method: "POST",
                    success: function(data) {
                        var data1 = JSON.parse(data);
                        _this.companyList = data1.bizs;
                    }
                });
            },
            setFlag: function(companyId) {
                localStorage.setItem('adFlag', companyId);


            },
            IE: function() { //ie?
                if (!!window.ActiveXObject || "ActiveXObject" in window){
                    this.isIE=true;
                }
                else{
                   this.isIE=false;
                }
            },
            getListbulletin: function() {
                var _this = this;
                ajax({
                    url: config.getURL('listbulletin'),
                    method: "POST",
                    success: function(data) {
                        var data1 = JSON.parse(data);
                        localStorage.setItem('bulletins', data);
                        _this.noticeList = data1.bulletins;
                        setTimeout(function() {
                            new NoticeScroll().init({
                                noticeID: '#noticeList'
                            });
                        }, 0);
                    }
                });
            }
        }
    });
}());
