#!/bin/bash
set -e

echo "Starting Laravel application on Render..."

# Use PORT environment variable from Render, default to 10000
export APP_PORT=${PORT:-10000}

# Update nginx configuration with the correct port
sed -i "s/listen 10000;/listen $APP_PORT;/g" /etc/nginx/conf.d/default.conf

# Ensure storage directories exist with correct permissions
mkdir -p /app/storage/framework/{sessions,views,cache}
mkdir -p /app/storage/logs
mkdir -p /app/bootstrap/cache

# Set permissions
chown -R www-data:www-data /app/storage /app/bootstrap/cache
chmod -R 775 /app/storage /app/bootstrap/cache

# Clear and cache Laravel configuration
echo "Optimizing Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations (if connected)
if [ -n "$DATABASE_URL" ] || [ -n "$DB_CONNECTION" ]; then
    echo "Running database migrations..."
    php artisan migrate --force --no-interaction || echo "Migration failed or skipped"
fi

# Link storage if not already linked
php artisan storage:link || true

# Start PHP-FPM in background
echo "Starting PHP-FPM..."
php-fpm -D

# Start nginx in foreground (keeps container running)
echo "Starting Nginx on port $APP_PORT..."
nginx -g "daemon off;"
