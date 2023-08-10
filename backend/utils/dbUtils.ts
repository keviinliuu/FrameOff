import DuelModel from '../models/duel.model';
import crypto from 'crypto';

export enum VotedEnum {
    IMAGE1 = 'IMAGE1',
    IMAGE2 = 'IMAGE2',
};

export function calculatePercentages(votes1: number, votes2: number): [number, number] {
    const total = votes1 + votes2;
    const percent1 = Math.round((votes1/total) * 100);
    const percent2 = 100 - percent1;
    return [percent1, percent2];
}

const alphaNumericChars = '0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ'

export async function createId() {
    const generateId = (bytes = 6) => {
        var s = "";
        for (let i = 0; i < bytes; i++) {
            s += alphaNumericChars[crypto.randomInt(alphaNumericChars.length)];
        }
        return s;
    }
    let id = generateId();

    while (await doesDuelExist(id)) {
        id = generateId();
    }

    return id;
}

async function doesDuelExist(id: string) {
    try {
        const foundDuel = await DuelModel.findOne({_id: id}).exec();
        return !!foundDuel;
    }
    catch (err) {
        console.error('Error while checking for existence: ', err);
        return false;
    }
}