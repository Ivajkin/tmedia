/*fix_mh= function() {
 ah= $('.main>article').height();
 dh= $('.main>div').height();

 $('.main').css('height', '900px');
 }

 $(document).ready(function(){fix_mh();    fix_resize();});
 $(window).resize(function(){fix_mh();    fix_resize();});*/

function animateScroll(name) {
    $(name).animate({"scrollTop":(Math.floor(Math.random()*3000))},400);
}

/*scroll_fix= function() {

    if (mediaq >= mediawidthmax) {
        $("html").getNiceScroll().hide();
        $("html").toggleClass('scroll');
    }
    else if ($('#ascrail2000').css('display') == 'none'){
        $("html").getNiceScroll().show();
        $("html").toggleClass('scroll');
    }

    /*if (mediaq < mediawidthmax) {
        $(".allend").getNiceScroll().hide();
        $(".allend").toggleClass('scroll');
    }
    else if ($('#ascrail2001').css('display') == 'none') {
        $(".allend").getNiceScroll().show();
        $(".allend").toggleClass('scroll');
    }*/

/*}*/

$('.index .main article div').click(function(){
   location.assign('/blog');
});

$(document).ready(function () {
    $('.index .main>div>div').mouseenter( function(){
        idprev= parseInt($('.index .main div.hovered').data('id'));
        idnext= parseInt($(this).data('id'));
        if (idprev == idnext) return;
        hidetime= 600;

        $('.index .main div.hovered').toggleClass('hovered');
        $(this).toggleClass('hovered');

        $('.index .main section').stop(true,true);
        $('.index .main section').eq(idprev).fadeOut(hidetime, function(){

            $('.main section').eq(idnext).fadeIn(hidetime*0.7, function(){

            });
            fix_resize();
        });
    });

    $(".index .main article").niceScroll({
        cursorcolor:"#800098",
        cursoropacitymin: 0,
        cursoropacitymax: 0.8,
        cursorborderradius: 0,
        hwacceleration: true,
        autohidemode: true,
        cursorwidth: '7px'
    });
    $('.strategy').click(function(){
        location.assign("/strategy");
    });

    //console.log(mediaq+' '+mediawidthmobile);

    /*if (!isMobile.phone && !isMobile.apple.ipod) {
        $('.allend').toggleClass('scroll');
        $(".allend").niceScroll(".allend article",{
            cursorcolor:"#800098",
            cursoropacitymin: 0,
            cursoropacitymax: 0.8,
            cursorborderradius: 0,
            touchbehavior: true,
            hwacceleration: true,
            autohidemode: true
        });
    }*/
    /*(".allend article").scroll(function(e) {
        $(".allend").html($(".allend article").scrollTop());
    });*/

    /*scroll_fix();
    if (mediaq < mediawidthmax) {
         $(".allend").getNiceScroll().hide();
         $(".allend").toggleClass('scroll');
     }
     else if ($('#ascrail2001').css('display') == 'none') {
         $(".allend").getNiceScroll().show();
         $(".allend").toggleClass('scroll');
     }*/
})

/*$(window).resize(function(){
    scroll_fix();
})*/
