# Fix for "Invalid email or password" Issue

## Problem
The demo accounts (admin, manager, user) are showing "Invalid email or password" error because the password hashes stored in the database initialization script were incorrect.

## Solution Options

### Option 1: Reset Database (Recommended)
If you haven't added any important data, the easiest solution is to reset the MongoDB database:

1. **Stop all containers:**
   ```bash
   docker-compose down
   ```

2. **Remove the MongoDB volume to reset the database:**
   ```bash
   docker volume rm projekakhir_mongo_data
   ```
   *(Note: The volume name might be different, check with `docker volume ls`)*

3. **Restart the containers:**
   ```bash
   docker-compose up --build -d
   ```

This will recreate the database with the correct password hashes that I've already fixed in the `mongo-init.js` file.

### Option 2: Update Existing Passwords
If you have important data and don't want to reset the database:

1. **Make sure containers are running:**
   ```bash
   docker-compose up -d
   ```

2. **Execute the password update script inside the server container:**
   ```bash
   docker exec -it user-activity-server node update-passwords.js
   ```

## What I Fixed
I updated the `mongo-init.js` file with correct bcrypt hashes for the demo accounts:

- **Admin:** admin@example.com / admin123
- **Manager:** manager@example.com / manager123  
- **User:** user@example.com / user123

The previous hashes were placeholder values that didn't match the actual passwords.

## Testing
After applying either solution, you should be able to login with the demo credentials shown on the login page.

## Technical Details
The issue was in the password comparison process in `server/models/User.js`. The `comparePassword` method uses bcrypt to verify the password against the stored hash, but the stored hashes were invalid, causing all login attempts to fail.