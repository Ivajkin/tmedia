<?php
require_once 'namespace.php';

    $header_h1 = '<h1 role="heading">что <a href="callto:+79243060613"><span class="mcolor">мы</span></a> можем предложить</h1>';
    $main_block .= 'content/service/main.html';
    $more_block .= 'content/service/more.php';
    $social_block .= 'tpl/social.html';
    $script_block .= 'content/service/code.js';
    $csslocal = 'service';
    $css_lib = <<<EOT
                <link href="content/service/serv.css" rel="stylesheet" />
                <link href="add/botdetect/lib/botdetect/public/lbd_layout.css" rel="stylesheet" />
EOT;
    $script_lib = <<<EOT
                <script src="js/jquery.maskedinput.min.js"></script>
                <script src="js/jquery.transit.min.js"></script>
EOT;

// PHP v5.2.0+ required
session_start();

require("add/BotDetect/requirements.php");

// include BotDetect Captcha library files
require("botdetect.php");

// create & configure the Captcha object
$ContactCaptcha = new Captcha("ContactCaptcha");
$ContactCaptcha->UserInputID = "captchacode";
$ContactCaptcha->CodeLength = 3;
$ContactCaptcha->ImageWidth = 150;
$ContactCaptcha->ImageStyle = ImageStyle::CaughtInTheNet2;

require("content/service/sendmail.php");

    include $sitedir.'tpl/tpl.php';
/*echo $ContactCaptcha->Html();
echo '<link href="add/botdetect/lib/botdetect/public/lbd_layout.css" rel="stylesheet" /><input type="text" name="captchacode" id="captchacode" value="КОД С КАРТИНКИ" data-def="КОД С КАРТИНКИ" lang="en" title="Введите код с картинки"/>';*/

?>