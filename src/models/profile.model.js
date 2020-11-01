const mongoose = require('../database/index');
const Schema = mongoose.Schema;


const profileSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        themes: [{
            type: String,
            required: true,
        }],

        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required: true,
        }],

        university: {
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


const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
