import { Router } from 'express';
import { ISlide } from '../models/slide.model';
import crypto from 'crypto';

import DuelModel from '../models/duel.model';
import SlideModel from '../models/slide.model';
import ImageModel from '../models/image.model';

const router = Router();
const generateId = (bytes = 6) => crypto.randomBytes(bytes).toString('base64');

router.route('/api/createduel').post(async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const _id = generateId();
    let slides: ISlide[] = [];

    const newDuel = new DuelModel({
        title,
        description,
        _id,
        slides,
    });

    for (const slide of req.body.slides) {
        const newImage1 = new ImageModel({
            url: slide.image1.url,
            caption: slide.image1.caption,
            votes: slide.image1.votes,
        });

        const newImage2 = new ImageModel({
            url: slide.image2.url,
            caption: slide.image2.caption,
            votes: slide.image2.votes,
        });

        const newSlide = new SlideModel({
            slideTitle: slide.slideTitle,
            slideDescription: slide.slideDescription,
            index: slide.index,
            image1: newImage1,
            image2: newImage2,
        });

        newDuel.slides.push(newSlide);
    }

    // console.log(newDuel.slides[0].ownerDocument);

    await newDuel
        .save()
        .then(() => res.json('Duel created!'))
        .catch(err => res.status(400).json('Error' + err));
});

export default router;