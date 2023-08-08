export interface ImageData {
    _id?: string;
    url: string;
    caption?: string;
    votes?: number;
}

export interface SlideData {
    id?: string;
    slideTitle?: string;
    slideDescription?: string;
    index?: number;
    image1: ImageData;
    image2: ImageData;
    __v: number;
}
