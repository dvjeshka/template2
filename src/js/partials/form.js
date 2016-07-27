$('.js-styler').styler();

var inputWrap="<div class='form__input-wrap' style='display: inline-block'></div>";
$(".form .form__input-name").wrap(inputWrap).after("<div class='input__valid'>Неправильно введено имя</div>");
$(".form .form__input-phone").wrap(inputWrap).after("<div class='input__valid'>Неправильно введен введен номер телефона</div>");
$(".form .form__input-email").wrap(inputWrap).after("<div class='input__valid'>Неправильно введен email</div>");
$(".form .form__input-textarea").wrap(inputWrap).after("<div class='input__valid'>Слишком короткое сообщение</div>");


if($("#form-call").length > 0) { $("#form-call").lemongrab(''); }
if($("#form-question").length > 0) { $("#form-question").lemongrab(''); }
if($("#form-subscribe").length > 0) { $("#form-subscribe").lemongrab(''); }

$(".form").on("lemongrab.require",function(){
    $(this).find('.btn2').removeClass('btn2-active');
    console.log('не все обязательные поля');
});
$(".form").on("lemongrab.norequire",function(){
    $(this).find('.btn2').addClass('btn2-active');
    console.log('все обязательные поля');
});