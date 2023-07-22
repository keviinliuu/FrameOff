import { Router } from 'express';
import crypto from 'crypto';

import DuelModel from '../models/duel.model';
import SlideModel, { ISlide } from '../models/slide.model';
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

    await newDuel
        .save()
        .then(() => res.json('Duel created!'))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/api/:id').get(async (req, res) => {
    DuelModel.findById(req.params.id)
        .then(duel => res.json(duel))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/vote/:id').post(async (req, res) => {
    DuelModel.findById(req.params.id)
        .then(duel => {
            const slideToUpdate: ISlide = duel!.slides[req.body.index];
            var image = null;
            
            if(req.body.imageSelection == "image1") {
                image = slideToUpdate.image1;
            }
            else {
                image = slideToUpdate.image2;
            }

            image.votes = image.votes + 1;

            duel!.save()
                .then(() => res.json('Updated!'))
                .catch(err => res.status(400).json('Error') + err)
        });
});

router.route('/api/voteall/:id').post(async (req, res) => {
    // to be implemented....
})

export default router;