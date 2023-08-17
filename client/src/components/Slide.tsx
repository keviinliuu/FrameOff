import { ReactNode } from 'react';

export interface SlideProps {
    children?: ReactNode;
}

export default function Slide({ children }: SlideProps) {
    return (
        <div className='p-6 border-neutral-25 flex flex-col gap-y-6 rounded border items-center shrink-0 snap-center snap-always'>
            {children}
        </div>
    );
}
