import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { SlideData, MIMES } from '../data/types';
import axios from 'axios';

export type State = {
    slides: SlideData[];
    slidesAreValid: boolean;
};

export type Action = {
    addSlide: (slide: SlideData) => void;
    editSlide: (id: string, property: Partial<SlideData>) => void;
    loadSlides: (id: string) => void;
    getSlide: (id: string) => SlideData | undefined;
    // FIXME: Currently validating image file extension client-side.
    validateSlides: () => void;
    generateSlideImages: () => void;
    uploadPoll: () => void;
};

export const useSlideStore = create<State & Action>()(
    subscribeWithSelector((set, get) => ({
        slides: [],
        slidesAreValid: false,
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
                .get(`/api/${id}`)
                .then(res => res.data.slides.forEach((slide: SlideData) => get().addSlide(slide)));
        },
        getSlide: (id: string) => get().slides.find(slide => slide._id === id),
        validateSlides: () =>
            set({
                slidesAreValid:
                    !!get().slides.length &&
                    get().slides.every(
                        slide =>
                            slide.image1.url !== null &&
                            MIMES.includes((slide.image1.url as File).type) &&
                            slide.image2.url !== null &&
                            MIMES.includes((slide.image2.url as File).type),
                    ),
            }),
        generateSlideImages: async () => {
            if (!get().slidesAreValid) return;
            const newSlides = await Promise.all(
                get().slides.map(async slide => {
                    const fdOne = new FormData();
                    const fdTwo = new FormData();
                    fdOne.append('image', slide.image1.url as File);
                    fdTwo.append('image', slide.image2.url as File);
                    const resOne = await axios.post('/uploadimage', fdOne, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    const resTwo = await axios.post('/uploadimage', fdTwo, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    return {
                        ...slide,
                        image1: { ...slide.image1, url: resOne.data },
                        image2: { ...slide.image2, url: resTwo.data },
                    };
                }),
            );
            set({
                slides: newSlides,
            });
        },
        uploadPoll: () => {
            axios
                .post('/createduel', {
                    title: 'Sample Title',
                    description: 'Sample Description',
                    slides: get().slides,
                })
                .then(res => console.log(res));
        },
    })),
);
