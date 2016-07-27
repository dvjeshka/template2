
$('.slider').slick({
    });

$('.js-styler').styler();


$(".fancybox").fancybox({
    padding: 32,
    margin:100,
    openEffect : 'elastic',
    openSpeed  : 150,

    closeEffect : 'elastic',
    closeSpeed  : 150,
    helpers: {
        overlay : {
            speedOut : 0,
            css : {
                'background' : 'rgba(37,37,37,.8)'
            },
            locked: false

        }
    }

});

$(".js-input-phone").inputmask(
    {mask:"+7(999)999-99-99", showMaskOnHover: false
    });



/*jQuery(function($) {

    if($('.fix').length) {
        var fix = $('.fix'),
            fixTop = fix.offset().top;
        $(window).scroll(function () {

            if ($(window).scrollTop() > fixTop){
                fix.css({
                    'position': 'fixed',
                    'top': '0px',
                    'z-index': 999,
                    'width': "100%"
                })

            } else {
                fix.attr("style", "");

            }
        });
    }
});*/
