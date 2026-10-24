<?php
header('Content-Type: application/json; charset=utf-8');
$ext = ['jpg','jpeg','png','webp','gif','avif','svg','mp4','webm','ogv','mov','m4v'];
$archivos = [];
foreach (scandir(__DIR__ . '/publicidad') as $f) {
    if (in_array(strtolower(pathinfo($f, PATHINFO_EXTENSION)), $ext)) {
        $archivos[] = $f;
    }
}
natcasesort($archivos);
echo json_encode(array_values($archivos));