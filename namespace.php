<?php

    mb_internal_encoding("utf-8");
    header('Content-Type: text/html; charset=utf-8');
    setlocale(LC_ALL, 'ru_RU');
    $sitedir= '';

    //Toggle invisible class for showing header.
    $header_h1 = '<h1 class="invisible" role="heading"><a href="callto:+79243060613"><span class="tcolor">techno</span><span class="mcolor">media</span></a></h1>';
    $main_block= $sitedir;
    $more_block = $sitedir;
    $social_block = $sitedir;
    $script_block = $sitedir;
    $csslocal = '';
    $css_lib = '';
    $script_lib = '';

    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
?>