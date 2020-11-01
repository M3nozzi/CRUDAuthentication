const mongoose = require('../database/index');
const Schema = mongoose.Schema;


const courseSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
       
        createdAt: {
            type: Date,
            default: Date.now,
        },

        updateAt: {
            type: Date,
            default: Date.now,
        },
    }
);


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;