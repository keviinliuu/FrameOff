import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { SlideData, MIMES } from '../data/types';
import axios from 'axios';

export type State = {
    slides: SlideData[];
};

export type Action = {
    addSlide: (slide: SlideData) => void;
    editSlide: (id: string, property: Partial<SlideData>) => void;
    loadSlides: (id: string) => void;
    getSlide: (id: string) => SlideData | undefined;
    // FIXME: Currently validating image file extension client-side.
    validateSlides: () => boolean;
};

export const useSlideStore = create<State & Action>()(
    subscribeWithSelector((set, get) => ({
        slides: [],
        addSlide: (slide: SlideData) => {
            set(state => ({
                slides: [...state.slides, slide],
            }));
        },
        editSlide: (id: string, property: Partial<SlideData>) => {
            set(state => ({
                slides: state.slides.map(slide =>
                    slide._id === id ? { ...slide, ...property } : slide,
                ),
            }));
        },
        loadSlides: (id: string) => {
            axios
                .get(`/${id}`)
                .then(res => res.data.slides.forEach((slide: SlideData) => get().addSlide(slide)));
        },
        getSlide: (id: string) => get().slides.find(slide => slide._id === id),
        validateSlides: () =>
            !!get().slides.length &&
            get().slides.every(
                slide =>
                    slide.image1.url !== null &&
                    MIMES.includes((slide.image1.url as File).type) &&
                    slide.image2.url !== null &&
                    MIMES.includes((slide.image2.url as File).type),
            ),
    })),
);
