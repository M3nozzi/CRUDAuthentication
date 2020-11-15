const express = require('express');
const authMiddleware = require('../middlewares/auth');
const uploadCloud = require('../config/cloudinary');

const Profile = require('../models/profile.model');

const CourseTheme = require('../models/courseTheme.model');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (request, response) => {

    try {
        const profiles = await Profile.find().populate(['user', 'coursesTheme'])

        return response.send({ profiles });
        
    } catch (err) {
        return response.status(400).send({ message: 'Error loading profiles'})
        
    }
});

router.get('/:id', async (request, response) => {

    try {
        const profile = await Profile.findById().populate(['user', 'coursesTheme'])

        return response.send({ profile });
        
    } catch (err) {
        return response.status(400).send({ message: 'Error loading profile'})
        
    }
});

router.post('/', uploadCloud.single('photo'), async (request, response) => {

    try {

        const { name, email, courses, fileUrl, originalname, university, coursesTheme } = request.body;

        if (fileUrl == "") {
            
           fileUrl = 'https://res.cloudinary.com/menozzi/image/upload/v1589934245/focus/undraw_profile_pic_ic5t_ciicvy.svg'
        }

        const profile = await Profile.create({
            name,
            email,
            courses,
            path: fileUrl,
            originalName: originalname,
            university,
            user: request.userId
        });

        await Promise.all(coursesTheme.map( async courseTheme => {
            const profileCourse = new CourseTheme({ ...courseTheme, profile: profile._id})
            
            await profileCourse.save();

            profile.coursesTheme.push( profileCourse );
        }));
      
        await profile.save();
        return response.send({ profile })
        
    } catch (err) {
        
        return response.status(400).send({ message: err })
        
    }
});

router.put('/:id', async (request, response) => {

    return response.json({ message: 'Logado!!!!', user: request.userId });
});

router.delete('/:profileId', async(request, response) => {

    try {
        await Profile.findByIdAndRemove(request.params.profileId);

        return response.send({ message: 'Profile deleted!!!!'});
        
    } catch (err) {
        return response.status(400).send({ message: 'Error deleting profile'})
        
    }
});


module.exports = app => app.use('/profiles', router);