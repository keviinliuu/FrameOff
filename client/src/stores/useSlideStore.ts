import { create } from 'zustand';
import { SlideData } from '../data/types';
import axios from 'axios';

export type State = {
    slides: SlideData[];
};

export type Action = {
    addSlide: (slide: SlideData) => void;
    editSlide: (id: string, slide: SlideData) => void;
    loadSlides: (id: string) => void;
};

export const useSlideStore = create<State & Action>()((set, get) => ({
    slides: [],
    addSlide: (slide: SlideData) => {
        set(state => ({
            slides: [...state.slides, slide],
        }));
    },
    editSlide: (id: string, slide: SlideData) => {
        console.log(id);
        console.log(slide);
    },
    loadSlides: (id: string) => {
        axios
            .get(`/${id}`)
            .then(res => res.data.slides.forEach((slide: SlideData) => get().addSlide(slide)));
    },
}));
