# GeniusCare Admin Panel Setup Guide

## Admin Login Credentials

### Default Admin Account
- **Email**: `geniuscare@gmail.com`
- **Username**: `geniuscare`
- **Default Password**: `GeniusCare@2024`

⚠️ **Important**: Change the password immediately after first login!

## How to Set Up Admin Account

### Method 1: Using the Create Admin Script (Recommended)

1. Navigate to the server directory:
```bash
cd server
```

2. Run the create admin script:
```bash
node scripts/createAdmin.js
```

3. The script will create an admin account with:
   - Email: `geniuscare@gmail.com`
   - Username: `geniuscare`
   - Password: From `.env` file or default `GeniusCare@2024`

### Method 2: Manual Setup via MongoDB

You can also directly insert an admin account into MongoDB:

```javascript
db.admins.insertOne({
  username: "geniuscare",
  email: "geniuscare@gmail.com",
  password: "$2a$12$...", // bcrypt hashed password
  role: "superadmin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## How to Access Admin Panel

### Step 1: Access the Hidden Admin Panel
- Press `Ctrl+Shift+A` on the website (keyboard shortcut)
- Or navigate directly to `/admin` route

### Step 2: Login
Enter your credentials:
- **Email/Username**: `geniuscare@gmail.com` or `geniuscare`
- **Password**: Your secure password

### Step 3: Manage Content
Once logged in, you can:
- View all student admissions with status (Pending, Approved, Rejected)
- View all contact inquiries
- Update admission statuses
- Filter by batch (SSC, HSC) and status
- View statistics and analytics

## Environment Variables

Add these to your `.env` file in the server directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/geniuscare

# JWT Configuration
JWT_SECRET=your-very-secret-key-here-min-32-characters
JWT_EXPIRES_IN=7d

# Admin Password (optional - if not set, defaults to GeniusCare@2024)
ADMIN_PASSWORD=your-secure-password

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Security Features

✅ **Keyboard Shortcut Only**: Admin panel is not linked in the footer or UI
✅ **Email/Username Login**: Accept both email and username for flexibility
✅ **Token-Based Auth**: JWT tokens with expiration
✅ **Password Hashing**: bcryptjs for secure password storage
✅ **Rate Limiting**: Login attempts are rate-limited in production
✅ **Session Management**: Automatic logout on token expiry

## Changing Password

After first login, go to the admin panel settings to change your password to something more secure.

## Troubleshooting

### Admin already exists
If you see "Admin user already exists", it means the account has already been created. You can:
1. Delete the old admin from MongoDB and run the script again
2. Or login with the existing credentials

### Can't login
- Make sure MongoDB is connected and running
- Check that `.env` file is properly configured with `MONGODB_URI`
- Verify `JWT_SECRET` is set in `.env`
- Check server logs for detailed error messages

### Forgot password
If you forget the password, delete the admin record from MongoDB and run the create admin script again.

## Production Recommendations

1. **Change Default Password**: Never deploy with default passwords
2. **Use Strong JWT Secret**: Generate a random string of at least 32 characters
3. **Enable Rate Limiting**: Set `NODE_ENV=production`
4. **Use HTTPS**: Always use SSL/TLS in production
5. **Keep Sessions Short**: Consider reducing `JWT_EXPIRES_IN` in production
6. **Regular Backups**: Backup your MongoDB database regularly

---

**Last Updated**: January 2026
