const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
greetingSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Greeting = mongoose.model('Greeting', greetingSchema);

module.exports = Greeting;