<?php
require_once 'namespace.php';

    $header_h1 = '<h1 role="heading">наши работы</h1>';
    $main_block .= 'content/portfolio/portfolio.html';
    $more_block .= '';
    $social_block .= '';
    $script_block .= 'content/portfolio/code.js';
    $csslocal = 'portfolio';
    $css_lib = '<link href="add/amslider/amslider.css" rel="stylesheet">';
    $script_lib = <<<EOT
        <script src="add/amslider/sliderengine/amazingslider.js"></script>
        <script src="add/amslider/sliderengine/initslider-1.js"></script>
EOT;


    include $sitedir.'tpl/tpl.php';
?>