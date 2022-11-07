<?php

require 'flight/Flight.php';

function render($file, $args = []) {
    Flight::render('_head.php');
    Flight::render('_nav.php');
    Flight::render($file, $args);
}

function render_typing_page($file) {
    Flight::render('_head.php');
    Flight::render('_nav.php');
    Flight::render($file);
    Flight::render('_stats');
    Flight::render('_footer.php');
}

Flight::route('/', function(){
    render('home');
});

Flight::route('/about', function(){
    render('about');
});

Flight::route('/support', function(){
    render('support');
});

Flight::route('/type-your-own-text', function(){
    render_typing_page('own_text');
});

Flight::route('/type-random-text', function(){
    render_typing_page('random_text');
});

Flight::start();
