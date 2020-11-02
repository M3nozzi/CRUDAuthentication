const mongoose = require('../database/index');
const Schema = mongoose.Schema;


const courseThemeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
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


const CourseTheme = mongoose.model('CourseTheme', courseThemeSchema);

module.exports = CourseTheme;