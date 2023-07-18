import { Router } from 'express';

import DuelModel from '../models/duel.model';

const router = Router();

router.route('/api/createduel').post(async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const slides = req.body.slides;

    const newDuel = new DuelModel({
        title,
        description,
        slides,
    });

    newDuel.save()
        .then(() => res.json('Duel created!'))
        .catch(err => res.status(400).json('Error' + err));
});

export default router;