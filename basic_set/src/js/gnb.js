$(document).on('ready', function() {
    
    // gnb type 01
    $(function(){

        $("button.gnbOpen").click(function(){
            if($("body").hasClass("gnbOpen")){
                $("body").removeClass("gnbOpen");
            }else{
                $("body").addClass("gnbOpen");
            }
        });
        $(document).on("touchstart click",".bbg",function(e){
            e.preventDefault();
            $("body").removeClass("gnbOpen");
        });
    });



    if (matchMedia("screen and (min-width: 1024px)").matches) {
        // 1024px 이상에서 사용할 JavaScript
        $(function(){
                var maxHeight = Math.max.apply(null, $("#gnb .st_g_l > li > .dp2").map(function ()
            {
                return $(this).height()+60;
            }).get());

            
            $("header #gnb .st_g_l > li a").hover(function(){
                $("header #gnb .st_g_l > li > ul").show()
                $("#gnb .st_g_l > li > ul").css({
                    "height":maxHeight
                });
                $("#gnb").css({
                    "height":maxHeight+117
                });
                $(".gnbBg").show().css({
                    "height":maxHeight+30
                });
                $("header").addClass("on")
                $("header h1 img").attr("src", "../../common_cms6/img/common/logo_on.png")
            });
            $("header .gnbBg").mouseleave(function(){
                $("header #gnb .st_g_l > li > ul").hide()
                $(".gnbBg").hide()
                $("header").removeClass("on")
                $("#gnb").height(98)
                $("header h1 img").attr("src", "../../common_cms6/img/common/logo.png")
            });
            $("header #gnb").mouseleave(function(){
                $("header #gnb .st_g_l > li > ul").hide()
                $(".gnbBg").hide()
                $("header").removeClass("on")
                $("#gnb").height(98)
                $("header h1 img").attr("src", "../../common_cms6/img/common/logo.png")
            });

            var $lnb_li =$(".lnb > .w > ul > li")
            var $lnb_a=$(".lnb > .w > ul > li > a")
            var $lnb_dp1 = $(".lnb > .w > ul > li.dp1")
            var $lnb_dp2 = $(".lnb > .w > ul > li.dp2")
            $lnb_a.click(function(){
                $(this).parent("li").find("ul").slideToggle()
            })
            if($lnb_dp1.is(":visible")){
                $lnb_dp2.find("a").click(function(){
                    $lnb_dp1.find("ul").slideUp()   
                })
            }

        });
    }
    if (matchMedia("screen and (max-width: 1023px)").matches) {
        // 1023px 이하에서 사용할 JavaScript
        $(function(){       
            $("header #gnb .st_g_l > li").click(function(){
                $(this).toggleClass("on")
            });
            $(".m-gnb-close").click(function(){
                $("#gnb").fadeOut()
                $(".bbg").fadeOut()
            })
            $(".m-gnb-open").click(function(){
                $("#gnb").fadeIn()
                $(".bbg").fadeIn()
            })

            var $lnb_li =$(".lnb > .w > ul > li")
            var $lnb_a=$(".lnb > .w > ul > li > a")
            var $lnb_dp1 = $(".lnb > .w > ul > li.dp1")
            var $lnb_dp2 = $(".lnb > .w > ul > li.dp2")
            $lnb_a.click(function(){
                $(this).parent("li").find("ul").slideToggle()
            })
            if($lnb_dp1.is(":visible")){
                $lnb_dp2.find("a").click(function(){
                    $lnb_dp1.find("ul").slideUp()   
                })
            }
        });
    }


    // gnb type 02
    //전체메뉴
    $(".all_menu .open_all_menu").click(function(){
        $(".all_menu_wrap").stop().fadeIn();

        if ( navigator.platform )
        {
            if(filter.indexOf( navigator.platform.toLowerCase() ) >= 0 )
            {
                $("body").addClass("no_scroll");
                $(".all_wrap").css("overflow-y","hidden");
            }
        }
        $(".main .fp-pause").hide();
        $(".main .fp-play").show();
        //clearInterval(auto_slide_main);
    });
    $(".all_menu .close_all_menu").click(function(){
        $(".all_menu_wrap").stop().fadeOut();

        if ( navigator.platform )
        {
            if(filter.indexOf( navigator.platform.toLowerCase() ) >= 0 )
            {
                $("body").removeClass("no_scroll");
            }
        }

        $(".main .fp-play").hide();
        $(".main .fp-pause").show();
        //auto_slide_main = setInterval(auto_main, 6000);
    });
    //반응형 전체메뉴
    if($(window).width() < 1240){
        $(".all_depth2").hide();
        $(".all_depth1_item .depth1").click(function(){
            if($(this).next(".all_depth2").css("display") === "block"){
                return false;
            }
            $(".all_depth2").slideUp();
            $(this).next(".all_depth2").slideDown();
        })
    }else{
        $(".all_depth2").show();
    }
    $(window).resize(function() {
        if($(window).width() < 1240){
            $(".all_depth2").hide();
            $(".all_depth1_item .depth1").click(function(){
                if($(this).next(".all_depth2").css("display") === "block"){
                    return false;
                }
                $(".all_depth2").slideUp();
                $(this).next(".all_depth2").slideDown();
            })
        }else{
            $(".all_depth2").show();
        }
    }); 
    //gnb
    // $(".gnb_wrap").on("mouseover focusin", function(){
    //     $(".header_inner_gnb").addClass("active");
    // });
    // $(".gnb_wrap").on("mouseout focusout", function(){
    //     $(".header_inner_gnb").removeClass("active");
    // });
    $(".gnb_depth1_item").on("mouseover focusin", function(){
        $(".header_inner_gnb").addClass("active");
    });
    $(".gnb_depth1_item").on("mouseout focusout", function(){
        $(".header_inner_gnb").removeClass("active");
    });
    $(".gnb_depth1_item").on("mouseover focusin", function(){
        $(this).addClass("active");
        $(this).children(".gnb_depth2").show();
    });
    $(".gnb_depth1_item").on("mouseout focusout", function(){
        $(this).removeClass("active");
        $(this).children(".gnb_depth2").hide();
    });
    //
    $('html').click(function(e) {
        if(!$(e.target).hasClass("btn_site")) {
            $(".slt_list").stop().fadeOut();
            $(".btn_site").removeClass("active");
            $(".slt_list").stop().fadeOut();
            $(".btn_site").removeClass("active");
        }
    });


    // gnb type 03
    //gnb
    $("#gnb.pc .dep1_ul").on("focusin mouseover", function(){
        $("#gnb.pc .dep2_ul").stop().slideDown(400);
        $(".head_search").stop().fadeOut();
        $(".btn_search").blur();
        $("#gnb").focus();
    });
    $("#gnb.pc .dep1_ul").on("focusout mouseout", function(){
        $("#gnb.pc .dep2_ul").stop().slideUp(400);
    });
    $("#gnb.pc .dep2_ul").on("focusout mouseout", function(){
        $(this).prev("a").removeClass("on");
    })
    //res gnb
    $(".btn_gnb").click(function(){
        $("html,body").toggleClass("no_scroll");
        $("#gnb").toggleClass("open");
        $("#gnb").removeClass("pc");
        $(".dep1").removeClass("on");
        $("#gnb .dep1_ul a").click(function(){
            if($(this).next().prop("tagName") != null && $(this).next().prop("tagName").toLowerCase() == "ul"){
            $(this).parents(".dep2_ul").prev(".dep1").addClass("res_on");
            $(this).next("ul").stop().slideDown(400);
            $(this).parent("li").nextAll().find("ul").stop().slideUp(400);
            $(this).parent("li").prevAll().find("ul").stop().slideUp(400);
            }else{
            location.href=$(this).attr("href");
            }
        });
        //1depth 및 2depth 앵커 초기화
        $(".dep1, .dep2_ul a.dep_more").click(function(e) {
            e.preventDefault();
        });
        //esc 클릭 시 gnb 닫기
        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
            $("#gnb").removeClass("open");
            $("html,body").removeClass("no_scroll");
            $(".btn_gnb").focus();
        }
        });
        $(".btn_gnb_close").click(function(){
            $("#gnb").removeClass("open");
            $("html,body").removeClass("no_scroll");
            $(".btn_gnb").focus();
        })
    });

});