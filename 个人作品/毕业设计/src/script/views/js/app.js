(function() {
    var App = Vue.extend({});
    var recommend = Vue.extend({
        template: '#recommend',
        data: function() {
            return {
                isId: false,
                username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {
            if (DP.get('id')) {
                this.$set('isId', true);
                this.$set('username', DP.get('username'));
            }
            // this.isId();
            console.log(DP.get('username'));
            console.log(this.username);
            setTimeout(function() {
                new Slider().init({
                    sliderWrap: '#ad-slider-wrap',
                    imgurl: [{
                        img: 'images/1.png'
                    }, {
                        img: 'images/2.png'
                    }, {
                        img: 'images/3.png'
                    }, {
                        img: 'images/4.png'
                    }]
                });

            }, 0);
        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {
            tiaozhuan:function(){
                window.location.href='gedan';
            }

        }



    });


    var songlist = Vue.extend({
        template: '#songlist',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {


        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });


    var host = Vue.extend({
        template: '#hoststation',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {
            new Slider().init({
                sliderWrap: '#ad-slider-wrap',
                auto: 0,
                imgurl: [{
                    img: 'images/5.png'
                }, {
                    img: 'images/5.png'
                }, {
                    img: 'images/5.png'
                }]
            });

        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });


    var rankinglist = Vue.extend({
        template: '#rankinglist',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {


        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });



    var playlist = Vue.extend({
        template: '#playlist',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {


        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });


    var discover = Vue.extend({
        template: '#discover',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {


        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });

    var index = Vue.extend({
        template: '#index',
        data: function() {
            return {
                isId: false,
                username: ''
            }
        },
        http: httpHeader,
        ready: function() {
            if (DP.get('id')) {
                this.$set('isId', true);
                this.$set('username', DP.get('username'));
            }

        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {

        }



    });

    var loadingshow = Vue.extend({
        template: '#loadingshow',
        data: function() {
            return {
                //isId: false,
                //username: '1111'
            }
        },
        http: httpHeader,
        ready: function() {
            this.loading();
        },
        computed: {
            sendData: function() {
                return {
                    mobile: this.username.data,
                    passwd: this.passwdlogin.data
                }
            }

        },
        methods: {
            loading: function() {
                var _this = this;
                var oload = document.getElementById("load");
                var oloadtext = document.getElementById("loadtext");
                var oloadIco1 = document.getElementById("loadIco1");
                var oloadIco2 = document.getElementById("loadIco2");
                var iLength = 0;
                var aUrl = [];
                for (var i = 1; i < 20; i++) {
                    var url = 'images/gedan/' + i + '.png';
                    if (i <= 4) {
                        var adurl = 'images/' + i + '.png';
                    }
                    aUrl.push(adurl);
                    aUrl.push(url);
                }
                for (var i = 0; i < aUrl.length; i++) {
                    var oImg = new Image();
                    oImg.onload = function() {
                        iLength++;
                        oloadtext.innerHTML = parseInt(iLength / aUrl.length * 100) + "%";
                        if (iLength == aUrl.length) {
                            oload.style.WebkitAnimationPlayState = "paused";
                            oloadIco1.style.WebkitAnimationPlayState = "paused";
                            oloadIco2.style.WebkitAnimationPlayState = "paused";
                            _this.$router.go('index');
                        }
                    };
                    oImg.onerror = function() {
                        iLength++;
                        oloadtext.innerHTML = parseInt(iLength / aUrl.length * 100) + "%";
                        if (iLength == aUrl.length) {
                            oload.style.WebkitAnimationPlayState = "paused";
                            oloadIco1.style.WebkitAnimationPlayState = "paused";
                            oloadIco2.style.WebkitAnimationPlayState = "paused";
                        }
                    };
                    oImg.src = aUrl[i];
                }
            }


        }



    });

    var router = new VueRouter({
        hashbang: false,
        //history:true,//html5模式去掉锚点
        saveScrollPosition: true, //记住页面的滚动位置，和html5模式下适用

        linkActiveClass: 'current'
    });

    router.map({
        '/': {
            component: loadingshow

        },
        '/index': {
            component: index,
            subRoutes: {
                '/': {
                    name: 'discover',
                    component: discover,
                    subRoutes: {
                        '/': {
                            component: recommend
                        },
                        '/recommend': {
                            name: 'recommend',
                            component: recommend
                        },
                        '/songlist': {
                            name: 'songlist',
                            component: songlist
                        },
                        '/host': {
                            name: 'host',
                            component: host
                        },
                        '/rank': {
                            name: 'rankinglist',
                            component: rankinglist
                        }
                    }
                },
                '/discover': { //可要可不要
                    name: 'discover',
                    component: discover,
                    subRoutes: {
                        '/': {
                            component: recommend
                        },
                        '/recommend': {
                            name: 'recommend',
                            component: recommend
                        },
                        '/songlist': {
                            name: 'songlist',
                            component: songlist
                        },
                        '/host': {
                            name: 'host',
                            component: host
                        },
                        '/rank': {
                            name: 'rankinglist',
                            component: rankinglist
                        }
                    }
                },
                '/playlist/:playlistID': { //跟discover路由平级
                    name: 'playlist',
                    component: playlist
                }
            }
        },
        /*'/': {//不要入场动画时候的路由配置
            component: index,
            subRoutes: {
                '/': {
                    component: discover,
                    subRoutes: {
                        '/': {
                            component: recommend
                        },
                        '/recommend': {
                            component: recommend
                        },
                        '/songlist': {
                            component: songlist
                        },
                        '/host': {
                            component: host
                        },
                        '/rank': {
                            component: rankinglist
                        }
                    }
                },
                '/discover': {
                    component: discover,
                    subRoutes: {
                        '/': {
                            component: recommend
                        },
                        '/recommend': {
                            component: recommend
                        },
                        '/songlist': {
                            component: songlist
                        },
                        '/host': {
                            component: host
                        },
                        '/rank': {
                            component: rankinglist
                        }
                    }
                },
                '/playlist/:playlistID': { //跟discover路由平级
                    name: 'playlist',
                    component: playlist
                }
            }
        },*/

    });

    /*router.map({//最原始的路由配置
        '/': {
            component: discover,
            subRoutes: {
                '/': {
                    component: recommend
                },
                '/recommend': {
                    component: recommend
                },
                '/songlist': {
                    component: songlist
                },
                '/host': {
                    component: host
                },
                '/rank': {
                    component: rankinglist
                }
            }
        },
        '/discover': {
            component: discover,
            // add a subRoutes map under /foo
            subRoutes: {
                '/': {
                    // This component will be rendered into Foo's <router-view>
                    // when /foo is matched. Using an inline component definition
                    // here for convenience.
                    component: recommend
                },
                '/recommend': {
                    // Bar will be rendered inside Foo's <router-view>
                    // when /foo/bar is matched
                    component: recommend
                },
                '/songlist': {
                    // same for Baz, but only when /foo/baz is matched
                    component: songlist
                },
                '/host': {
                    // Bar will be rendered inside Foo's <router-view>
                    // when /foo/bar is matched
                    component: host
                },
                '/rank': {
                    // same for Baz, but only when /foo/baz is matched
                    component: rankinglist
                }
            }
        },
        '/playlist/:playlistID': {
            name: 'playlist',
            component: playlist
        }
    });*/
    router.start(App, '#app');
    //router.go('discover');

}());
