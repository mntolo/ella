'use strict';

jQuery(function($) {

    var $window = $(window),
        $body = $('body'),
        screenWidth = $window.width(),
        screenHeight = $window.height(),
        scrollBarWidth = 0;

    $window.on('resize orientationchange', function() {
        screenWidth = $window.width();
        screenHeight = $window.height();
    });

    $window.on('load', function() {
        $window.resize();
    });

    (function($){$.fn.backToTop=function(options){var $this=$(this);$this.hide().click(function(){$("body, html").animate({scrollTop:"0px"});});var $window=$(window);$window.scroll(function(){if($window.scrollTop()>0){$this.fadeIn();}else{$this.fadeOut();}});return this;};})(jQuery);

    jQuery('body').append('<a class="hl-back-to-top"><i class="fa fa-chevron-up"></i></a>');
    jQuery('.hl-back-to-top').backToTop();

    $.fn.copyme = function() {
        $('span[id^="success-alert"]').remove();
        this.select();
        $(this).focus();
        document.execCommand("copy");
        document.getSelection().removeAllRanges();
        $(this).parent().find('.hl-copy-input').text('Copied');
        $('#success-alert').css( "color", "green" );
    };

    function hl_url_update(url, parameter) {
        var urlparts= url.split('?');
        if (urlparts.length>=2) {
            var prefix= encodeURIComponent(parameter)+'=';
            var pars= urlparts[1].split(/[&;]/g);
            for (var i= pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }
            url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
            return url;
        } else {
            return url;
        }
    }

    window.halothemes = {
        init : function() {
            this.resizedEvent(400);
            this.ieWarning();
            this.disableEmptyLinks();
            this.headermenus();
            this.niceselect();
            this.hl_slider();
            this.hl_popup();
            this.hl_tabify();
            this.hl_readmore();
            this.hl_twitter();
            this.hl_filter();
            this.hl_mathheight();
            this.hl_misc();
            this.hl_copytoclipboard();
            this.hl_toggle();
        },

        hl_copytoclipboard : function() {
            $('.hl-banner-box').each(function(){
                $(this).find('.hl-copy-input').on('click', function(event){
                    $(this).parent().find('.copy-protect').copyme();
                });
                $(this).find('.copy-protect').on('click', function(event){
                    $(this).parent().find('.copy-protect').copyme();
                });
            });
        },

        resizedEvent : function(delay) {
            var resizeTimerId;

            $window.on('resize orientationchange', function() {
                clearTimeout(resizeTimerId);

                resizeTimerId = setTimeout( function() {
                    $window.trigger('resized');
                }, delay);
            });
        },

        ieWarning : function() {
            if ($('html').hasClass('oldie')) {
                $body.empty().html('Please, Update your Browser to at least IE9');
            }
        },

        disableEmptyLinks : function() {
            $('[href="#"], .btn.disabled').on('click', function(event) {
                event.preventDefault();
            });
        },

        headermenus : function() {
            $('ul.sf-menu').superfish();
            $(".hl-sidebar").sidebar({side: "left"});
            $(".hl-mobile-menu-action").on("click", function () {
                $(".hl-sidebar").trigger("sidebar:toggle");
                $(this).find('.hamburger').toggleClass('active');
                $('.hl-sidebar').toggleClass('active');
                return false;
            });
        },

        niceselect: function() {
            $('select').niceSelect();
        },

        hl_popup: function() {
            $('.hl-popup').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-img-mobile',
                image: {
                    verticalFit: true
                },
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                },
                zoom: {
                    enabled: true,
                    duration: 300
                }
            });

            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            });

            $('.hl-close-popup').on( "click", function() {
                $.magnificPopup.close();
            });

            $('.hl-close').on( "click", function() {
                $('.hl-top-banner').addClass('hl-banner-disable');
                $('.hl-site-wrapper').removeClass('hl-banner-active');
                $.cookie("hl-top-banner", 'hl-banner-disable');
            });
        },

        hl_tabify: function() {
            $('.hl-tabs').tabs();
        },

        hl_slider: function() {
            $('.hl-slider').each(function(){
                var a = jQuery(this).data('slide') ? jQuery(this).data('slide') : 4;
                $(this).owlCarousel({
                    loop:false,
                    nav:true,
                    dots:true,
                    margin:30,
                    responsiveClass:true,
                    navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
                    responsive:{
                        0:{
                            items:1,
                        },
                        600:{
                            items:2,
                        },
                        1000:{
                            items:a,
                        }
                    }
                });
            });

            $('.hl-testimonials-main-slider').owlCarousel({
                loop:true,
                items:1,
                autoHeight:true,
                nav:true,
                dots:false,
                navText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                onTranslate: function(){
                   jQuery('.hl-testimonials-main-slider').find('.hl-layer').removeClass('active animated bounceInUp');
                },
                onTranslated: function(){
                    jQuery('.hl-testimonials-main-slider').find('.hl-layer').addClass('active animated bounceInUp');
                },
                onInitialized: function(){
                    jQuery('.hl-testimonials-main-slider').find('.hl-layer').addClass('active animated bounceInUp');
                }
            });

            $('.hl-testimonials-block, .hl-testimonials-main-slider').owlCarousel({
                loop:true,
                items:1,
                autoHeight:true,
                dots:false,
                nav:true,
                navText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
            });
            $('.hl-theme-slider').owlCarousel({
                loop:true,
                items:1,
                autoHeight:false,
                dots:false,
                nav:true,
                navText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
            });
        },

        hl_readmore: function() {
            $('.hl-readmore').readmore({
                speed: 75,
                moreLink: '... <a href="#">Read more</a>',
                lessLink: '<a href="#">Read less</a>',
                collapsedHeight: 120
            });
        },

        hl_twitter: function() {
            $('.hl-twitter-feed').twittie({
                'username': 'halothemes',
                'count': 1,
                'dateFormat': '%d, %B %Y',
                'template': '<div class="hl-tweet-content">{{tweet}}</div><span class="hl-tweet-date">{{date}}</span>',
                'apiPath' : 'https://www.halothemes.com/wp-content/themes/halothemes/framework/api/tweet.php',
            });
        },

        hl_filter: function() {

            $('#hl_theme_filter').on('change', function () {
                var filter = $(this).val(),
                    url = $(location).attr('href');
                if (url) {
                    window.location = hl_url_update(url,'filter')+'?filter='+filter;
                }
                return false;
            });

            $('.hl-price-filter a').on('click', function () {
                var filter = $(this).data('filter'),
                    url = $(location).attr('href');
                if (url) {
                    window.location = hl_url_update(url,'filter')+'?filter='+filter;
                }
                return false;
            });

        },

        hl_mathheight : function() {
            $(function() {
                $('.hl-equalheight').each(function() {
                    $(this).children('.hl-item').matchHeight({
                        byRow: true,
                        property: 'height'
                    });
                });
            });
        },

        hl_misc : function() {
            $('.hl-sidebar').addClass('hl-full-loaded');
            $('.hl-banner-block').imagesLoaded().done( function( instance ) {
                $('.hl-banner-block').addClass('hl-full-loaded');
                $('.hl-banner-block').find('.hl-super-layer').addClass('active animated fadeInUp');
            });
        },

        hl_toggle: function() {
            $('.hl-toggle-block').click(function () {
                var toggle = $(this).children('.hl-toggle-content');
                var title = $(this).children('.hl-toggle-title');
                if (toggle.is(':hidden')) {
                    toggle.slideDown('200');
                    title.addClass( "active" );
                } else {
                    toggle.slideUp('200');
                    title.removeClass( "active" );
                }
            });
        }

    };

    halothemes.init();

});