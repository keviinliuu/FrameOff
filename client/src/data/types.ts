export interface ImageData {
    url: string;
    caption?: string;
    votes?: number;
}

export interface SlideData {
    id?: string;
    title?: string;
    description?: string;
    imageOne: ImageData;
    imageTwo: ImageData;
}
