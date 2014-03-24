/*******************
 *
 * GLOBAL VARS
 *
 ******************/
var mediaq= 0;
var mediawidthmobile = 480;
var mediawidthmin = 768;
var mediawidth1 = 870;
var mediawidthmax = 1140;
//Dynamic border
var br_top_h, main_h, wside_w, eside_w;
//View Class && Staff
var idpage= '.allpages';
var newpage = '.newpage';
var newp = 'newpage';
var oldpage = '.oldpage';
var oldp = 'oldpage';

var firstpage= true;
var rqlock= false;
var loadstat= {
    lock: false,
    sum: 0,
    reset: function(){this.sum= 0;},
    add: function(){
        /*if (this.lock) {
            setTimeout(loadstat.add, 100);
        }
        else {*/
            this.lock= true;
            ++(this.sum);
            this.lock = false;
        //}
    },
    limit: 2,
    waitmin: 10,
    waitmax: 100
    /*check: function(call){
        if (this.sum != this.limit) {
            setTimeout(loadstat.check, 100);
        }
        else
            call();
    }*/
}

var curpage= '';
var pages= {
    index: {
        h1: '<h1 role="heading">что такое <a href="callto:+79243060613"><span class="tcolor">techno</span><span class="mcolor">media</span></a></h1>',
        main: 'content/main/main.html',
        more: 'content/main/more.html',
        social: true,
        csslib: ['content/main/main.css'],
        jslib: [],
        js: 'content/main/code.js',
        jsasynx: true
    },
    service: {
        h1: '<h1 role="heading">что такое <a href="callto:+79243060613"><span class="tcolor">techno</span><span class="mcolor">media</span></a></h1>',
        main: 'content/service/main.html',
        more: 'content/service/more.html',
        social: true,
        csslib: ["content/service/serv.css", "add/botdetect/lib/botdetect/public/lbd_layout.css"],
        jslib: ["js/jquery.maskedinput.min.js", "js/jquery.transit.min.js", "js/jquery-ui-1.10.3.custom.min.js"],
        js: 'content/service/code.js',
        jsasynx: true
    },
    contacts: {
        h1: '<h1 role="heading">как с <a href="callto:+79243060613"><span class="mcolor">нами</span></a> связаться</h1>',
        main: 'content/contacts/main_ajax.html',
        more: 'content/contacts/more.html',
        csslib: ["content/contacts/contacts.css", "add/botdetect/lib/botdetect/public/lbd_layout.css"],
        social: true,
        jslib: ['js/2Gis.DWidgetLoader.js'],
        js: 'content/contacts/code.js',
        jsasynx: true
    },
    portfolio: {
        h1: '<h1 role="heading">наши работы</h1>',
        main: 'content/portfolio/portfolio.html',
        more: '',
        social: false,
        csslib: ['add/amslider/amslider.css'],
        jslib: ["add/amslider/sliderengine/amazingslider.js", "add/amslider/sliderengine/initslider-1_ajax.js"],
        js: 'content/portfolio/code.js',
        jsasynx: false
    }
}

var tpls= {
    main: {url: "tpl/tpl.html", data: ''},
    social: {url: 'tpl/social.html', data: ''}
}

/*******************
 *
 * Controller Pages Code
 *
 ******************/

loadtext(tpls.social.url, function(data){
    tpls.social.data= data;
});
loadtext(tpls.main.url, function(data){
    tpls.main.data= data;
    rqjob();
});

