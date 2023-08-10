import { ChangeEvent } from 'react';

export type CE = ChangeEvent<HTMLInputElement>;

export const MIMES = ['image/png', 'image/jpeg'];

export interface ImageData {
    _id?: string;
    url: string | File | null;
    caption?: string;
    votes?: number;
}

export interface SlideData {
    _id?: string;
    slideTitle?: string;
    slideDescription?: string;
    index?: number;
    image1: ImageData;
    image2: ImageData;
    __v?: number;
}

export enum VotedEnum {
    IMAGE1 = 'IMAGE1',
    IMAGE2 = 'IMAGE2',
};