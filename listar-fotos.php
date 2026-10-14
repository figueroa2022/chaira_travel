<?php
header('Content-Type: application/json');
$dir = __DIR__ . '/fotos';
$fotos = [];
foreach (scandir($dir) as $f) {
  if (preg_match('/\.(jpe?g|png|webp|gif|avif)$/i', $f)) {
    $fotos[] = 'fotos/' . rawurlencode($f);
  }
}
natsort($fotos);
echo json_encode(array_values($fotos));