/*$('a.gotopage').click(function(e){
    e.preventDefault();
});*/
var gotopage= function(query){

    rq= location.href.match(/#!(\/(.+))/i);
    if (rq && rq[2] == query) return;
    if (!rq && !query) return;

    if (query) {
        location.assign('#!/'+query);
    }
    else
        location.assign('#');
    rqjob();
}
//On History Navigation
/*var isHashChange = ("onhashchange" in window);
var hashHandler = function (event) {
    // event.oldURL, event.newURL
    //location.reload();
    rq= location.href.match(/#!(\/(.+))/i);
    if (rq) {
        gotopage(rq[2]);
    }
    else {
        gotopage();
    }
}
window.addEventListener("hashchange", hashHandler, true);*/

var rqjob= function(){
    if (!rqlock) {
        rqlock= true;
        viewpre();
        rq= location.href.match(/#!(\/(.+))/i);
        if (rq) {
            curpage= rq[2];
        }
        else {
            curpage= 'index';
        }
        console.log(pages[curpage]);
        viewpost(pages[curpage]);
    }
}

/******************
 *
 * View Page Code
 *
 * *****************/
var viewpre= function(){
    oldpage = newpage;
    oldp = newp;

    /*$(newpage).toggleClass(newp)
        .toggleClass(oldp);
    $('head link').filter(newpage).toggleClass(newp)
        .toggleClass(oldp);*/
    newpage = '.newpage';
    newp = 'newpage';

    $(idpage).append(tpls.main.data);

    if (firstpage) {
       setTimeout(function(){
           $(newpage).fadeIn();
       }, 200);
        //firstpage= false;
    }
}
var viewpost= function(page){
    $(newpage).toggleClass(newp)
        .toggleClass(curpage);
    newpage= '.'+curpage;
    newp= curpage;

    $(newpage).find('.head>div').append(page.h1);

    loadstat.reset();
    loadstat.limit= 3;
    if (page.main)
        loadtext(page.main, function(data){
            $(newpage).find('.main').append(data);
            setTimeout( function tmr(){
                if (loadstat.lock)
                    setTimeout(tmr, loadstat.waitmax);
                else
                    loadstat.add();
            }, loadstat.waitmin);
            if (page.social) {
                $(newpage).find('.main').append(tpls.social.data);
                setTimeout( function tmr(){
                    if (loadstat.lock)
                        setTimeout(tmr, loadstat.waitmax);
                    else
                        loadstat.add();
                }, loadstat.waitmin);
            } else
                loadstat.add();
        });
    else
        loadstat.add();
    if (page.more)
        loadtext(page.more, function(data){
            $(newpage).find('.allend').append(data);
            setTimeout( function tmr(){
                if (loadstat.lock)
                    setTimeout(tmr, loadstat.waitmax);
                else
                    loadstat.add();
            }, loadstat.waitmin);
        });
    else
        loadstat.add();

    /*loadstat.check(function(){
        alert(2354);
    });*/
    setTimeout( function tmrck(){
        if (loadstat.sum != loadstat.limit)
            setTimeout(tmrck, loadstat.waitmin);
        else {
            loadcss(page);
        }
    }, loadstat.waitmax);


}
var loadcss= function(page){
    count= page.csslib.length;
    if (count) {
        if (count == 1) {
            $('head .before-after').before('<link>')
                .prev('link').attr({
                    'rel': 'stylesheet',
                    'href': page.csslib[0],
                    'class': newp
                });
            console.log(page);
            loadjs(page);
        } else {
            for (i=0; i<count; i++) {
                $('head .before-after').before('<link>')
                    .prev('link').attr({
                        'rel': 'stylesheet',
                        'href': page.csslib[i],
                        'class': newp
                    });
            }
            loadjs(page);
        }
    }
    else
        loadjs(page);
}
var loadjs= function(page){
    console.log(page);
    count= page.jslib.length;
    console.log(count);
    if (count) {
        if (count == 1)
            loadcode(page.jslib[0], function(data){
                execjs(page);
            });
        else {
            if (page.jsasynx) {
                loadstat.reset();
                loadstat.limit= count;
                for (i=0; i<count; i++){
                    loadcode(page.jslib[i], function(data){
                        setTimeout( function tmr(){
                            if (loadstat.lock)
                                setTimeout(tmr, loadstat.waitmax);
                            else
                                loadstat.add();
                        }, loadstat.waitmin);
                    });
                }
                setTimeout( function tmrck(){
                    if (loadstat.sum != loadstat.limit)
                        setTimeout(tmrck, loadstat.waitmin);
                    else {
                        execjs(page);
                    }
                }, loadstat.waitmax);
            }
            else {
                lc_recurse(0, count, page.jslib, function(){
                    execjs(page);
                });
                /*loadstat.reset();
                loadstat.limit= count;*/

                /*include(page.jslib[0], 'body');

                i=1;
                while (i<count) {
                    setTimeout( function tmr(){
                        if (loadstat.sum != i) {
                            console.log('not '+i);
                            setTimeout(tmr, loadstat.waitmax);
                        }
                        else {
                            include(page.jslib[i++], 'body');
                        }
                    }, loadstat.waitmin);
                }

                setTimeout( function tmr(){
                    if (loadstat.sum != loadstat.limit) {
                        console.log('not '+loadstat.limit);
                        setTimeout(tmr, loadstat.waitmax);
                    }
                    else {
                        include(page.js, 'body');
                    }
                }, loadstat.waitmin);*/

                /*loadcode(page.jslib[0], function(data){
                    loadcode(page.jslib[1], function(data){
                        loadcode(page.js, function(data){
                            //
                        });
                    });
                });*/
            }
        }
    } else
        execjs(page);
}
var execjs= function(page){
    if (firstpage) {
        execjsrealy(page, function(){
            //
        });
        showpage(function(){
            //
        });

        firstpage= false;
    } else {
        showpage(function(){
            execjsrealy(page, function(){
                //
            });
        });
        //$('.contacts .allend .feedback-form textarea').css('height', 100+'px');
    }
}

var execjsrealy= function(page, callback){
    if (curpage == 'service') {
        if ((typeof textarea_resize) == 'function') {
            textarea_resize();
            captcha_resize();
        }
    }
    if (curpage == 'contacts') {
        if ((typeof textarea_resize) == 'function') {
            textarea_resize();
            captcha_resize();
        }
        setTimeout(function(){
            new DGWidgetLoader(".c-map",
            {
                "borderColor": "#a3a3a3", "width": "100%", "height": "100%", "wid": "a5d802d5725202c5b075b3d09ddaa596", "pos": {"lon": "135.05346286272", "lat": "48.533504964611", "zoom": "16"}, "opt": {"ref": "hidden", "card": ["name"], "city": "khabarovsk"},
                "org": [
                    {"id": "4926340373587061", "hash": "6579qa34092IJ1H8ddd4uvgc43380J344Ac29565388A3158485969G71J0I7A894"}
                ]
            });
            fix_resize();
        }, 1000);
    }
    if (curpage == 'portfolio') {
        $('[class|="amazingslider-watermark"]').remove();
    }
    loadcode(page.js, function(data){
        if (curpage == 'contacts' || curpage == 'service') {
            textarea_resize();
            captcha_resize();
        }
        rqlock = false;
        /*var hashback= location.href;
        setTimeout(function eventhash(){
            if (hashback != location.href) {
                hashback= location.href;
                location.reload();
                rqjob();
            }
        }, 200);*/
        var isHashChange = ("onhashchange" in window);
        var hashHandler = function (event) {
            // event.oldURL, event.newURL
            rqjob();
        }
        window.addEventListener("hashchange", hashHandler, false);
        callback();
    });
}
var showpage= function(callback){
    $(idpage+' '+oldpage).fadeOut('slow', function(){
        $(oldpage).remove();
        if (oldp == 'portfolio') {
            $('#html5-lightbox').remove();
        }
        //$(idpage+' '+newpage).toggleClass('invisible')
        //.toggleClass('simplehide');
        $(idpage+' '+newpage).fadeIn('slow', function(){
            callback();
        });
        fix_resize();
    });
}

/*String.prototype.getclass= function(){
    //return this.match(/[a-zA-Z0-9_-]+/)[0];
    return this.substr(0);
}*/

var fix_resize = function () {
    mediaq= $(document).width();
    br_top_h = $('header.head').height();
    main_h = $('div.main').height()+
        parseFloat($('div.main').css('padding-top'))+ parseFloat($('div.main').css('padding-bottom'))+
        parseFloat($('div.main').css('margin-top'))+ parseFloat($('div.main').css('margin-bottom'));
    wside_w = $('.west-side').width();
    eside_w = $('.east-side').width();

    b_angle= 0.95;
    if (mediaq > mediawidthmobile)
        b_angle= 0.88;
    if (mediaq > mediawidthmin)
        b_angle= 0.76;
    if (mediaq > mediawidth1)
        b_angle= 0.6;

    /*$('style.before-after').empty();
     $('style.before-after').append('.head:before, .head:after {border-top-width: ' + br_top_h + 'px;}' +
     '.main:before, .main:after {border-bottom-width: ' + br_top_h + 'px;}'
     );*/
    /*$('header.head:before, header.head:before').css('border-top-width') ;*/

    $('.west-side, .east-side').css('height', main_h + 2 * br_top_h + 'px');
    $('.east-side [class|="br"], .west-side [class|="br"]').css('height', br_top_h + 'px');
    $('.east-side .br-down, .west-side .br-down').css('top', main_h + 'px');

    $('.east-side [class|="br"], .west-side [class|="br"]').empty();
    $('.east-side .br-up').append(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
            '<polygon points="0,0 0,'+br_top_h+' '+eside_w+','+(b_angle*br_top_h)+' '+eside_w+',0" />'+
            //'<path d="M0 0 L0 '+br_top_h+' L'+eside_w+' '+(0.4*br_top_h)+' L'+eside_w+' 0 Z" stroke-width="0" fill="#fff" />'+
            '</svg>'
    );
    $('.east-side .br-down').append(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
            '<polygon points="0,0 0,'+br_top_h+' '+eside_w+','+br_top_h+' '+eside_w+','+((1-b_angle)*br_top_h)+'" />'+
            '</svg>'
    );
    $('.west-side .br-up').append(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
            '<polygon points="0,0 '+wside_w+',0 '+wside_w+','+br_top_h+' 0,'+(b_angle*br_top_h)+'" />'+
            '</svg>'
    );
    $('.west-side .br-down').append(
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">'+
            '<polygon points="0,'+((1-b_angle)*br_top_h)+' '+0+','+br_top_h+' '+wside_w+','+br_top_h+' '+wside_w+',0" />'+
            '</svg>'
    );
}

$('html').toggleClass('scroll');
$("html").niceScroll({
    cursorcolor:"#800098",
    cursoropacitymin: 0,
    cursoropacitymax: 0.8,
    cursorborderradius: 0,
    hwacceleration: true,
    autohidemode: true,
    cursorwidth: '10px'
});

$(document).ready(function () {
    fix_resize();
    setTimeout(fix_resize,250);
    setTimeout(fix_resize,1000);
    setTimeout(fix_resize,3000);
});
$(window).resize(function () {
    fix_resize();
});