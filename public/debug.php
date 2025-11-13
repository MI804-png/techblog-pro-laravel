<?php
// Simple debug endpoint to test if PHP is working on Railway
echo json_encode([
    'status' => 'OK',
    'message' => 'PHP is working on Railway',
    'timestamp' => date('Y-m-d H:i:s'),
    'laravel_app_exists' => file_exists(__DIR__ . '/../bootstrap/app.php'),
    'index_php_exists' => file_exists(__DIR__ . '/index.php'),
    'current_directory' => __DIR__,
    'files_in_public' => scandir(__DIR__)
]);
?>
