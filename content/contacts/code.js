textarea_resize= function(){
    true_h= 0.975103734439834;
    true_w= 2-0.9928678676888749;
    tw= $('.contacts .allend .feedback-form textarea').width()+
        parseFloat($('.contacts .allend .feedback-form textarea').css('padding-right'))+
        parseFloat($('.contacts .allend .feedback-form textarea').css('padding-left'));

    $('.contacts .allend .feedback-form>div').eq(2).css('height',
        2*$('.contacts .allend .feedback-form>div').eq(0).height()*true_h+'px');

    /*('.contacts .allend .feedback-form>div').eq(2).css('height',
     2*$('.contacts .allend .feedback-form>div').eq(0).height()*true_h+'px');

     tmp= $('.contacts .allend .feedback-form>div').eq(2).height()- (
     $('.contacts .allend .feedback-form button').height() +
     parseInt($('.contacts .allend .feedback-form textarea').css('padding-top'))
     );
     $('.contacts .allend .feedback-form textarea').css('height', (
     tmp
     )+'px');*/

    $('.contacts .allend .feedback-form button').css('width', (tw*true_w+1)+'px');
    console.log(tw*true_w);
}
captcha_resize= function(){
    coef= 2-50/52;
    obj= $('.contacts .LBD_CaptchaImageDiv img');

    baseh= obj.parents('.LBD_CaptchaDiv').height();
    obj.css('height', (coef*baseh)+'px');
}

$('.contacts .feedback-form input[type="text"], .contacts .feedback-form textarea').focus(function(){
    if ($(this).val() == $(this).data('def'))
        $(this).val('');
});
$('.contacts .feedback-form input[type="text"], .contacts .feedback-form textarea').focusout(function(){
    if (!$(this).val()) {
        $(this).val($(this).data('def'));
    }
});

$('.contacts .feedback-form button').mouseenter(function(){
    $(this).css('background-color', '#620C72');
});
$('.contacts .feedback-form button').mouseleave(function(){
    $(this).css('background-color', '#580068');
});
$('.contacts .feedback-form button').mousedown(function(){
    $(this).css({
        'background-color': '#74038A',
        '-webkit-box-shadow': '0px 0px 40px rgba(133, 33, 112, 0.75)',
        '-moz-box-shadow':    '0px 0px 40px rgba(133, 33, 112, 0.75)',
        'box-shadow':         '0px 0px 40px rgba(133, 33, 112, 0.75)'
    });
});
$('.contacts .feedback-form button').mouseup(function(){
    $(this).css({
        'background-color': '#580068',
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow':    'none',
        'box-shadow':         'none'
    });
});
$('.contacts .feedback-form button').click(function(index){
    msg= '';
    $('.contacts .feedback-form input[type="text"], .contacts .feedback-form textarea').each(function(){
        if( $(this).val() == $(this).data('def')) {
            msg+= '*  '+$(this).data('def')+'\n\r';
            $(this).css('border-color', 'red');
        } else
            $(this).css('border-color', '#C8C8C8');
    });
    if (msg.length) {
        alert('Пожалуйста заполните следующие поля:\n\r'+msg);
        return;
    }

    msg= $('.contacts .feedback-form input[name="Email"]').val().match(/[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}/i);
    if (!msg) {
        $('.contacts .feedback-form input[name="Email"]').css('border-color', 'red');
        alert('Указанный e-mail не соответствует формату.\n\rПожалуйста введите его снова.');
        return;
    } else
        $('.contacts .feedback-form input[name="Email"]').css('border-color', '#C8C8C8');

    gopost();
});


$(document).ready(function () {
    textarea_resize();
    captcha_resize();
});
$(window).resize(function () {
    textarea_resize();
    captcha_resize();
});


// Define the name of the Captcha field.
// It serves to access BotDetect Captcha client-side API later.
// http://captcha.com/doc/php/api/captcha-client-side-reference.html
var captchaname = '.contacts .feedback-form input[name="Captchacode"]';
var captchaUserInputId = 'Captchacode';

// AJAX argument is added to differentiate from regular POST.
var validationUrl = "contacts.php?AJAX=1";

// Collect form elements we want to handle.
var formElements = $('.contacts .feedback-form input, .contacts .feedback-form textarea');
//var form = $('#contactForm');

