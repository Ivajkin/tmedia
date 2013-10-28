<?php
require_once 'namespace.php';

    if (isset($_REQUEST['q'])){
        //echo "$_SERVER[REQUEST_URI]";
        switch ($_REQUEST['q']) {
            case 'portfolio/':
                header("Location: /portfolio");
                break;
            case 'portfolio':
                header("Location: /portfolio");
                $header_h1 = '<h1 role="heading">наши работы</h1>';
                $main_block .= 'content/portfolio/portfolio.html';
                $more_block .= '';
                $script_block .= 'content/portfolio/code.js';
                $csslocal = 'portfolio';
                $css_lib = '<link href="add/amslider/amslider.css" rel="stylesheet">';
                $script_lib = <<<EOT
        <script src="add/amslider/sliderengine/amazingslider.js"></script>
        <script src="add/amslider/sliderengine/initslider-1.js"></script>
EOT;
                break;
            case 'contact/':
            case 'contact':
            case 'contacts/':
                header("Location: /contacts");
                break;
            case 'contacts':
                header("Location: /contacts");
                $header_h1 = '<h1 role="heading">как с <a href="callto:+79243060613"><span class="mcolor">нами</span></a> связаться</h1>';
                $main_block .= 'content/contacts/main.html';
                $more_block .= 'content/contacts/more.php';
                $script_block .= 'content/contacts/code.js';
                $csslocal = 'contacts';
                $css_lib = <<<EOT
                <link href="content/contacts/contacts.css" rel="stylesheet" />
                <link href="add/botdetect/lib/botdetect/public/lbd_layout.css" rel="stylesheet" />
EOT;
                $script_lib = '';

                // PHP v5.2.0+ required
                session_start();

                require("add/botdetect/requirements.php");

                // include BotDetect Captcha library files
                require("botdetect.php");

                // create & configure the Captcha object
                $ContactCaptcha = new Captcha("ContactCaptcha");
                $ContactCaptcha->UserInputID = "Captchacode";
                $ContactCaptcha->CodeLength = 3;
                $ContactCaptcha->ImageWidth = 150;
                $ContactCaptcha->ImageStyle = ImageStyle::CaughtInTheNet2;

                require("content/contacts/sendmail.php");
                break;
            case 'service/':
                header("Location: /service");
                break;
            case 'service':
                header("Location: /service");
            $header_h1 = '<h1 role="heading">что <a href="callto:+79243060613"><span class="mcolor">мы</span></a> можем предложить</h1>';
            $main_block .= 'content/service/main.html';
            $more_block .= 'content/service/more.php';
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

            require("add/botdetect/requirements.php");

// include BotDetect Captcha library files
            require("botdetect.php");

// create & configure the Captcha object
            $ContactCaptcha = new Captcha("ContactCaptcha");
            $ContactCaptcha->UserInputID = "captchacode";
            $ContactCaptcha->CodeLength = 3;
            $ContactCaptcha->ImageWidth = 150;
            $ContactCaptcha->ImageStyle = ImageStyle::CaughtInTheNet2;

            require("content/service/sendmail.php");
                break;
            default:
                $header_h1 = '<h1 role="heading">что такое <a href="callto:+79243060613"><span class="tcolor">techno</span><span class="mcolor">media</span></a></h1>';
                $main_block .= 'content/main/main.html';
                $more_block .= 'content/main/more.html';
                $script_block .= 'content/main/code.js';
                $csslocal = 'index';
                $css_lib = '<link href="content/main/main.css" rel="stylesheet">';
                $script_lib = '';
        }
    } else {
        $header_h1 = '<h1 role="heading">что такое <a href="callto:+79243060613"><span class="tcolor">techno</span><span class="mcolor">media</span></a></h1>';
        $main_block .= 'content/main/main.html';
        $more_block .= 'content/main/more.html';
        $script_block .= 'content/main/code.js';
        $csslocal = 'index';
        $css_lib = '<link href="content/main/main.css" rel="stylesheet">';
        $script_lib = '';
    }
        include $sitedir.'tpl/tpl.php';
?>