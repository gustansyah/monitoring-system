const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password123@localhost:27017/projectdb?authSource=admin';

async function updatePasswords() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get the User model
    const User = require('./models/User');

    // Update admin password
    const adminHash = await bcrypt.hash('admin123', 10);
    await User.updateOne(
      { email: 'admin@example.com' },
      { $set: { password: adminHash } }
    );
    console.log('✅ Admin password updated');

    // Update manager password
    const managerHash = await bcrypt.hash('manager123', 10);
    await User.updateOne(
      { email: 'manager@example.com' },
      { $set: { password: managerHash } }
    );
    console.log('✅ Manager password updated');

    // Update user password
    const userHash = await bcrypt.hash('user123', 10);
    await User.updateOne(
      { email: 'user@example.com' },
      { $set: { password: userHash } }
    );
    console.log('✅ User password updated');

    console.log('\n🎉 All demo account passwords have been updated successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   Manager: manager@example.com / manager123');
    console.log('   User: user@example.com / user123');

  } catch (error) {
    console.error('❌ Error updating passwords:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updatePasswords();