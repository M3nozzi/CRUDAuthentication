const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Profile = require('../models/profile.model');

const Course = require('../models/course.model');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (request, response) => {

    try {
        const profiles = await Profile.find().populate(['user', 'courses'])

        return response.send({ profiles });
        
    } catch (err) {
        return response.status(400).send({ message: 'Error loading profiles'})
        
    }
});

router.get('/:id', async (request, response) => {

    try {
        const profile = await Profile.findById().populate(['user', 'courses'])

        return response.send({ profile });
        
    } catch (err) {
        return response.status(400).send({ message: 'Error loading profile'})
        
    }
});

router.post('/', async (request, response) => {

    try {

        const { name, email, themes, university, courses } = request.body;

        const profile = await Profile.create({ name, email, themes, university, user: request.userId})
        
        await Promise.all(courses.map( async course => {
            const profileCourse = new Course({ ...course})
            
            await profileCourse.save();

            profile.courses.push(profileCourse);
        }));
        
    } catch (err) {
        console.log(err)
        return response.status(400).send({ message: 'Error creating new profile' })
        
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
        return response.status(400).send({ message: 'Error deteling profile'})
        
    }
});


module.exports = app => app.use('/profiles', router);