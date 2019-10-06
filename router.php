<?php
$path = pathinfo($_SERVER['REQUEST_URI']);
$fn = 'out/custom/' . $path['basename'] . '.html';
return !array_key_exists('extension', $path) && file_exists($fn) && readfile($fn);
