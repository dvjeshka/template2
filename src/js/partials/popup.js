var checkHash = function(){

    if(window.location.hash.indexOf("#popup") != -1) {
        $('body').addClass('overflow-hidden');

        $(document).bind('click.popupClose', function(e) {
            if ($(e.target).closest(".popup__wp").length) return;
            window.location.hash="#x";
            history.pushState('', document.title, window.location.pathname);
            e.stopPropagation();
            $(document).unbind('click.popupClose');
        });  // установим обработчик нажатия кнопки мыши на элементе foo

    } else {
        $('body').removeClass('overflow-hidden');
        /* history.pushState('', document.title, window.location.pathname);*/ //удаляет hash
    }
};

checkHash();

$(window).bind('hashchange', function() {
    checkHash();
});