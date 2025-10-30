# Restaurant Hub - Deployment Guide

## Team: Mikhael Nabil Salama Rezk (IHUTSC) & Szabo Lilla (BDCRL0)

## Production Deployment Checklist

### 1. Environment Configuration
- [ ] Set APP_ENV=production in .env
- [ ] Configure database connection for production
- [ ] Set proper APP_URL for hosting domain
- [ ] Configure mail settings for contact form
- [ ] Set cache and session drivers

### 2. Security Configuration
- [ ] Generate new APP_KEY for production
- [ ] Configure CSRF protection
- [ ] Set up proper file permissions
- [ ] Enable HTTPS redirects
- [ ] Configure rate limiting

### 3. Database Setup
- [ ] Create production database
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Seed initial data: `php artisan db:seed --force`
- [ ] Backup database configuration

### 4. Asset Optimization
- [ ] Run production build: `npm run build`
- [ ] Optimize images and static assets
- [ ] Configure CDN if needed
- [ ] Enable Gzip compression

### 5. Hosting Provider Setup
Based on homework requirements, suitable free hosting options:

#### InfinityFree (Recommended)
- Free PHP hosting with MySQL database
- Support for Laravel applications
- FTP access for file upload
- Custom domain support

#### 000webhost
- Free PHP hosting
- MySQL database included
- Easy deployment process

### 6. Deployment Steps
1. Export database from local SQLite to MySQL
2. Upload application files via FTP
3. Configure .env file for production
4. Set up database connection
5. Run Laravel optimization commands
6. Test all functionality

### 7. Post-Deployment Testing
- [ ] Test authentication system
- [ ] Verify CRUD operations
- [ ] Test contact form submission
- [ ] Check admin panel access
- [ ] Validate responsive design
- [ ] Test all user roles

### 8. Monitoring & Maintenance
- [ ] Set up error logging
- [ ] Monitor application performance
- [ ] Regular database backups
- [ ] Security updates

## Production URL
*To be added after deployment*

## Deployment Date
*To be updated after successful deployment*
