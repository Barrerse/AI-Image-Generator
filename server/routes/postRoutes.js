import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})

router.route('/').get(async(req, res) => {
    try{
        const post = await Post.find({});
        res.status(200).json({sucess: true, data: post});
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }

});


router.route('/').post(async(req, res) => {

try{
    const { name, promp, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post({
         name, 
         promp, 
         photo: photoUrl.secure_url });

    res.status(201).json({sucess: true, data: newPost});
    } catch (error) {
        res.status(500).json({sucess: false, error: error.message});
    }

});

export default router;