# Restaurant Hub - Testing Checklist

## Team Members
- **Mikhael Nabil Salama Rezk** (NEPTUN: IHUTSC)
- **Szabo Lilla** (NEPTUN: BDCRL0)

## CSRF Fix Applied ✅
- Updated Axios configuration for CSRF tokens
- Added CSRF token to Inertia middleware shared data
- Cleared all Laravel caches
- Verified CSRF token generation in web context

## Testing Checklist

### 🔧 **Basic Functionality**
- [ ] **Homepage**: Visit http://127.0.0.1:8000 - Should load without errors
- [ ] **Navigation**: All menu items should be clickable and functional
- [ ] **Responsive Design**: Test on different screen sizes

### 🔐 **Authentication System**
- [ ] **User Registration**: 
  - Go to `/register`
  - Fill out form and submit
  - Should create account without 419 error
- [ ] **User Login**: 
  - Go to `/login` 
  - Use registered credentials and submit
  - Should login without 419 error
- [ ] **Logout**: Should work properly
- [ ] **Role-based Access**: Admin areas only for admin users

### 📝 **Contact Form**
- [ ] **Contact Page**: Visit `/contact`
- [ ] **Form Submission**: 
  - Fill out all required fields
  - Submit form
  - Should save to database without 419 error
  - Should show success message

### 🏪 **Restaurant Features**
- [ ] **Restaurant List**: Visit `/restaurants` - Should display seeded data
- [ ] **Restaurant Details**: Click on any restaurant - Should show details
- [ ] **CRUD Operations**: (Admin only)
  - Create new restaurant
  - Edit existing restaurant
  - Delete restaurant

### 📊 **Data Features**
- [ ] **Messages**: Login and visit `/messages` - Should show contact submissions
- [ ] **Graphs**: Visit `/graphs` - Should display Chart.js graphs
- [ ] **Admin Dashboard**: Login as admin and visit `/admin`

### 🗄️ **Database**
- [ ] **Sample Data**: Should have 3 restaurants and 6 dishes pre-loaded
- [ ] **Relationships**: Data should be properly linked between tables

## Test User Accounts

You can create test accounts through registration, or create them manually:

### Creating Admin User (Optional)
```bash
php artisan tinker
$user = App\Models\User::create([
    'name' => 'Admin User',
    'email' => 'admin@test.com', 
    'password' => bcrypt('password'),
    'role' => 'admin'
]);
```

### Creating Regular User (Optional)
```bash
php artisan tinker
$user = App\Models\User::create([
    'name' => 'Test User',
    'email' => 'user@test.com',
    'password' => bcrypt('password'), 
    'role' => 'user'
]);
```

## Expected Results
- ✅ No more "419 Page Expired" errors on form submissions
- ✅ All forms should submit successfully
- ✅ Contact form should save messages to database
- ✅ Login/registration should work properly
- ✅ Role-based access control should function
- ✅ All features should be responsive and functional

## Troubleshooting
If you encounter issues:
1. Clear browser cache and cookies
2. Try in incognito/private browsing mode
3. Check Laravel logs at `storage/logs/laravel.log`
4. Ensure server is running: `php artisan serve`

## Next Steps After Testing
1. ✅ **All features working**: Proceed to deployment
2. 🔄 **Issues found**: Report specific errors for further fixes
3. 📄 **Documentation**: Create final 15+ page PDF documentation
4. 🌐 **Deployment**: Deploy to internet hosting provider

---
**Server URL**: http://127.0.0.1:8000  
**Repository**: https://github.com/MI804-png/webprogramming2_lecture.git  
**Last Updated**: October 30, 2025
