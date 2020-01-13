$(document).on('ready', function() {

    // drop toggle
    function dropToggle() {
        var dropBtn = $('.drop .drop-btn');
        dropBtn.on('click',function(){
            $(this).toggleClass('on');
            $(this).closest('.drop').siblings().find('.drop-btn').removeClass('on');
            $(this).closest('.drop').siblings().find('.drop-list').slideUp();
            $(this).closest('.drop').find('.drop-list').slideToggle('fast');
        });
    }
    dropToggle();

    // main tab
    function mainTab() {
        var tabBtn = $('.main-tab-nav li a');
        tabBtn.on('click',function(e){
            e.preventDefault();
            var tabCon = $(this).attr('href');
            $(tabCon).attr('tabindex',0).focus();
            
            $(this).parent().siblings().removeClass('on');
            $(this).parent().addClass('on');
            $(this).closest('.main-tab').find('.main-tab-con > div').removeClass('on');
            $(tabCon).addClass('on');
            $('.main-tab .slick-slider').slick('refresh');
        });
    }
    mainTab();

    // slick-slider
    $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
    });

    // partner slider
    function partnerSlide(item) {
        var slideWrap = $(item).closest('.slide');
        var prevBtn = slideWrap.find('.slick-prev');
        var nextBtn = slideWrap.find('.slick-next');
        var stopBtn = slideWrap.find('.slick-stop');
        var playBtn = slideWrap.find('.slick-play');

        $(item).slick({
            slidesToShow:6,
            autoplaySpeed:6000,
            //speed:2000,
            infinite:true,
            prevArrow: prevBtn,
            nextArrow: nextBtn,
            autoplay:true,
            responsive: [
                {
                  breakpoint: 1240,
                  settings: {
                    slidesToShow:5
                  }
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow:4
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow:2
                  }
                }
            ]
        });
        /*control*/
        $(stopBtn).on('click', function() {
            $(item).slick('slickPause');
            $(this).hide();
            $(playBtn).show();
        });
        $(playBtn).on('click', function() {
            $(item).slick('slickPlay');
            $(this).hide();
            $(stopBtn).show();
        });
    }
    partnerSlide('.biz-partner')

    // family site
    function goUrl(f) {
        var url = f.url.value;
            if(!url) {
                alert('선택하세요!');
            return false;
            }
            f.action = url;
                return true;
            }

    // modal
    $(function(){
        $(".contbtn").on("click", function(){
            $(".detail-seachbox").attr("tabindex", "0").show().focus();
            $(".btn-close-search").click(function(){
                $(".detail-seachbox").removeAttr("tabindex").hide();
                $(".contbtn").focus();
            });
            
        });
    });
    
    //모달창
    $(function(){
    
    
        $.fn.btn_modal_pop= function() {
    
            var btn_id = $(this).attr('id');
    
            $('.'+btn_id).attr("tabindex", "0").show().focus();
                $('.'+btn_id).before('<div class="pop-bg"></div>');
                $('.'+btn_id).fadeIn();
            $(".btn-pop-close, .modal_close").click(function(){
                $('.'+btn_id).removeAttr("tabindex").hide();
                $('.pop-bg').remove();
                $(".btn-modal-pop#"+btn_id).focus();
            });
            $(".btn-pop-close").focus(function(){
                $('.'+btn_id).append("<a href='javascript:void(0);' class='linkAppend'>팝업닫기</a>");
                $(".linkAppend").focus(   function(){
                $('.'+btn_id).attr("tabindex", "0").focus();
                $(".linkAppend").remove();
                });
            });
    
        };
    
    });
    
        function btn_modal_pop(btn_id) {
    
            $('.'+btn_id).attr("tabindex", "0").show().focus();
                $('.'+btn_id).before('<div class="pop-bg"></div>');
                $('.'+btn_id).fadeIn();
            $(".btn-pop-close, .modal_close").click(function(){
                $('.'+btn_id).removeAttr("tabindex").hide();
                $('.pop-bg').remove();
                $(".btn-modal-pop#"+btn_id).focus();
            });
            $(".btn-pop-close").focus(function(){
                $('.'+btn_id).append("<a href='javascript:void(0);' class='linkAppend'>팝업닫기</a>");
                $(".linkAppend").focus(   function(){
                $('.'+btn_id).attr("tabindex", "0").focus();
                $(".linkAppend").remove();
                });
            });
    
        };
    
    $(function(){
        $(".mobilechck").on("click", function(){
            $(".mobile-input").attr("tabindex", "0").show().focus();        
        });
    });

});