/*formElements.blur(
    function(){
        var postData = {};
        // Additional check to skip over empty fields
        // This igores non-relevant triggering of onBlur
        if (this.value != ''){
            postData[this.id] = this.value;
        }

        if(this.id == captchaUserInputId){
            // In case of our Captcha field, we also send the InstanceId
            captchaUserInputField = $('#' + captchaUserInputId).get(0);
            postData["CaptchaInstanceId"] = captchaUserInputField.Captcha.InstanceId;
        }

        if(this.id == "SubmitButton"){
            return false;
        }

        $.post(validationUrl, postData, postValidation);
    }
);*/

gopost= function(){
        var postData = {};
        formElements.each( function(){
                /*if(this.id == captchaUserInputId){
                    // In case of our Captcha field, we also send the InstanceId
                    captchaUserInputField = $('#' + captchaUserInputId).get(0);
                    postData["CaptchaInstanceId"] = captchaUserInputField.Captcha.InstanceId;
                }*/
                postData[$(this).attr('name')] = $(this).val();
        });

        $.post(validationUrl, postData, postValidation);
        return false;
}

function postValidation(data, status){
    console.log(status);
    console.log(data);
    /*if (data[captchaUserInputId]){

        // Get the Captcha instance, as per client side API
        captcha = $('#' + captchaUserInputId).get(0).Captcha;
        //captcha.PostReloadImage(captcha_resize);


        if(data[captchaUserInputId]["isValid"]){
            $(captchaname).css('border-color', '#C8C8C8');
            // We disable the Captcha entry if the user already solved it
            //$("#" + captchaUserInputId).attr("disabled", "disabled");
            //$("#" + captchaUserInputId).parent().remove();
        }else{
            $(captchaname).css('border-color', 'red');
            // We want to get another image if the Captcha validation failed.
            // User gets one try per image.
            captcha.ReloadImage();
            alert('Код с картинки введён неверно. Пожалуйста, попробуйте ещё раз.');
            return;
        }
    }*/

    if (data["Form"] && data["Form"]["isValid"]){
        //$("#SubmitButton").attr("disabled", "disabled");
        alert('Сообщение успешно отправлено!');
        captcha.ReloadImage();
    } else {
        delete data["Form"];
        //console.log(data);
        for (val in data)
            if (!data[val]['isValid']) {
                alert('Введённые данные слишком большие или не соответствуют допустимому формату.Попробуйте:'+
                    '\n\r* указать другой e-mail' +
                    '\n\r* уменьшить сообщение,'+
                    '\n\r* вместо имени и отчества использовать инициалы'
                );
                return;
            }
        alert('Указанный адрес электроной почты недоступен или не существует. Пожалуйста попробуйте снова или укажите другой e-mail.')
    }
    //updateValidatorMessages(data);
}

// Handling the display of validation messages
/*function updateValidatorMessages(data){
    for(var elementKey in data){
        validatedElement = data[elementKey];

        var elementValidatorMessage = $("#" + elementKey + "ValidatorMessage");

        if(validatedElement.hasOwnProperty("validationMessage")){
            elementValidatorMessage.text(validatedElement["validationMessage"]);
        }else{
            elementValidatorMessage.empty();
        }

        if(validatedElement["isValid"]){
            elementValidatorMessage.toggleClass("correct", true);
            elementValidatorMessage.toggleClass("incorrect", false);
        }else{
            elementValidatorMessage.toggleClass("correct", false);
            elementValidatorMessage.toggleClass("incorrect", true);
        }
    }
}*/

$(document).ready(function () {
    $('.contacts .feedback-form .LBD_CaptchaDiv, .contacts .feedback-form .LBD_CaptchaImageDiv, .contacts .feedback-form .LBD_CaptchaIconsDiv').removeAttr('style');

    $('.contacts .feedback-form .LBD_CaptchaImageDiv a').attr({'href': 'javascript:void(0)', 'target': '_self', 'title': 'Нажмите для обновления картинки'})
        .click(function(){
            ContactCaptcha.ReloadImage();
            return false;
        });

    /*tmpfunc= ContactCaptcha.ReloadImage;
    ContactCaptcha.ReloadImage= function(){
        $('.feedback-form .LBD_CaptchaImageDiv img').appendTo('.feedback-form .LBD_CaptchaImageDiv a');
        tmpfunc();
    }
    $('.feedback-form .LBD_CaptchaImageDiv').ready(function () {
        $('.feedback-form .LBD_CaptchaImageDiv img').appendTo('.feedback-form .LBD_CaptchaImageDiv');
    });*/
});