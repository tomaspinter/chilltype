<div id="article_list">

<?php
    forEach($articles as $article) {
        echo "<a href=/article/" .$article['link'] .">" .$article['name'] ."</a>";
    }
?>
</div>
