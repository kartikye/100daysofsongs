<?php
$imagesDir = './src/';
$images = glob($imagesDir . '*.png', GLOB_BRACE);
$image = $images[array_rand($images)]; // See comments
$fp = fopen($image, 'rb');
header("Content-Type: image/png");
header("Content-Length: " . filesize($name));
fpassthru($fp);