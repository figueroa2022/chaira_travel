<?php
header('Content-Type: application/json; charset=utf-8');
$dir = __DIR__ . '/videos';
$videos = [];
if (is_dir($dir)) {
  foreach (scandir($dir) as $f) {
    if (preg_match('/\.(mp4|webm|mov|m4v|ogv)$/i', $f)) {
      $videos[] = 'videos/' . rawurlencode($f);
    }
  }
}
natcasesort($videos);
echo json_encode(array_values($videos));
