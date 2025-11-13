#!/bin/bash

# Emergency Railway deployment script
echo "Starting emergency Laravel deployment..."

# Clear all caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Rebuild config and routes
php artisan config:cache
php artisan route:cache

# Run migrations
php artisan migrate --force

# Seed database if needed
php artisan db:seed --force

echo "Deployment complete. Starting server..."
php artisan serve --host=0.0.0.0 --port=$PORT
