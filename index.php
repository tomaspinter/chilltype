<?php

require 'flight/Flight.php';

$article_files = array_values(array_diff(scandir('views/articles'), array('.', '..')));
$extensionless_article_files = array_map("remove_extension", $article_files);
$article_names = array_map("replace_dashes_with_spaces", $extensionless_article_files);

$articles = [];
for($i = 0; $i < count($article_names); $i++) {
    $articles[$i]['link'] = $extensionless_article_files[$i];
    $articles[$i]['name'] = $article_names[$i];
}

$random_article_index = rand(0, count($article_names) - 1);
Flight::set('random_article', $articles[$random_article_index]);

function render($file, $args = []) {
    Flight::render('_head.php');
    Flight::render('_nav.php', ['random_article' => Flight::get('random_article')]);
    Flight::render($file, $args);
    // Flight::render('_footer.php');
}

function render_typing_post($file) {
    Flight::render('_head.php');
    Flight::render('_nav.php', ['random_article' => Flight::get('random_article')]);
    Flight::render('articles/' .$file);
    Flight::render('_stats');
    Flight::render('_footer.php');
}

Flight::route('/home', function(){
    render('home');
});

Flight::route('/about', function(){
    render('about');
});

Flight::route('/type_your_own_text', function(){
    Flight::render('_head.php');
    Flight::render('_nav.php', ['random_article' => Flight::get('random_article')]);
    Flight::render('own_text');
    Flight::render('_stats');
    Flight::render('_footer.php');
});

Flight::route('/articles', function() use ($articles){
    render('articles', ['articles' => $articles]);
});

forEach($extensionless_article_files as $page) {
    Flight::route('/article/' .$page, function() use ($page) {
        render_typing_post($page);
    });
}

function remove_extension($file_name) {
    return explode('.', $file_name)[0];
}

function replace_dashes_with_spaces($file_name) {
    return str_replace('-', ' ', $file_name);
}

Flight::start();
