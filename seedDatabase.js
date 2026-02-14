require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Greeting = require('./models/Greeting');

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('✅ MongoDB connected successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Seed data to MongoDB
const seedGreetings = async () => {
    try {
        // Read seed.json file
        const seedData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'public/data/seed.json'), 'utf-8')
        );

        // Clear existing greetings
        await Greeting.deleteMany({});
        console.log('🗑️  Cleared existing greetings');

        // Insert new greetings
        const greetings = seedData.greetings.map(content => ({
            content: content,
            isActive: true
        }));

        const result = await Greeting.insertMany(greetings);
        console.log(`✅ Successfully seeded ${result.length} greetings to MongoDB!`);

        // Display sample
        console.log('\n📝 Sample greetings:');
        result.slice(0, 3).forEach((greeting, index) => {
            console.log(`${index + 1}. ${greeting.content.substring(0, 50)}...`);
        });

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
    }
};

// Run seed
const run = async () => {
    await connectDB();
    await seedGreetings();
};

run();