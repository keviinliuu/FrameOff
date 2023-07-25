import { Router } from 'express';
import { createId, VotedEnum } from '../utils/dbUtils';

import DuelModel from '../models/duel.model';
import SlideModel from '../models/slide.model';
import ImageModel from '../models/image.model';

const router = Router();

router.route('/api/createduel').post(async (req, res) => {
    const _id = await createId();
    const title = req.body.title;
    const description = req.body.description;
    let slides: string[] = [];

    const newDuel = new DuelModel({
        _id: _id,
        title: title,
        description: description,
        slides: slides,
    });

    for(const slide of req.body.slides) {
        const newImage1 = new ImageModel({
            url: slide.image1.url,
            caption: slide.image1.caption,
            votes: 0,
        });

        const newImage2 = new ImageModel({
            url: slide.image2.url,
            caption: slide.image2.caption,
            votes: 0,
        });

        const newSlide = new SlideModel({
            slideTitle: slide.slideTitle,
            slideDescription: slide.slideDescription,
            index: newDuel.slides.length + 1,
            image1: newImage1,
            image2: newImage2,
        });

        const savedSlide = await newSlide.save();

        newDuel.slides.push(savedSlide._id);
    }

    await newDuel
        .save()
        .then(() => res.json(newDuel._id))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/api/:id').get(async (req, res) => {
    const duelId = req.params.id;
    const populatedDuel = await DuelModel.findById(duelId).populate({
        path: 'slides',
        model: SlideModel,
    }).exec();

    if(!populatedDuel) {
        return res.status(404).json({ error: 'Duel not found!' });
    }

    const { title, description, slides } = populatedDuel;
    return res.json({ title, description, slides });
});

router.route('/api/voteslide').patch(async (req, res) => {
    const { _id, votedFor } = req.body;

    if (!Object.values(VotedEnum).includes(votedFor)) {
        return res.status(400).json({ error: 'Invalid votedFor value.' });
    }

    const slide = await SlideModel.findById(_id).exec();

    if(!slide) {
        return res.status(404).json({ error: 'Slide not found.' });
    }

    if (votedFor === VotedEnum.IMAGE1) {
        slide.image1.votes += 1;
    } else if (votedFor === VotedEnum.IMAGE2) {
        slide.image2.votes += 1;
    }

    await slide.save();

    const votesImage1 = slide.image1.votes;
    const votesImage2 = slide.image2.votes;

    return res.json({ votesImage1, votesImage2 });
});

router.route('/api/voteall').patch(async (req, res) => {
    for(const votedSlide of req.body.votedSlides) {
        const _id = votedSlide._id;
        const votedFor = votedSlide.votedFor;

        if (!Object.values(VotedEnum).includes(votedFor)) {
            return res.status(400).json({ error: 'Invalid votedFor value.' });
        }

        const slide = await SlideModel.findById(_id).exec();

        if (!slide) {
            return res.status(404).json({ error: 'Slide not found.' });
        }

        if (votedFor === VotedEnum.IMAGE1) {
            slide.image1.votes += 1;
        }
        else if (votedFor === VotedEnum.IMAGE2) {
            slide.image2.votes += 1;
        }

        await slide.save();
    }

    return res.sendStatus(200);
});

router.route('/api/getvotes/:id').get(async (req, res) => {
    const slideId = req.params.id;
    const slide = await SlideModel.findById(slideId).exec();

    if(!slide) {
        return res.status(404).json({ error: 'Slide not found.' });
    }

    const votesImage1 = slide.image1.votes;
    const votesImage2 = slide.image2.votes;

    return res.json({ votesImage1, votesImage2 });
});

export default router;