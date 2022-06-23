<?php
require 'flight/Flight.php';

function render($file) {
    Flight::render('_head.php');
    Flight::render('_nav.php');
    Flight::render($file);
    Flight::render('_footer.php');
}

function render_typing_post($file) {
    Flight::render('_head.php');
    Flight::render('_nav.php');
    Flight::render('posts/' .$file);
    Flight::render('_stats');
    Flight::render('_footer.php');
}

function remove_extension ($file_name) {
    return explode('.', $file_name)[0];
}

Flight::route('/home', function(){
    render('home');
});

$typing_files = array_values(array_diff(scandir('views/posts'), array('.', '..')));
$extensionless_typing_files = array_map("remove_extension", $typing_files);
forEach($extensionless_typing_files as $page) {
    Flight::route('/' .$page, function() use ($page) {
    
        // print_r(array_map("remove_extension", $typing_files));
        render_typing_post($page);
    });
}


Flight::start();
