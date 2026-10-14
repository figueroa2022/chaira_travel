<?php
header('Content-Type: application/json; charset=utf-8');
$dir = __DIR__ . '/fotos';
$fotos = [];
if (is_dir($dir)) {
  foreach (scandir($dir) as $f) {
    if (preg_match('/\.(jpe?g|png|webp|gif|avif)$/i', $f)) {
      $fotos[] = 'fotos/' . rawurlencode($f);
    }
  }
}
natcasesort($fotos);
echo json_encode(array_values($fotos));
