import { ReactNode } from 'react';

export interface SlideProps {
    children?: ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return (
        <div className='flex p-6 h-[80vh] w-full md:w-[80vw] flex-col gap-y-2 md:gap-y-0 justify-center items-center'>
            {children}
        </div>
    );
}
