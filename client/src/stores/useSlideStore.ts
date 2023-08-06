import { create } from 'zustand';

import { SlideData } from '../data/types';

export type State = {
    slides: SlideData[];
};

export type Action = {
    addSlide(slide: SlideData): void;
    editSlide(id: string, slide: SlideData): void;
    loadSlides(): void;
};

export const useSlideStore = create<State & Action>()(set => ({
    slides: [],
    addSlide(slide: SlideData) {
        console.log(`A slide with title ${slide.title} was added!`);
    },
    editSlide(id: string, slide: SlideData) {
        console.log(`A slide with id ${id} and title ${slide.title} was edited!`);
    },
    loadSlides() {
        console.log('A whole bunch of slides was just loaded.');
    },
}));
